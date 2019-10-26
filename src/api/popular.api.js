import api from './instance'

export const get = () => api.get('movie/popular')