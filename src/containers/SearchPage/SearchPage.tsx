import React, { FC, useState, useEffect, useContext } from 'react'
import { get } from 'lodash'
import { Card } from '../../components/Card'
import { StyledCardContainer } from './SearchPage.styles'
import axios from '../../services/api'
import { getCharacterThumbnail, fetchWithLoading } from '../../utils'
import { Spinner } from '../../components/Spinner/Spinner.styles'
import useQuery from '../../hooks/useQuery'
import { ComicsModal } from '../ComicsModal'
import { UserStateContext, UserDispatchContext } from '../../context/user'

interface SelectedCharacter {
  id: number
  name: string
}

export const SearchPage: FC = (): JSX.Element => {
  const userState = useContext(UserStateContext)
  const userDispatch = useContext(UserDispatchContext)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState({} as SelectedCharacter)
  const [characters, setCharacters] = useState([] as any)
  const query = useQuery()
  const search = query.get('character')

  useEffect(() => {
    const getCharacters = async (): Promise<void> => {
      // TODO: Review this
      const offset = Math.floor(Math.random() * 1400 + 1)
      let url = '/characters'

      url += search ? `?&nameStartsWith=${search}&limit=20` : `?&offset=${offset}&limit=1`

      const { data: res } = await axios.get(url)
      const characters = get(res, 'data.results')

      setCharacters([...characters])
    }

    fetchWithLoading(setLoading, getCharacters)
  }, [search])

  const handleClickCard = (name: string, id: number): void => {
    setSelectedCharacter({ id, name })
    setShowModal(true)
  }

  const handleClickFavorite = (id: number, favorite: boolean): void => {
    userDispatch({
      type: !favorite ? 'ADD_FAV_CHARACTER' : 'REMOVE_FAV_CHARACTER',
      payload: {
        id: id.toString(),
      },
    })
  }

  return (
    <>
      {showModal && (
        <ComicsModal
          characterId={selectedCharacter.id}
          title={selectedCharacter.name}
          onClose={(): void => setShowModal(false)}
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        characters.map((character, index) => {
          const background = getCharacterThumbnail(character)
          const favorite = !!userState.favCharacters[character.id.toString()]

          return (
            <StyledCardContainer key={`character${index}`}>
              <Card
                title={character.name}
                background={background}
                onClickImage={(): void => handleClickCard(character.name, character.id)}
                onClickFavorite={(): void => handleClickFavorite(character.id, favorite)}
                favorite={favorite}
              />
            </StyledCardContainer>
          )
        })
      )}
    </>
  )
}
