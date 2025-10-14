import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { submit } from './actions/submit'
import { DeleteButton } from '@/app/components/DeleteButton'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'submissions',
    limit: 0,
  })

  return (
    <>
      <h1 style={{ fontFamily: 'system-ui, sans-serif' }}>Server Actions</h1>
      <form
        action={submit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '400px',
          margin: '2rem auto',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          backgroundColor: '#fff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <label
          htmlFor="title"
          style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#333',
          }}
        >
          Title
        </label>
        <input
          name="title"
          type="text"
          id="title"
          placeholder="Enter Title"
          style={{
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#fff',
            backgroundColor: '#2e2e2e',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
      <div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}></ul>
        {docs.map((doc) => (
          <li
            key={doc.id}
            style={{
              padding: '12px',
              marginBottom: '10px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
              transition: 'background 0.2s ease',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ display: 'block', fontSize: '16px', color: '#1a202c' }}>
                {doc.title}
              </strong>
              <DeleteButton id={doc.id} />
            </div>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>
              Created at {new Date(doc.createdAt).toLocaleDateString()}
            </span>
          </li>
        ))}
      </div>
    </>
  )
}
