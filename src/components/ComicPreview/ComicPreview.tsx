import React, { useState, useRef, useEffect } from 'react'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import * as Styled from './ComicPreview.styles'
import { isNil } from 'lodash'

interface ComicPreview {
  favourite?: boolean
  title: string
  img: string
  description: string
  onClickImage: () => void
  onClickFavourite: () => void
}

export const ComicPreview = ({
  favourite,
  onClickImage,
  onClickFavourite,
  title,
  img,
  description,
}: ComicPreview): JSX.Element => {
  const [selected, setSelected] = useState(favourite)
  const [withEllipsis, setWithEllipsis] = useState(false)
  const descRef = useRef<HTMLDivElement>(null)

  const handleClickFavourite = (): void => {
    setSelected(!selected)
    onClickFavourite()
  }

  useEffect(() => {
    if (descRef.current!.scrollHeight > descRef.current!.clientHeight) {
      setWithEllipsis(true)
    }
  }, [descRef])

  return (
    <Styled.Container>
      <Styled.CoverPage>
        <Styled.Image onClick={onClickImage} src={img} />
      </Styled.CoverPage>
      <Styled.Content>
        <Styled.Header>
          <Styled.Title>{title}</Styled.Title>
          <Styled.StarIcon
            onClick={handleClickFavourite}
            icon={selected ? faStarSolid : faStarRegular}
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
