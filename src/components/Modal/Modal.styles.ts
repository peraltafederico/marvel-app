import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { media } from '../../theme/media'

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
  box-sizing: border-box;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 15px;
  }

  ${media.mobile} {
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    padding: 0 8px 8px;

    ::-webkit-scrollbar {
      width: none;
    }
    ::-webkit-scrollbar-thumb {
      background: none;
      border-radius: none;
    }
  }
`

export const Header = styled.div`
  display: flex;
  flex-flow: column;
  position: sticky;
  top: 0;
  background-color: ${(props): string => props.theme.content.background};
  padding: 15px 5px 15px 0;
  box-sizing: border-box;
  z-index: 9;

  ${media.mobile} {
    width: auto;
  }
`

export const CloseIcon = styled(FontAwesomeIcon)`
  color: ${(props): string => props.theme.modal.iconColor};
  align-self: flex-end;
  &:hover {
    cursor: pointer;
  }
`

export const Title = styled.h2`
  margin: 0;
  color: ${(props): string => props.theme.content.textColor};

  ${media.mobile} {
    text-align: center;
  }
`

export const Content = styled.div`
  flex: 1;
`
