import { useEffect, useState } from 'react'
import { Sub } from '../types' // Importación de interface Sub
import { getAllSubs } from '../services/getAllSubs'

// interface de estado de la app
interface AppState {
    // los subs es de tipo array de Sub
    subs: Array<Sub>
    // prueba que no se utiliza
    newSubsNumber: number
  }

export const useAllSubs = () => {
  // const [subs, setSubs] = useState<Sub[]>([]) OTRA OPCIÓN
  const [subs, setSubs] = useState<AppState['subs']>([])
  // const [newSubsNumber, setNewSubsNumber] = useState<AppState['newSubsNumber']>(0)

  // función que recibe un nuevo sub y no retorna nada
  const handleNewSub = (newSub: Sub): void => {
    // seteamos el nuevo sub + lo que ya existía
    setSubs((subs) => [...subs, newSub])
  }

  useEffect(() => {
    // ejecutamos la función que devuelve una promesa con el json parseado
    getAllSubs()
      .then(setSubs)
  }, [])

  return {
    subs,
    handleNewSub
  }
}
