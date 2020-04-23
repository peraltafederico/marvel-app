import React, { FC, useState, useEffect, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Card } from '../../components/Card'
import { StyledCardContainer } from './SearchPage.styles'
import { fetchWithLoading } from '../../utils'
import { Spinner } from '../../components/Spinner/Spinner.styles'
import { ComicsModal } from '../ComicsModal'
import { UserStateContext, UserDispatchContext } from '../../context/user'
import { Character } from '../../models/Character'
import { MarvelApi } from '../../services/MarvelApi'
import useQuery from '../../hooks/useQuery'

export const SearchPage: FC = (): JSX.Element => {
  const userState = useContext(UserStateContext)
  const userDispatch = useContext(UserDispatchContext)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState({} as Character)
  const [characters, setCharacters] = useState([] as Character[])
  const query = useQuery(`${useLocation().search}${useLocation().hash}`)
  const inputParam = query.get('input')
  const characterParam = query.get('character')
  const comicParam = query.get('comic')

  const history = useHistory()

  useEffect(() => {
    const getCharacters = async (): Promise<void> => {
      // TODO: Review this
      const offset = Math.floor(Math.random() * 1400 + 1)
      let characters = []

      // TODO: Fetch characters only with comics
      if (!characterParam && !comicParam) {
        if (inputParam) {
          characters = await MarvelApi.getCharacters({
            nameStartsWith: inputParam,
            limit: 20,
          })
        } else {
          characters = await MarvelApi.getCharacters({
            offset,
            limit: 1,
          })
        }
      } else {
        characters = await MarvelApi.getCharactersByNames(characterParam.split(','))
      }

      setCharacters(characters)
    }

    const inputWithComicUrl = inputParam?.match(/(marvel\.com\/comics\/issue\/)((?:[0-9]+))/)

    if (inputWithComicUrl) {
      const id = inputWithComicUrl[inputWithComicUrl.length - 1]

      history.push(`/comic/${id}`)
    } else {
      fetchWithLoading(setLoading, getCharacters)
    }

    setShowModal(false)
  }, [inputParam, characterParam, history, comicParam])

  useEffect(() => {
    localStorage.setItem('favCharacters', JSON.stringify(userState))
  }, [userState])

  const handleClickCard = (character: Character): void => {
    setSelectedCharacter(character)
    setShowModal(!showModal)
  }

  const handleClickFavorite = (character: Character, favorite: boolean): void => {
    userDispatch({
      type: !favorite ? 'ADD_FAV_CHARACTER' : 'REMOVE_FAV_CHARACTER',
      payload: {
        id: character.getId(),
      },
    })
  }

  return (
    <>
      {showModal && (
        <ComicsModal
          characterId={selectedCharacter.getId()}
          title={selectedCharacter.name}
          onClose={() => setShowModal(false)}
          names={comicParam ? comicParam.split(',') : []}
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        characters.map((character, index) => {
          const background = character.getThumbnail()
          const favorite = !!userState.favCharacters[character.getId()]

          return (
            <StyledCardContainer key={`character${index}`}>
              <Card
                title={character.name}
                background={background}
                onClickImage={() => handleClickCard(character)}
                onClickFavorite={() => handleClickFavorite(character, favorite)}
                favorite={favorite}
              />
            </StyledCardContainer>
          )
        })
      )}
    </>
  )
}
