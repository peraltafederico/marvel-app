import React from 'react'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import * as Styled from './Card.styles'

interface Card {
  favorite: boolean
  background: string
  title: string
  onClickImage: () => void
  onClickFavorite: () => void
}

export const Card = ({
  favorite,
  onClickImage,
  onClickFavorite,
  background,
  title,
}: Card): JSX.Element => {
  return (
    <Styled.Container background={background}>
      <Styled.StarIcon onClick={onClickFavorite} icon={favorite ? faStarSolid : faStarRegular} />
      <Styled.Title onClick={onClickImage}>{title}</Styled.Title>
    </Styled.Container>
  )
}
