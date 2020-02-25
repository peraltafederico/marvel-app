import React, { useState } from 'react'
import { faStar as faStarSolid, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import logo from '../../assets/logo.png'
import * as Styled from './Header.styles'

interface Header {
  onClick: () => void
}

export const Header = ({ onClick }: Header): JSX.Element => {
  const [selected, setSelected] = useState(false)

  const handleOnClick = (): void => {
    setSelected(!selected)
    onClick()
  }

  return (
    <Styled.Container>
      <Styled.LogoContainer>
        <Styled.Logo src={logo} alt="Logo" />
      </Styled.LogoContainer>
      <Styled.Divider />
      <Styled.InputContainer>
        <Styled.StyledSearchIcon size="lg" icon={faSearch} />
        <Styled.Input type="text" placeholder="Buscar" />
        <Styled.StyledStarIcon
          size="lg"
          onClick={(): void => handleOnClick()}
          icon={selected ? faStarSolid : faStarRegular}
        />
      </Styled.InputContainer>
      <Styled.Divider height="25px" />
    </Styled.Container>
  )
}
