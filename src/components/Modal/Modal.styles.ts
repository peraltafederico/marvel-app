import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// TODO: style scroll bar

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #00000076;
`

export const Modal = styled.div`
  display: flex;
  flex-flow: column;
  width: 437px;
  height: 448px;
  border-radius: 10px;
  overflow: auto;
  padding: 0 15px 15px;
  background-color: white;
  z-index: 99;
`

export const Header = styled.div`
  display: flex;
  flex-flow: column;
  position: fixed;
  width: 437px;
  z-index: 999;
  background-color: white;
  padding: 9px 5px 15px 0;
  box-sizing: border-box;
`

export const CloseIcon = styled(FontAwesomeIcon)`
  align-self: flex-end;
`

export const Title = styled.h2`
  margin: 0;
`

export const Content = styled.div`
  margin-top: 60px;
  flex: 1;
`
