import React, { useState } from 'react'
import { Layout } from '../Layout'
import { ComicSummary } from '../../components/ComicSummary'

export const ComicPage = (): JSX.Element => {
  return (
    <Layout>
      <ComicSummary />
    </Layout>
  )
}
