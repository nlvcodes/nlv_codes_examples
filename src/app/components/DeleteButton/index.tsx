'use client'
import {deleteItem} from '../../(frontend)/actions/delete'
import { startTransition, useActionState } from 'react'

export const DeleteButton = ({id}: {id: string}) => {

  const [state, action, pending] = useActionState(
    deleteItem.bind(null, id),
    {message: 'not submitted'}
  )

  //   const handleDelete = async () => {
  //   await deleteItem(id)
  // }

  return (
    <button
      style={{
        padding: '6px 12px',
        fontSize: '14px',
        fontWeight: 500,
        color: '#fff',
        backgroundColor: '#ef4444',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
      }}
      onClick={() => startTransition(action)}
      disabled={pending}
    >
      {pending ? 'Deleting...' : 'Delete'}
    </button>
  )
}