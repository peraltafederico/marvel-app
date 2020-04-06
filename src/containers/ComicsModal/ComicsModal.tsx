import React, { useEffect, useState, useCallback, useRef } from 'react'
import { get } from 'lodash'
import { Spinner } from '../../components/Spinner'
import { Modal } from '../../components/Modal'
import { getComicThumbnail, fetchWithLoading } from '../../utils'
import { ComicPreview } from '../../components/ComicPreview'
import axios from '../../services/api'

interface ComicsMoldal {
  characterId: number
  title: string
  onClose: () => void
}

export const ComicsModal = ({ characterId, title, onClose }: ComicsMoldal): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const [comics, setComics] = useState([] as any)
  const [hasComicsToFetch, setHasComicsToFetch] = useState(true)
  const [page, setPage] = useState(0)
  const loadingRef = useRef(null)
  const limit = 20

  const handleObserver = useCallback(
    (entities) => {
      const getComics = async (): Promise<void> => {
        const offset = page * limit

        const { data: res } = await axios.get(
          `/characters/${characterId}/comics?&orderBy=-focDate&offset=${offset}`
        )
        const newComics = get(res, 'data.results')

        if (newComics.length > 0) {
          setComics([...comics, ...newComics])

          if (get(res, 'data.total') / offset > 1) {
            setPage(page + 1)
          } else {
            setHasComicsToFetch(false)
          }
        } else {
          setHasComicsToFetch(false)
        }
      }

      const [target] = entities

      if (target.isIntersecting && hasComicsToFetch) {
        !loading && fetchWithLoading(setLoading, getComics)
      }
    },
    [loading, characterId, page, comics, hasComicsToFetch]
  )

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(handleObserver, options)

    if (loadingRef && loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    return (): void => {
      observer.unobserve(loadingRef?.current)
    }
  }, [handleObserver, loadingRef])

  return (
    <Modal title={title} onClose={onClose}>
      {hasComicsToFetch || comics.length > 0
        ? (comics || []).map(
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
        : 'Character with no comics :('}
      <div ref={loadingRef}>{loading && <Spinner />}</div>
    </Modal>
  )
}
