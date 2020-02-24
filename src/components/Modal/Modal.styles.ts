import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  padding: 15px;
  background-color: white;
  z-index: 99;
`

export const Header = styled.div`
  display: flex;
  flex-flow: column;
`

export const CloseIcon = styled(FontAwesomeIcon)`
  align-self: flex-end;
`

export const Title = styled.h2`
  margin: 5px;
`

export const Content = styled.div`
  flex: 1;
`
