import React from 'react'
import { Layout } from '../Layout'
import { Card } from '../../components/Card'
import { StyledCardContainer } from './SearchPage.styles'

export const SearchPage = (): JSX.Element => (
  <Layout>
    {[0, 1, 2, 3, 4, 5, 6, 7].map((character, index) => (
      <StyledCardContainer key={`character${index}`}>
        <Card />
      </StyledCardContainer>
    ))}
  </Layout>
)
