import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ComicSummary } from '../../components/ComicSummary'
import { fetchWithLoading } from '../../utils'
import { Spinner } from '../../components/Spinner/Spinner.styles'
import { MarvelService } from '../../services/marvelService'
import { Comic } from '../../models/Comic'

export const ComicPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [comic, setComic] = useState({} as Comic)
  const { id } = useParams()

  useEffect(() => {
    const getComic = async (): Promise<void> => {
      const { comic } = await MarvelService.getComicById(id)

      setComic(comic)
    }

    fetchWithLoading(setLoading, getComic)
  }, [id])

  return loading ? (
    <Spinner />
  ) : (
    <ComicSummary
      title={comic.title}
      imgUrl={comic.thumbnail}
      description={comic.description}
      data={comic.data}
    />
  )
}
