import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout } from '../Layout'
import { Card } from '../../components/Card'
import { StyledCardContainer } from './SearchPage.styles'
import { Modal } from '../../components/Modal'
import { ComicPreview } from '../../components/ComicPreview'
import axios from '../../services/api'
import { parseMarvelResponse, getCharacterThumbnail, getCharacterName } from '../../utils'
import { Spinner } from '../../components/Spinner/Spinner.styles'
import useQuery from '../../hooks/useQuery'


export const SearchPage = (): JSX.Element => {
  const [fetching, setFetching] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [characters, setCharacters] = useState([])
  const history = useHistory()
  const query = useQuery()
  const search = query.get('name')

  const onClickImage = (): void => {
    history.push('/comic')
  }

  const fetch = async (callback: Function) => {
    setFetching(true)
    await callback()
    setFetching(false)
  }

  useEffect(() => {
    const findRandomCharacters = async (): Promise<void> => {
      // TODO: Review this
      const offset = Math.floor(Math.random() * 1400 + 1)
  
      const { data } = await axios.get(`/characters?&offset=${offset}`)
      const characters = parseMarvelResponse(data)
      setCharacters(characters)
    }
    const findCharacter = async (): Promise<void> => {
      const { data } = await axios.get(`/characters?&nameStartsWith=${search}`)
      const characters = parseMarvelResponse(data)
      setCharacters(characters)
    }
    if (search) {
      fetch(findCharacter)
    } else {
      fetch(findRandomCharacters)
    }
  }, [search])

  return (
    <>
      {showModal && (
        <Modal onClose={(): void => setShowModal(false)}>
          {[0, 1, 2, 3, 4].map(
            (_, index): JSX.Element => (
              <ComicPreview
                key={`comicPreview${index}`}
                onClickImage={(): void => onClickImage()}
                onClickFavourite={(): void => {}}
              />
            )
          )}
        </Modal>
      )}
      <Layout>
        {fetching ? (
          <Spinner />
        ) : (
          characters.map((character, index) => (
            <StyledCardContainer key={`character${index}`}>
              <Card
                title={getCharacterName(character)}
                background={getCharacterThumbnail(character)}
                onClickImage={(): void => setShowModal(!showModal)}
                onClickFavourite={(): void => {}}
              />
            </StyledCardContainer>
          ))
        )}
      </Layout>
    </>
  )
}
