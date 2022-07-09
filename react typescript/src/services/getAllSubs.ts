import axios from 'axios'
import { Sub, SubResponseFromApi } from '../types'
/*   const fetchSubs = ():Promise<SubResponseFromApi> => {
      return fetch('http://localhost:5000/subs').then(res => res.json())
    } */
const fetchSubs = () => {
  return axios
    .get<SubResponseFromApi>('http://localhost:5000/subs')
    .then(response => response.data)
}

// se realiza el mapeo de los subs que vienen del servidor
const mapFromApiToSubs = (apiResponse: SubResponseFromApi): Array<Sub> => {
  return apiResponse.map(subFromApi => {
    const {
      nick,
      months: subMonths,
      profileUrl: avatar,
      description
    } = subFromApi

    return {
      nick,
      subMonths,
      avatar,
      description
    }
  })
}

export const getAllSubs = () => {
  return fetchSubs()
    .then(mapFromApiToSubs)
}
