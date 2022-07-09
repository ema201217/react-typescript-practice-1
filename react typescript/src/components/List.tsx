import { ReactElement } from 'react'
import { Sub } from '../types' // Importación de interface Sub

interface Props {
//   children: JSX.Element,   // formas de controlar el children en un componente
//   children: JSX.Element[],
//   children: string,
//   children: number,
//   children: (name : string) => React.ReactNode,
  subs: Array<Sub>
}

// const List: React.FunctionComponent<Props> = ({ subs }: Props) => (  List: React.FunctionComponent<Props>  ESTO HACE QUE EL COMPONENTE ACEPTE CHILDREN

// el subs destructurado recibido desde el componente App es de tipo Props (interfaces validas de argumento)
export const List = ({ subs }: Props) => {
  // función que renderiza la lista para darle un tipado de tipo ReactElement
  const renderList = (): ReactElement[] => {
    // mapeamos las subs
    return subs?.map((sub) => (
        <li key={sub.nick}>
          <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
          <h4>
            {sub.nick} (<small>{sub.subMonths}</small>)
          </h4>
          {/* description recibe adelante el carácter '?' porque puede no estar esa propiedad al momento que se mapea el sub */}
          <p>{sub.description?.substring(0, 100)}</p>
        </li>
    ))
  }

  return (
    <ul>
        {renderList()} {/* Ejecutamos la función que renderiza la lista */}
    </ul>
  )
}
