import React, { useState } from 'react'
import {
  faStar as faStarSolid,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import * as Styled from './Header.styles'

interface Header {
  onClick: () => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

export const Header = ({ onClick, onChange, value }: Header): JSX.Element => {
  const [selected, setSelected] = useState(false)

  const handleClick = (): void => {
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
        <Styled.Input
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Buscar"
        />
        <Styled.StarIcon
          size="lg"
          onClick={handleClick}
          icon={selected ? faStarSolid : faStarRegular}
        />
      </Styled.InputContainer>
      <Styled.Divider height="25px" />
    </Styled.Container>
  )
}
