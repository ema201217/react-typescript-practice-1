import { useCallback, useReducer } from 'react'
import { Sub } from '../types' // Importación de interface Sub

// estado inicial del formulario
const INITIAL_STATE = {
  nick: '',
  subMonths: 0,
  avatar: '',
  description: ''
}

// interface para el tipo de estado del formulario
interface FormState {
    inputValues: Sub
}

// interface para el tipado del Action "change value"
interface FormChangeReducerAction {
    type: 'change_value'
    payload: {
      inputName: string
      inputValue: string
    }
}

// interface para el tipado del Action "clear"
interface FormClearReducerAction {
  type: 'clear'
}

// creamos una funcion que recibe el estado y luego un objeto con el nombre acción
const formReducer = (
  // el estado es de tipo FormState configurado en la interface
  state: FormState['inputValues'],
  // y el action es de tipo "FormChangeReducerAction" o "FormClearReducerAction" configurado en las interfaces
  action: FormChangeReducerAction | FormClearReducerAction
) => {
  switch (action.type) {
    case 'change_value': {
      const { inputName, inputValue } = action.payload // como payload al momento que se utiliza el reducer debemos recibir un objeto con las propiedades destructuradas
      return { // luego el estado recibirá el valor de los que ya tengamos como estado y los nuevos seteos a traves del evento en el que se ejecute el dispatch
        ...state,
        [inputName]: inputValue
      }
    }

    case 'clear':
      return INITIAL_STATE // el estado sera seteado por el estado inicial de dicha constante

    default:
      return state
  }
}

// exportamos una función que ejecuta el hook nativo de react "useReducer" pasandole como primer parámetro el reducer creado "formReducer" y como segundo parámetro una constante que es el estado inicial del componente form
export const useNewSubForm = () => {
  const [inputValues, dispatch] = useReducer(formReducer, INITIAL_STATE)
  const clearForm = useCallback(() => dispatch({ type: 'clear' }), [])
  const dispatchHandleChange = (name: string, value: string) => dispatch({
    type: 'change_value',
    payload: {
      inputName: name,
      inputValue: value
    }
  })
  return {
    formState: inputValues,
    clearForm,
    dispatchHandleChange
  }
}
