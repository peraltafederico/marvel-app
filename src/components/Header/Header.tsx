import React, { useState } from 'react'
import { faStar as faStarSolid, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
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
        <Link to="/">
          <Styled.Logo src={logo} alt="Logo" />
        </Link>
      </Styled.LogoContainer>
      <Styled.Divider />
      <Styled.InputContainer>
        <Styled.SearchIcon size="lg" icon={faSearch} />
        <Styled.Input type="text" placeholder="Buscar" />
        <Styled.StarIcon
          size="lg"
          onClick={(): void => handleOnClick()}
          icon={selected ? faStarSolid : faStarRegular}
        />
      </Styled.InputContainer>
      <Styled.Divider height="25px" />
    </Styled.Container>
  )
}
