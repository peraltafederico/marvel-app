import React, { useState } from 'react'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import * as Styled from './Card.styles'

interface Card {
  favourite?: boolean
  background: string
  title: string
  onClickImage: () => void
  onClickFavourite: () => void
}

export const Card = ({
  favourite,
  onClickImage,
  onClickFavourite,
  background,
  title,
}: Card): JSX.Element => {
  const [selected, setSelected] = useState(favourite)

  const handleOnClickFavourite = (): void => {
    setSelected(!selected)
    onClickFavourite()
  }

  return (
    <Styled.Container background={background}>
      <Styled.StarIcon
        onClick={(): void => handleOnClickFavourite()}
        icon={selected ? faStarSolid : faStarRegular}
      />
      <Styled.Title onClick={(): void => onClickImage()}>{title.toUpperCase()}</Styled.Title>
    </Styled.Container>
  )
}
