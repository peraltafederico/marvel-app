import React from 'react'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import * as Styled from './ComicPreview.styles'

const img = 'http://i.annihil.us/u/prod/marvel/i/mg/c/80/5e3d7536c8ada/portrait_xlarge.jpg'

export const ComicPreview = (): JSX.Element => (
  <Styled.Container>
    <Styled.CoverPage>
      <Styled.Image src={img} />
    </Styled.CoverPage>
    <Styled.Content>
      <Styled.Header>
        <Styled.Title>Title</Styled.Title>
        <Styled.StarIcon icon={faStar} />
      </Styled.Header>
      <Styled.Description>asdsaopdmsaopdmsap</Styled.Description>
    </Styled.Content>
  </Styled.Container>
)
