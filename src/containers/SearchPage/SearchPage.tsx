import React, { FC, useState, useEffect, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Card } from '../../components/Card'
import { StyledCardContainer } from './SearchPage.styles'
import { fetchWithLoading } from '../../utils'
import { Spinner } from '../../components/Spinner/Spinner.styles'
import { ComicsModal } from '../ComicsModal'
import { UserStateContext, UserDispatchContext } from '../../context/user'
import { MarvelService } from '../../services/marvelService'
import useQuery from '../../hooks/useQuery'
import { Character } from '../../models/Character'

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
      let characters: Character[] = []

      // TODO: Fetch characters only with comics
      if (!characterParam && !comicParam) {
        let options = {}
        if (inputParam) {
          options = {
            nameStartsWith: inputParam,
            limit: 20,
          }
        } else {
          options = {
            offset,
            limit: 1,
          }
        }
        const { characters: charactersResponse } = await MarvelService.getCharacters(options)
        characters = charactersResponse
      } else {
        const names = characterParam.split(',')

        const charactersByName = await Promise.all(
          names.map(async (name) => {
            const { characters, pagination } = await MarvelService.getCharacters({ name })

            if (pagination.count > 0) {
              return characters
            }

            return undefined
          })
        )

        characters = characters
          .concat(...charactersByName)
          .filter((character) => character !== undefined)
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
        id: character.id,
      },
    })
  }

  return (
    <>
      {showModal && (
        <ComicsModal
          characterID={selectedCharacter.id}
          title={selectedCharacter.name}
          onClose={(): void => setShowModal(false)}
          names={comicParam && comicParam.split(',')}
          all={!comicParam}
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        characters.map((character, index) => {
          const favorite = !!userState.favCharacters[character.id]
          return (
            <StyledCardContainer key={`character${index}`}>
              <Card
                title={character.name}
                background={character.thumbnail}
                onClickImage={(): void => handleClickCard(character)}
                onClickFavorite={(): void => handleClickFavorite(character, favorite)}
                favorite={favorite}
              />
            </StyledCardContainer>
          )
        })
      )}
    </>
  )
}
