import React from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import logo from '../../assets/logo.png'
import * as Styled from './Header.styles'

export const Header = (): JSX.Element => (
  <Styled.Container>
    <Styled.LogoContainer>
      <Styled.Logo src={logo} alt="Logo" />
    </Styled.LogoContainer>
    <Styled.Divider />
    <Styled.InputContainer>
      <Styled.StyledFAIcon size="lg" icon={faSearch} />
      <Styled.Input type="text" placeholder="Buscar" />
      <Styled.StyledFAIcon size="lg" icon={faStar} />
    </Styled.InputContainer>
    <Styled.Divider height="25px" />
  </Styled.Container>
)
