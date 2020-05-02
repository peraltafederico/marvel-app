import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface DividerProps {
  height?: string
}

export const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 57px;
  padding: 25px;
  box-sizing: border-box;
  align-items: center;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: ${(props): string => props.theme.content.background};
`

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
`

export const SearchIcon = styled(FontAwesomeIcon)`
  color: ${(props): string => props.theme.content.iconColor};
  padding: 10px;
`

export const Icon = styled(FontAwesomeIcon)`
  color: ${(props): string => props.theme.content.iconColor};
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: ${(props): string => props.theme.content.background};
  color: ${(props): string => props.theme.content.textColor};
`

export const LogoContainer = styled.div`
  height: inherit;
  display: flex;
  position: relative;
  align-items: center;
  flex: 1;
`

export const Logo = styled.img`
  width: 100px;
  height: 42px;
`

export const Divider = styled.div<DividerProps>`
  width: 1px;
  height: ${(props): string => (props.height ? props.height : '15px')};
  margin: 0 10px;
  background-color: ${(props): string => props.theme.content.iconColor};
`
