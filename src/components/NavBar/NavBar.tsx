import React from 'react'
import { faStar as faStarSolid, faSearch, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import * as Styled from './NavBar.styles'

interface NavBar {
  value: string
  starLinkPath: string
  starSelected: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const NavBar = ({ onChange, value, starSelected, starLinkPath }: NavBar): JSX.Element => {
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
        <Styled.Input onChange={onChange} value={value} type="text" placeholder="Buscar" />
        <Link to={starLinkPath}>
          <Styled.Icon size="lg" icon={starSelected ? faStarSolid : faStarRegular} />
        </Link>
      </Styled.InputContainer>
      <Styled.Divider height="25px" />
      <Styled.Icon size="lg" icon={starSelected ? faSun : faMoon} />
    </Styled.Container>
  )
}
