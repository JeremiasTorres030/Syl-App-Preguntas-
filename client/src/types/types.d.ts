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

export type Mode = 'normal' | 'infinito' | 'categoria' | 'custom'

export interface ErrorPageProps {
  message: string
}

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
  error: boolean
}

export interface FinDelJuegoProps {
  reiniciar: () => void
  victoria: boolean
  continuar: () => void
}

export interface FormPreguntaValues {
  encabezado: string
  valorCorrecto: string
  valor1: string
  valor2: string
  valor3: string
  valor4: string
}

export interface CustomPregs {
  id: number
  nombre: string
  data: {
    preguntas: Array<Pregunta>
    vidas: number
    tiempo: number
  }
}
