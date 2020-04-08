import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import * as Styled from './ComicSummary.styles'

interface ComicSummary {
  title: string
  imgUrl: string
  description: string
  data: Record<string, string[]>
}

export const ComicSummary = ({ title, imgUrl, description, data }: ComicSummary): JSX.Element => (
  <Styled.Container>
    <Styled.CoverPage>
      <Styled.Image src={imgUrl} />
    </Styled.CoverPage>
    <Styled.Content>
      <Styled.Title>{title}</Styled.Title>
      <Styled.ComicInfo>
        {Object.keys(data).map((key) => (
          <Styled.Data key={key}>{`${key.replace(/^\w/, (c) => c.toUpperCase())}: ${data[key].join(
            ', '
          )}`}</Styled.Data>
        ))}
      </Styled.ComicInfo>
      {description && <Styled.Description>{ReactHtmlParser(description)}</Styled.Description>}
    </Styled.Content>
  </Styled.Container>
)
