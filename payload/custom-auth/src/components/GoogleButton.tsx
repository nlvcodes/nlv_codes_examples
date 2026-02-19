'use client'
import React, {useState} from 'react'
import {FcGoogle} from 'react-icons/fc'
import type {User} from '@/payload-types'

type Provider = NonNullable<
  NonNullable<User['externalId']>['authStrategies']
>[number]['authProvider']

export const AfterLogin = () => {
  const [loading, setLoading] = useState(false)
  const handleLogin = (provider: Provider) => () => {
    setLoading(true)
    window.location.href = `/api/users/auth/${provider}`
  }
  return (
    <button
      disabled={loading}
      onClick={handleLogin('google')}
      style={{
        backgroundColor: loading ? '#1d4ed8' : '#3b82f6',
        color: 'white',
        fontWeight: 'bold',
        marginTop: '2rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        borderRadius: '0.25rem',
        border: 'none',
        cursor: loading ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#1d4ed8')}
      onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#3b82f6')}
    >
      {/*<FcGoogle style={{ marginRight: '0.5rem', width: '1.5rem', height: '1.5rem' }} />*/}
      Sign in with Google
    </button>
  )
}
