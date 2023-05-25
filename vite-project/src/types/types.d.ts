export interface Pregunta {
  id: number
  encabezado: string
  valores: any
  respuesta: string
}

export interface Categoria {
  id: number
  nombre: string
}

export interface ServerResponsePregunta {
  ok: boolean
  pregunta: Pregunta
  ids: Array<number>
}

export interface ServerResponseCategoria {
  ok: boolean
  categorias: Array<Categoria>
}

export interface Final {
  msg: string
  correctOption: number
  option: number
}

export type Mode = 'normal' | 'infinito' | 'categoria'

export interface JuegoComponentProps {
  preg: Pregunta
  vidas: number
  final: Final
  mode: Mode
  opcionElegida: (valor: string, index: number) => void
  botones: boolean
  contador: number
  cargando: boolean
  muted: boolean
  cambiarAudio: () => void
  tiempo: number
}
