import React, { FC, useState, useEffect, useContext } from 'react'
import { get } from 'lodash'
import { Card } from '../../components/Card'
import { StyledCardContainer } from './FavoritesPage.styles'
import axios from '../../services/api'
import { getCharacterThumbnail, fetchWithLoading } from '../../utils'
import { Spinner } from '../../components/Spinner/Spinner.styles'
import { ComicsModal } from '../ComicsModal'
import { UserStateContext, UserDispatchContext } from '../../context/user'
import { Character } from '../../models/Character'

export const FavoritesPage: FC = (): JSX.Element => {
  const userState = useContext(UserStateContext)
  const userDispatch = useContext(UserDispatchContext)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [characters, setCharacters] = useState([] as Character[])
  const [selectedCharacter, setSelectedCharacter] = useState({} as Character)

  useEffect(() => {
    const getCharacters = async (): Promise<void> => {
      const characters = []

      const response = await Promise.all(
        Object.keys(userState.favCharacters).map(async (character) =>
          axios.get(`/characters/${character}`)
        )
      )

      response.forEach((res) => {
        const [result] = get(res, 'data.data.results')
        characters.push(result)
      })

      setCharacters(characters)
    }

    fetchWithLoading(setLoading, getCharacters)
  }, [])

  useEffect(() => {
    localStorage.setItem('favCharacters', JSON.stringify(userState))
  }, [userState])

  const handleClickCard = (character: Character): void => {
    setSelectedCharacter(character)
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
          onlyFavorites={true}
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
                onClickImage={(): void => handleClickCard(character)}
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
