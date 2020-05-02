import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: ${(props): string => props.theme.backdrop.background};
  z-index: 99;
`
