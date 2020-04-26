import React, { useEffect, useState, useCallback, useRef, useContext } from 'react'
import { Spinner } from '../../components/Spinner'
import { Modal } from '../../components/Modal'
import { fetchWithLoading } from '../../utils'
import { ComicPreview } from '../../components/ComicPreview'
import { UserDispatchContext, UserStateContext } from '../../context/user'
import { MarvelService } from '../../services/marvelService'
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
  const [total, setTotal] = useState(null)
  const loadingRef = useRef(null)

  const handleClickFavorite = (id: string, favorite: boolean): void => {
    !userState.favCharacters[characterId] &&
      userDispatch({
        type: 'ADD_FAV_CHARACTER',
        payload: {
          id: characterId,
        },
      })

    userDispatch({
      type: !favorite ? 'ADD_FAV_COMIC' : 'REMOVE_FAV_COMIC',
      payload: {
        charId: characterId,
        id,
      },
    })
  }

  const handleObserver = useCallback(
    (entities) => {
      const getComics = async (): Promise<void> => {
        const offset = page * defaultComicsAmount
        const remainingComics = total - offset
        const limit = remainingComics < offset ? remainingComics : defaultComicsAmount

        const options = {
          orderBy: '-focDate',
          limit,
          offset,
        }

        const { comics: newComics, pagination } = await MarvelService.getComicsByCharacterId(
          characterId,
          options
        )

        if (!total) {
          setTotal(pagination.total)
        }

        if (pagination.count > 0) {
          setComics([...comics, ...newComics])

          if (pagination.total > offset + limit) {
            setPage(page + 1)
          } else {
            setHasComicsToFetch(false)
          }
        } else {
          setHasComicsToFetch(false)
        }
      }

      const getFavoritesComics = async (): Promise<void> => {
        const charId = characterId.toString()

        const comics = await Promise.all(
          userState.favCharacters[charId].comics.map(async (comicId) => {
            const { comic } = await MarvelService.getComicById(comicId)

            return comic
          })
        )

        setComics(comics)
        setHasComicsToFetch(false)
      }

      const getComicsByNames = async (): Promise<void> => {
        let comics: Comic[] = []

        const comicsByName = await Promise.all(
          names.map(async (name) => {
            const [title, issueNumber] = name.split('#')
            const { comics, pagination } = await MarvelService.getComicsByCharacterId(characterId, {
              title,
              issueNumber: issueNumber || 0,
            })

            if (pagination.count > 0) {
              return comics
            }

            return undefined
          })
        )

        comics = comics.concat(...comicsByName).filter((character) => character !== undefined)

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
        ? comics.map(
            (comic, index): JSX.Element => {
              const favorite = userState.favCharacters[characterId]?.comics.includes(
                comic.id.toString()
              )

              return (
                <ComicPreview
                  key={`comicPreview${index}`}
                  id={comic.id.toString()}
                  onClickFavorite={(): void => handleClickFavorite(comic.id.toString(), favorite)}
                  title={comic.title}
                  img={comic.thumbnail}
                  description={comic.description}
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
