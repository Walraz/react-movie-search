import api from './instance'

export const get = query => api.get('search/movie', {
  params: {
    query
  }
})