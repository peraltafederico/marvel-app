import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Modal = styled.div`
  position: fixed;
  margin: auto;
  top: 47px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-flow: column;
  width: 437px;
  height: 448px;
  border-radius: 10px;
  padding: 0 15px 15px;
  background-color: ${(props): string => props.theme.content.background};
  z-index: 9999;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 15px;
  }
`

export const Header = styled.div`
  display: flex;
  flex-flow: column;
  position: sticky;
  top: 0;
  width: 437px;
  background-color: ${(props): string => props.theme.content.background};
  padding: 25px 5px 20px 0;
  box-sizing: border-box;
  z-index: 9;
`

export const CloseIcon = styled(FontAwesomeIcon)`
  color: ${(props): string => props.theme.content.iconColor};
  align-self: flex-end;
  position: absolute;
  top: 15px;
  &:hover {
    cursor: pointer;
  }
`

export const Title = styled.h2`
  margin: 0;
  color: ${(props): string => props.theme.content.textColor};
`

export const Content = styled.div`
  flex: 1;
`
