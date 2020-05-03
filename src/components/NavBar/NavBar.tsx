import React from 'react'
import { faStar as faStarSolid, faSearch, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import { useWindowSize } from '@reach/window-size'
import logo from '../../assets/logo.png'
import * as Styled from './NavBar.styles'
import { screenConfig } from '../../config'

interface NavBar {
  value: string
  starLinkPath: string
  starSelected: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClickThemeIcon: () => void
  theme: string
}

export const NavBar = ({
  onChange,
  value,
  starSelected,
  starLinkPath,
  onClickThemeIcon,
  theme,
}: NavBar): JSX.Element => {
  const { width } = useWindowSize()
  const iconSize = width > screenConfig.desktop ? 'lg' : '1x'
  return (
    <Styled.Container>
      <Styled.LogoContainer>
        <Link to="/">
          <Styled.Logo src={logo} alt="Logo" />
        </Link>
      </Styled.LogoContainer>
      {width > screenConfig.desktop && <Styled.Divider />}
      <Styled.InputContainer>
        {width > screenConfig.desktop && <Styled.SearchIcon size="lg" icon={faSearch} />}
        <Styled.Input onChange={onChange} value={value} type="text" placeholder="Buscar" />
        <Link to={starLinkPath}>
          <Styled.Icon size={iconSize} icon={starSelected ? faStarSolid : faStarRegular} />
        </Link>
      </Styled.InputContainer>
      <Styled.Divider height="25px" />
      <Styled.Icon
        onClick={onClickThemeIcon}
        size={iconSize}
        icon={theme === 'light' ? faMoon : faSun}
      />
    </Styled.Container>
  )
}
