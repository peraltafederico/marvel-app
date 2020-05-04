import React, { useState, useEffect, FC, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import * as Styled from './Layout.styles'
import { NavBar } from '../../components/NavBar'
import useDebounce from '../../hooks/useDebounce'
import useQuery from '../../hooks/useQuery'
import { AppStateContext, AppDispatchContext } from '../../context/app'

interface Layout {
  children: React.ReactNode
}

export const Layout: FC<Layout> = ({ children }: Layout) => {
  const history = useHistory()
  const query = useQuery(`${useLocation().search}`)
  const inputParam = query.get('input') || ''
  const [value, setValue] = useState(inputParam)
  const [search, alreadySearched] = useDebounce(value, 500)
  const appDispatch = useContext(AppDispatchContext)
  const appState = useContext(AppStateContext)

  useEffect(() => {
    if (alreadySearched && inputParam !== value) {
      history.push(`/search?input=${search}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, history])

  useEffect(() => {
    setValue(inputParam)
  }, [inputParam])

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.currentTarget.value)
  }

  const handleChangeTheme = (): void => {
    appDispatch({
      type: 'CHANGE_THEME',
      payload: {
        theme: appState.theme === 'light' ? 'dark' : 'light',
      },
    })
  }

  useEffect(() => {
    localStorage.setItem('app', JSON.stringify(appState))
  }, [appState])

  return (
    <>
      <NavBar
        value={value}
        onChange={handleChangeInput}
        starSelected={window.location.pathname === '/favorites'}
        starLinkPath={window.location.pathname === '/favorites' ? '/search' : '/favorites'}
        onClickThemeIcon={handleChangeTheme}
        theme={appState.theme}
      />
      <Styled.ContentContainer>
        <Styled.Content>{children}</Styled.Content>
      </Styled.ContentContainer>
    </>
  )
}
