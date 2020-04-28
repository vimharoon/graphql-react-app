import { useState, useEffect } from 'react'

const useFetchApi = (url, options) => {
  const [apiRes, setApiRes] = useState({ respData: [] })
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url, options)
      const json = await res.json()
      return json
    }

    fetchData()
      .then((resp) => {
        setApiRes({ respData: resp.data.events })
      })
      .catch((error) => {
        setError(error)
      })
  }, [])
  return { apiRes, error }
}

export default useFetchApi
