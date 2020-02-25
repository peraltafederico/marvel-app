import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout } from '../Layout'
import { Card } from '../../components/Card'
import { StyledCardContainer } from './ComicPage.styles'
import { Modal } from '../../components/Modal'
import { ComicPreview } from '../../components/ComicPreview'

export const ComicPage = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false)
  const history = useHistory()

  const onClickImage = (): void => {
    history.push('/comic')
  }

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
        {[0, 1, 2, 3, 4, 5, 6, 7].map(character => (
          <StyledCardContainer key={`character${character}`}>
            <Card
              onClickImage={(): void => setShowModal(!showModal)}
              onClickFavourite={(): void => {}}
            />
          </StyledCardContainer>
        ))}
      </Layout>
    </>
  )
}
