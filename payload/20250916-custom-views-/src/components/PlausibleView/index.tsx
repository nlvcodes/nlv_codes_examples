import React from 'react';
import {DefaultTemplate} from '@payloadcms/next/templates'
import {Gutter, SetStepNav, type StepNavItem} from '@payloadcms/ui'
import type {AdminViewServerProps} from 'payload'
import {AnalyticsClient} from './index.client'

export const AnalyticsView: React.FC<AdminViewServerProps> = ({initPageResult, params, searchParams}) => {
  if (!initPageResult.req.user) {
    return <p>You must be logged in to view this page.</p>
  }

  const steps: StepNavItem[] = [
    {
      url: '/analytics',
      label: 'Analytics',
    }
  ]

  return <DefaultTemplate
    visibleEntities={initPageResult.visibleEntities}
    i18n={initPageResult.req.i18n}
    payload={initPageResult.req.payload}
    locale={initPageResult.locale}
    params={params}
    permissions={initPageResult.permissions}
    user={initPageResult.req.user || undefined}
    searchParams={searchParams}
  >
    <SetStepNav nav={steps} />
    <Gutter>
      <h1 style={{margin: '1rem 0 2rem'}}>Analytics Dashboard</h1>
      <AnalyticsClient />
    </Gutter>
  </DefaultTemplate>
}

export default AnalyticsView;