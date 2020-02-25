import React, { useState } from 'react'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import * as Styled from './ComicPreview.styles'

const img = 'http://i.annihil.us/u/prod/marvel/i/mg/c/80/5e3d7536c8ada/portrait_xlarge.jpg'

interface ComicPreview {
  favourite?: boolean
  onClick: () => void
}

export const ComicPreview = ({ favourite, onClick }: ComicPreview): JSX.Element => {
  const [selected, setSelected] = useState(favourite)

  const handleOnClick = (): void => {
    setSelected(!selected)
    onClick()
  }
  return (
    <Styled.Container>
      <Styled.CoverPage>
        <Styled.Image src={img} />
      </Styled.CoverPage>
      <Styled.Content>
        <Styled.Header>
          <Styled.Title>Title</Styled.Title>
          <Styled.StarIcon
            onClick={(): void => handleOnClick()}
            icon={selected ? faStarSolid : faStarRegular}
          />
        </Styled.Header>
        <Styled.Description>asdsaopdmsaopdmsap</Styled.Description>
      </Styled.Content>
    </Styled.Container>
  )
}
