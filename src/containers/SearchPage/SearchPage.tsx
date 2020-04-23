import React, { FC, useState, useEffect, useContext } from 'react'
import { get, head } from 'lodash'
import { useHistory, useLocation } from 'react-router-dom'
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
  const query = useQuery(`${useLocation().search}${useLocation().hash}`)
  const inputParam = query.get('input')
  const characterParam = query.get('character')
  const comicParam = query.get('comic')

  const history = useHistory()

  useEffect(() => {
    const getCharactersByParam = async (names: string[]): Promise<any> => {
      const response = await Promise.all(
        names.map(async (name) => axios.get(`/characters?&name=${name}`))
      )

      return response
        .filter((res) => get(res, 'data.data.results').length > 0)
        .map((res) => head(get(res, 'data.data.results')))
    }

    const getCharacters = async (): Promise<void> => {
      // TODO: Review this
      const offset = Math.floor(Math.random() * 1400 + 1)
      let url = ''
      let characters = []

      // TODO: Fetch characters only with comics
      if (!characterParam && !comicParam) {
        if (inputParam) {
          url = `/characters?&nameStartsWith=${inputParam}&limit=20`
        } else {
          url = `/characters?&offset=${offset}&limit=1`
        }

        const { data: res } = await axios.get(url)
        characters = get(res, 'data.results')
      } else {
        characters = await getCharactersByParam(characterParam.split(','))
      }

      setCharacters(characters)
    }

    const comicUrl = inputParam?.match(/(marvel\.com\/comics\/issue\/)((?:[0-9]+))/)

    if (comicUrl) {
      const id = comicUrl[comicUrl.length - 1]

      history.push(`/comic/${id}`)
    } else {
      fetchWithLoading(setLoading, getCharacters)
    }

    setShowModal(false)
  }, [inputParam, characterParam, history, comicParam])

  useEffect(() => {
    localStorage.setItem('favCharacters', JSON.stringify(userState))
  }, [userState])

  const handleClickCard = (name: string, id: number): void => {
    setSelectedCharacter({ id, name })
    setShowModal(!showModal)
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
          names={comicParam ? comicParam.split(',') : []}
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
