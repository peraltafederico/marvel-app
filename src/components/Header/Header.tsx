import React, { useState } from 'react'
import { faStar as faStarSolid, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import * as Styled from './Header.styles'

interface Header {
  value: string
  starSelected: boolean
  onClickStar: () => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Header = ({ onClickStar, onChange, value, starSelected }: Header): JSX.Element => {
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
        <Styled.StarIcon
          size="lg"
          onClick={onClickStar}
          icon={starSelected ? faStarSolid : faStarRegular}
        />
      </Styled.InputContainer>
      <Styled.Divider height="25px" />
    </Styled.Container>
  )
}
