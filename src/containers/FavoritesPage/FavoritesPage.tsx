import React, { FC, useState, useEffect, useContext } from 'react'
import { Card } from '../../components/Card'
import { StyledCardContainer } from './FavoritesPage.styles'
import { fetchWithLoading } from '../../utils'
import { Spinner } from '../../components/Spinner/Spinner.styles'
import { ComicsModal } from '../ComicsModal'
import { UserStateContext, UserDispatchContext } from '../../context/user'
import { MarvelService } from '../../services/marvelService'
import { Character } from '../../interfaces/Character'

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

      const characters = await Promise.all(
        ids.map(async (id) => {
          const { character } = await MarvelService.getCharacterById(id)
          return character
        })
      )

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
        id: character.id,
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
          ids={userState.favCharacters[selectedCharacter.id].comics}
          all={false}
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
