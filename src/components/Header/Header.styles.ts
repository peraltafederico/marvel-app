import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface DividerProps {
  height?: string
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 57px;
  padding: 25px;
  box-sizing: border-box;
  align-items: center;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
`

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
`

export const StyledSearchIcon = styled(FontAwesomeIcon)`
  color: rgba(0, 0, 0, 0.1);
  padding: 10px;
`

export const StyledStarIcon = styled(FontAwesomeIcon)`
  color: rgba(0, 0, 0, 0.1);
  padding: 10px;
`

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
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
  background-color: rgba(0, 0, 0, 0.1);
`
