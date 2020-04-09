import React, { useState } from 'react'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import * as Styled from './Card.styles'

interface Card {
  favorite?: boolean
  background: string
  title: string
  onClickImage: () => void
  onClickStar: () => void
}

export const Card = ({
  favorite,
  onClickImage,
  onClickStar,
  background,
  title,
}: Card): JSX.Element => {
  const [selected, setSelected] = useState(favorite)

  const handleClickFavorite = (): void => {
    setSelected(!selected)
    onClickStar()
  }

  return (
    <Styled.Container background={background}>
      <Styled.StarIcon
        onClick={handleClickFavorite}
        icon={selected ? faStarSolid : faStarRegular}
      />
      <Styled.Title onClick={onClickImage}>{title}</Styled.Title>
    </Styled.Container>
  )
}
