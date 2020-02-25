import React, { useState } from 'react'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import * as Styled from './ComicPreview.styles'

const img = 'http://i.annihil.us/u/prod/marvel/i/mg/c/80/5e3d7536c8ada/portrait_xlarge.jpg'

interface ComicPreview {
  favourite?: boolean
  onClickImage: () => void
  onClickFavourite: () => void
}

export const ComicPreview = ({
  favourite,
  onClickImage,
  onClickFavourite,
}: ComicPreview): JSX.Element => {
  const [selected, setSelected] = useState(favourite)

  const handleOnClickFavourite = (): void => {
    setSelected(!selected)
    onClickFavourite()
  }

  return (
    <Styled.Container onClick={(): void => onClickImage()}>
      <Styled.CoverPage>
        <Styled.Image src={img} />
      </Styled.CoverPage>
      <Styled.Content>
        <Styled.Header>
          <Styled.Title>Title</Styled.Title>
          <Styled.StarIcon
            onClick={(): void => handleOnClickFavourite()}
            icon={selected ? faStarSolid : faStarRegular}
          />
        </Styled.Header>
        <Styled.Description>asdsaopdmsaopdmsap</Styled.Description>
      </Styled.Content>
    </Styled.Container>
  )
}
