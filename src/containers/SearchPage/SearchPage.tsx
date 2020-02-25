import React, { useState } from 'react'
import { Layout } from '../Layout'
import { Card } from '../../components/Card'
import { StyledCardContainer } from './SearchPage.styles'
import { Modal } from '../../components/Modal'
import { ComicPreview } from '../../components/ComicPreview'

export const SearchPage = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {showModal && (
        <Modal onClose={(): void => setShowModal(false)}>
          {[0, 1, 2, 3, 4].map(
            (_, index): JSX.Element => (
              <ComicPreview key={`comicPreview${index}`} onClick={(): void => {}} />
            )
          )}
        </Modal>
      )}
      <Layout>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((character, index) => (
          <StyledCardContainer key={`character${index}`}>
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
