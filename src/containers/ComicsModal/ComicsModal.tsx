import React, { useEffect, useState, useCallback, useRef, useContext } from 'react'
import { get } from 'lodash'
import { Spinner } from '../../components/Spinner'
import { Modal } from '../../components/Modal'
import { getComicThumbnail, fetchWithLoading } from '../../utils'
import { ComicPreview } from '../../components/ComicPreview'
import axios from '../../services/api'
import { UserDispatchContext, UserStateContext } from '../../context/user'
import { Comic } from '../../models/Comic'

interface ComicsMoldal {
  characterId: string
  onlyFavorites?: boolean
  title: string
  names?: string[]
  onClose: () => void
}

const defaultComicsAmount = 20

export const ComicsModal = ({
  characterId,
  title,
  onClose,
  onlyFavorites,
  names,
}: ComicsMoldal): JSX.Element => {
  const userState = useContext(UserStateContext)
  const userDispatch = useContext(UserDispatchContext)
  const [loading, setLoading] = useState(false)
  const [comics, setComics] = useState([] as Comic[])
  const [hasComicsToFetch, setHasComicsToFetch] = useState(true)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const loadingRef = useRef(null)

  const handleClickFavorite = (id: number, favorite: boolean): void => {
    !userState.favCharacters[characterId] &&
      userDispatch({
        type: 'ADD_FAV_CHARACTER',
        payload: {
          id: characterId.toString(),
        },
      })

    userDispatch({
      type: !favorite ? 'ADD_FAV_COMIC' : 'REMOVE_FAV_COMIC',
      payload: {
        charId: characterId.toString(),
        id: id.toString(),
      },
    })
  }

  const handleObserver = useCallback(
    (entities) => {
      const getComics = async (): Promise<void> => {
        const offset = page * defaultComicsAmount
        const limit = total - offset < offset ? total - offset : defaultComicsAmount

        const { data: res } = await axios.get(
          `/characters/${characterId}/comics?&orderBy=-focDate&limit=${limit}&offset=${offset}`
        )

        const newComics = get(res, 'data.results')

        if (!total) {
          setTotal(get(res, 'data.total'))
        }

        if (newComics.length > 0) {
          setComics([...comics, ...newComics])

          if ((total || get(res, 'data.total')) > offset + limit) {
            setPage(page + 1)
          } else {
            setHasComicsToFetch(false)
          }
        } else {
          setHasComicsToFetch(false)
        }
      }

      const getFavoritesComics = async (): Promise<void> => {
        const comics = []
        const charId = characterId.toString()

        const response = await Promise.all(
          userState.favCharacters[charId].comics.map(async (comicId) =>
            axios.get(`/comics/${comicId}`)
          )
        )

        response.forEach((res) => {
          const [result] = get(res, 'data.data.results')

          comics.push(result)
        })

        setComics(comics)
        setHasComicsToFetch(false)
      }

      const getComicsByNames = async (): Promise<void> => {
        let comics = []
        const response = await Promise.all(
          names.map(async (name) => {
            const title = name.split('#')[0]
            const issueNumber = name.split('#')[1] || 0

            return axios.get(
              `/characters/${characterId}/comics?&title=${title}&issueNumber=${issueNumber}`
            )
          })
        )

        const res = response
          .filter((res) => get(res, 'data.data.results').length > 0)
          .map((res) => get(res, 'data.data.results'))

        comics = comics.concat(...res)

        setComics(comics)
        setHasComicsToFetch(false)
      }

      const [target] = entities

      if ((names || []).length > 0) {
        !loading && hasComicsToFetch && fetchWithLoading(setLoading, getComicsByNames)
      } else if (onlyFavorites) {
        !loading && hasComicsToFetch && fetchWithLoading(setLoading, getFavoritesComics)
      } else if (target.isIntersecting && hasComicsToFetch) {
        !loading && fetchWithLoading(setLoading, getComics)
      }
    },
    [loading, characterId, page, comics, hasComicsToFetch, total, onlyFavorites, names, userState]
  )

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(handleObserver, options)
    const ref = loadingRef.current

    if (ref) {
      observer.observe(ref)
    }

    return (): void => {
      observer.unobserve(ref)
    }
  }, [handleObserver, loadingRef])

  useEffect(() => {
    localStorage.setItem('favCharacters', JSON.stringify(userState))
  }, [userState])

  return (
    <Modal title={title} onClose={onClose}>
      {hasComicsToFetch || comics.length > 0
        ? (comics || []).map(
            (comic, index): JSX.Element => {
              const img = getComicThumbnail(comic)
              const favorite = userState.favCharacters[characterId]?.comics.includes(
                comic.id.toString()
              )

              return (
                <ComicPreview
                  key={`comicPreview${index}`}
                  id={comic.id.toString()}
                  onClickFavorite={(): void => handleClickFavorite(comic.id, favorite)}
                  title={get(comic, 'title')}
                  img={img}
                  description={get(comic, 'description')}
                  favorite={favorite}
                />
              )
            }
          )
        : 'Character with no comics :('}
      <div ref={loadingRef}>{loading && <Spinner />}</div>
    </Modal>
  )
}
