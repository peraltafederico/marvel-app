import React, { FC, useState, useEffect, useContext } from 'react'
import { Card } from '../../components/Card'
import { StyledCardContainer } from './FavoritesPage.styles'
import { fetchWithLoading } from '../../utils'
import { Spinner } from '../../components/Spinner/Spinner.styles'
import { ComicsModal } from '../ComicsModal'
import { UserStateContext, UserDispatchContext } from '../../context/user'
import { Character } from '../../models/Character'
import { MarvelService } from '../../services/marvelService'

export const FavoritesPage: FC = () => {
  const userState = useContext(UserStateContext)
  const userDispatch = useContext(UserDispatchContext)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [characters, setCharacters] = useState([] as Character[])
  const [selectedCharacter, setSelectedCharacter] = useState({} as Character)

  useEffect(() => {
    const getCharacters = async (): Promise<void> => {
      const ids = Object.keys(userState.favCharacters)
      const characters = await MarvelService.getCharactersByIds(ids)

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
          onClose={(): void => setShowModal(false)}
          onlyFavorites={true}
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        characters.map((character, index) => {
          const img = character.getThumbnail()
          const favorite = !!userState.favCharacters[character.id.toString()]

          return (
            <StyledCardContainer key={`character${index}`}>
              <Card
                title={character.name}
                background={img}
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
