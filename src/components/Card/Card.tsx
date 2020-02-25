import React, { useState } from 'react'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import * as Styled from './Card.styles'

const background = 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784/portrait_xlarge.jpg'

interface Card {
  favourite?: boolean
  onClickImage: () => void
  onClickFavourite: () => void
}

export const Card = ({ favourite, onClickImage, onClickFavourite }: Card): JSX.Element => {
  const [selected, setSelected] = useState(favourite)

  const handleOnClickFavourite = (): void => {
    setSelected(!selected)
    onClickFavourite()
  }

  return (
    <Styled.Container onClick={(): void => onClickImage()} background={background}>
      <Styled.StarIcon
        onClick={(): void => handleOnClickFavourite()}
        icon={selected ? faStarSolid : faStarRegular}
      />
      <Styled.Title>MY NAME</Styled.Title>
    </Styled.Container>
  )
}
