import React from 'react'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import * as Styled from './Card.styles'

const background = 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784/portrait_xlarge.jpg'

export const Card = (): JSX.Element => (
  <Styled.Container background={background}>
    <Styled.StyledStarIcon icon={faStar} />
    <Styled.Title>MY NAME</Styled.Title>
  </Styled.Container>
)
