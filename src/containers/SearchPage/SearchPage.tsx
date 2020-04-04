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

interface SelectedCharacter {
  id: number
  name: string
}

export const SearchPage = (): JSX.Element => {
  const [fetchingChars, setFetchingChars] = useState(true)
  const [fetchingComics, setFetchingComics] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState({} as SelectedCharacter)
  const [comicList, setComicList] = useState([] as any)
  const [showModal, setShowModal] = useState(false)
  const [characters, setCharacters] = useState([] as any)
  const query = useQuery()
  const search = query.get('character')

  useEffect(() => {
    const getCharacters = async (): Promise<void> => {
      // TODO: Review this
      const offset = Math.floor(Math.random() * 1400 + 1)
      // TODO: Fetch data when scrolling
      const url = search
        ? `/characters?&nameStartsWith=${search}&limit=100`
        : `/characters?&offset=${offset}&limit=1`

      const { data: res } = await axios.get(url)
      const characters = get(res, 'data.results')

      setCharacters(characters)
    }

    fetchWithLoading(setFetchingChars, getCharacters)
  }, [search])

  useEffect(() => {
    const getComics = async (): Promise<void> => {
      const { data: res } = await axios.get(
        `/characters/${selectedCharacter.id}/comics?&orderBy=-focDate`
      )

      setComicList(get(res, 'data.results'))
    }

    if (selectedCharacter.id) {
      fetchWithLoading(setFetchingComics, getComics)
    }
  }, [selectedCharacter.id])

  const handleClickCard = (name: string, id: number): void => {
    setSelectedCharacter({ id, name })
    setShowModal(true)
  }

  return (
    <>
      {showModal && (
        <Modal title={selectedCharacter.name} onClose={(): void => setShowModal(false)}>
          {fetchingComics ? (
            <Spinner />
          ) : (
            (comicList || []).map(
              (comic, index): JSX.Element => (
                <ComicPreview
                  key={`comicPreview${index}`}
                  id={comic.id}
                  onClickFavourite={(): void => {}}
                  title={get(comic, 'title')}
                  img={getComicThumbnail(comic)}
                  description={get(comic, 'description')}
                />
              )
            )
          )}
        </Modal>
      )}
      {fetchingChars ? (
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
