import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
})

instance.interceptors.request.use((config) => {
  config.params = {
    ts: '1582494237068',
    apikey: 'c5b43325770b998240e0206f31482dcc',
    hash: '9f076a5a788e6f7f89546593a67a1b90',
    ...config.params,
  }
  return config
})

export default instance
