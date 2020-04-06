import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get } from 'lodash'
import { ComicSummary } from '../../components/ComicSummary'
import axios from '../../services/api'
import { fetchWithLoading, getComicThumbnail } from '../../utils'
import { Spinner } from '../../components/Spinner/Spinner.styles'

export const ComicPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [comic, setComic] = useState({} as any)
  const { id } = useParams()

  useEffect(() => {
    const getComic = async (): Promise<void> => {
      const { data: res } = await axios.get(`/comics/${id}`)
      const [result] = get(res, 'data.results')

      setComic(result)
    }

    fetchWithLoading(setLoading, getComic)
  }, [id])

  return loading ? (
    <Spinner />
  ) : (
    <ComicSummary
      title={comic.title}
      imgUrl={getComicThumbnail(comic)}
      description={comic.description}
    />
  )
}
