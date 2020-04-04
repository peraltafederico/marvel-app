import React from 'react'
import * as Styled from './ComicSummary.styles'

interface ComicSummary {
  title: string
  imgUrl: string
  description: string
}

export const ComicSummary = ({ title, imgUrl, description }: ComicSummary): JSX.Element => (
  <Styled.Container>
    <Styled.CoverPage>
      <Styled.Image src={imgUrl} />
    </Styled.CoverPage>
    <Styled.Content>
      <Styled.Title>{title}</Styled.Title>
      <Styled.ComicInfo>
        <Styled.Data>Published: </Styled.Data>
        <Styled.Data>Writer: </Styled.Data>
        <Styled.Data>Penciller: </Styled.Data>
        <Styled.Data>Cover Artist: </Styled.Data>
      </Styled.ComicInfo>
      {description && <Styled.Description>{description}</Styled.Description>}
    </Styled.Content>
  </Styled.Container>
)
