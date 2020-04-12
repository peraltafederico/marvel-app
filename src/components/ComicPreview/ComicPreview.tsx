import React, { useState, useRef, useEffect } from 'react'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import * as Styled from './ComicPreview.styles'

interface ComicPreview {
  favorite: boolean
  title: string
  img: string
  description: string
  id: string
  onClickFavorite: () => void
}

export const ComicPreview = ({
  favorite,
  onClickFavorite,
  title,
  img,
  description,
  id,
}: ComicPreview): JSX.Element => {
  const [withEllipsis, setWithEllipsis] = useState(false)
  const descRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ref = descRef.current

    if (ref.scrollHeight > ref.clientHeight) {
      setWithEllipsis(true)
    }
  }, [descRef])

  return (
    <Styled.Container>
      <Styled.CoverPageLink
        to={{
          pathname: `/comic/${id}`,
        }}
      >
        <Styled.Image src={img} />
      </Styled.CoverPageLink>
      <Styled.Content>
        <Styled.Header>
          <Styled.Title>{title}</Styled.Title>
          <Styled.StarIcon
            onClick={onClickFavorite}
            icon={favorite ? faStarSolid : faStarRegular}
          />
        </Styled.Header>
        <Styled.DescriptionContainer ref={descRef}>
          <Styled.Description>{description}</Styled.Description>
          {withEllipsis && <Styled.Ellipsis />}
        </Styled.DescriptionContainer>
      </Styled.Content>
    </Styled.Container>
  )
}
