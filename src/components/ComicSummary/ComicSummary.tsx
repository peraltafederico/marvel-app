import React from 'react'
import * as Styled from './ComicSummary.styles'

const img = 'http://i.annihil.us/u/prod/marvel/i/mg/c/80/5e3d7536c8ada/portrait_xlarge.jpg'

export const ComicSummary = (): JSX.Element => (
  <Styled.Container>
    <Styled.CoverPage>
      <Styled.Image src={img} />
    </Styled.CoverPage>
    <Styled.Content>
      <Styled.Title>Title</Styled.Title>
      <Styled.ComicInfo>
        <Styled.Data>Published: </Styled.Data>
        <Styled.Data>Writer: </Styled.Data>
        <Styled.Data>Penciller: </Styled.Data>
        <Styled.Data>Cover Artist: </Styled.Data>
      </Styled.ComicInfo>
      <Styled.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et neque et orci congue
        dignissim sit amet non enim. In hac habitasse platea dictumst. Sed sodales a enim at varius.
        Etiam sed velit euismod, luctus nunc vel, hendrerit leo. Ut est sapien, vehicula sed porta
        sit amet, condimentum id augue.
      </Styled.Description>
    </Styled.Content>
  </Styled.Container>
)
