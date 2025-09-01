'use client'
import React from 'react'
import { NavGroup, Link } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'

export const AfterNavLinks = () => {
  const pathname = usePathname()
  const href = '/admin/analytics'
  const active = pathname.includes(href)

  return <NavGroup label={'Views'}>
    <Link href={href} className="nav__link" id="nav-analytics"
          style={{ cursor: active ? 'pointer' : 'auto', pointerEvents: active ? 'none' : 'auto' }}>
      {active && <div className="nav__link-indicator" />}
      <span className="nav__link-label">
      Analytics
    </span>
    </Link>
  </NavGroup>
}

export default AfterNavLinks