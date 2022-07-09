import { useRef } from 'react'
import './App.css'
import { Form } from './components/Form'
import { List } from './components/List'
import { useAllSubs } from './hooks/useAllSubs'

/* const INITIAL_STATE = [
  {
    nick: 'Dapelu',
    subMonths: 3,
    avatar: 'https://i.pravatar.cc/150?u=dapelu',
    description: 'Dapelu hace de moderador a veces'
  },
  {
    nick: 'sergio_serrano',
    subMonths: 7,
    avatar: 'https://i.pravatar.cc/150?u=sergio_serrano'
  }
] */

export const App = () => {
  const divRef = useRef<HTMLDivElement>(null)
  const { subs, handleNewSub } = useAllSubs()

  return (
    <div ref={divRef} className="app-container">
      <h1>PRACTICA CON REACT TSX</h1>
      <List subs={subs}/> {/* Enviamos como prop los subs */}
      <Form onNewSub={handleNewSub} /> {/* Enviamos como prop el manejador para agregar nuevo sub */}
    </div>
  )
}
