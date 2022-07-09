// interface de como se recibe la información Sub desde el formulario y desde el estado inicial
export interface Sub {
    nick: string
    avatar: string
    subMonths: number
    description?: string
    link?:string
}

// creamos el tipo de dato que se obtiene desde el servidor
export type SubResponseFromApi = Array<{
    nick: string
    months: number
    profileUrl: string
    description: string
    link: string
}>
