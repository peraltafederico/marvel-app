import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import { Card } from '../../components/Card'
import { StyledCardContainer } from './SearchPage.styles'
import { Modal } from '../../components/Modal'
import { ComicPreview } from '../../components/ComicPreview'
import axios from '../../services/api'
import { getCharacterThumbnail, getComicThumbnail, fetchWithLoading } from '../../utils'
import { Spinner } from '../../components/Spinner/Spinner.styles'
import useQuery from '../../hooks/useQuery'
import { ComicsModal } from '../ComicsModal'

interface SelectedCharacter {
  id: number
  name: string
}

export const SearchPage = (): JSX.Element => {
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
      // TODO: Fetch data when scrolling
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
        characters.map((character, index) => (
          <StyledCardContainer key={`character${index}`}>
            <Card
              title={character.name}
              background={getCharacterThumbnail(character)}
              onClickImage={(): void => handleClickCard(character.name, character.id)}
              onClickFavourite={(): void => {}}
            />
          </StyledCardContainer>
        ))
      )}
    </>
  )
}
