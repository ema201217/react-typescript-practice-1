import React, { useState } from 'react'
import { Sub } from '../types' // Importación de interface Sub
import { useNewSubForm } from '../hooks/useNewSubForm'

// interface que corresponte al estado del formulario
interface FormState {
  inputValues: Sub
}

// interface que corresponde a las props que recibe el componente Form
interface FormProps {
  onNewSub: (newSub: Sub) => void
}

// estado inicial del formulario
const INITIAL_STATE = {
  nick: '',
  subMonths: 0,
  avatar: '',
  description: ''
}

// el componente Form recibe desde el componente App la función con tipado FormProps declarado en la interface, para agregar un nuevo Sub al estado
export const Form = ({ onNewSub }: FormProps) => {
  // el inputValues es de tipo FormState con la configuración interface de inputValues
  const [inputValue, setInputValues] = useState<FormState['inputValues']>(INITIAL_STATE) // no hook
  // se destructura un array desde el hook creado (useNewSubForm)
  const { formState, clearForm, dispatchHandleChange } = useNewSubForm() // hook

  // creamos el manejador de envio de formulario que recibe el evento con el tipado correspondiente
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    // seteamos el nuevo sub + lo que ya existía en el estado
    onNewSub(inputValue)
    // ejecutamos el manejador del reseteo del formulario
    handleClear()
  }

  const handleChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target
    dispatchHandleChange(name, value)
    setInputValues({
      ...formState,
      [target.name]: target.value
    })
  }

  const handleClear = () => {
    // disparamos el tipo de acción configurado en el reducer
    clearForm()
    // reseteamos el estado del componente "inputValues"
    setInputValues(INITIAL_STATE)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          value={inputValue.nick}
          name="nick"
          placeholder="nick"
        />
        <input
          onChange={handleChange}
          type="text"
          value={inputValue.subMonths}
          name="subMonths"
          placeholder="subMonths"
        />
        <input
          onChange={handleChange}
          type="text"
          value={inputValue.avatar}
          name="avatar"
          placeholder="avatar"
        />
        <textarea
          onChange={handleChange}
          value={inputValue.description}
          name="description"
          placeholder="description"
        ></textarea>
        <button onClick={handleClear} type="button">
          Clear the form
        </button>
        <button type="submit">Save new sub!</button>
      </form>
    </div>
  )
}
