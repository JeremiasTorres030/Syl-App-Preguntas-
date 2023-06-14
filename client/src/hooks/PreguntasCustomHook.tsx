import { useEffect, useState } from 'react'
import { FormPreguntaValues, Pregunta, CustomPregs } from '../types/types'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

type DiccionarioValores = '1' | '2' | '3' | '4'

const UsePreguntasCustomHook = () => {
  const [customPreguntas, setPreguntas] = useState<Array<Pregunta>>([])
  const [vidas, setVidas] = useState<number>(0)
  const [tiempo, setTiempo] = useState<number>(0)
  const navigator = useNavigate()
  const { customid } = useParams()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.split('/')[1] === 'custom') {
      if (customid === 'sin-guardar') {
        const preguntasL = localStorage.getItem('customPreguntas')
        if (preguntasL !== null) {
          const parsePreguntasL: {
            preguntas: Array<Pregunta>
          } = JSON.parse(preguntasL)
          if (parsePreguntasL.preguntas.length === 0) {
            navigator('/custom-list')
          }
        }
        return
      }

      if (customid) {
        const lista = getCustomList(Number(customid))
        if (lista) {
          localStorage.setItem('customPreguntas', JSON.stringify(lista?.data))
        } else {
          navigator('/custom-list')
        }
      }
    }
  }, [])

  const crearPregunta = ({
    encabezado,
    valor1,
    valor2,
    valor3,
    valor4,
    valorCorrecto,
  }: FormPreguntaValues) => {
    encabezado = encabezado.trim()
    valor1 = valor1.trim()
    valor2 = valor2.trim()
    valor3 = valor3.trim()
    valor4 = valor4.trim()
    valorCorrecto = valorCorrecto.trim()

    const diccionarioValores = {
      '1': valor1,
      '2': valor2,
      '3': valor3,
      '4': valor4,
    }
    const pregunta: Pregunta = {
      encabezado: encabezado,
      id: customPreguntas.length,
      respuesta: diccionarioValores[valorCorrecto as DiccionarioValores],
      valores: [valor1, valor2, valor3, valor4],
    }
    const preguntas = [...customPreguntas, pregunta]
    setPreguntas(preguntas)
  }

  const eliminarPregunta = (id: number) => {
    const preguntasCopy = [...customPreguntas]
    setPreguntas(
      preguntasCopy.filter((pregunta) => {
        return pregunta.id !== id
      })
    )
  }

  const getCustomLists = (): Array<CustomPregs> => {
    const customListsLocal = localStorage.getItem('customList')
    if (customListsLocal !== null) {
      const customList: Array<CustomPregs> = JSON.parse(customListsLocal)
      return customList
    }

    return []
  }

  const getPreguntaCustom = (
    reiniciar?: boolean,
    continuar?: boolean
  ): {
    pregunta: Pregunta
    tiempo: number
    vidas: number
    cantidad: number
  } => {
    if (reiniciar || continuar) {
      localStorage.setItem(
        'customPreguntas',
        JSON.stringify({ preguntas: customPreguntas, tiempo, vidas })
      )
    }
    const customLocalPreguntas = localStorage.getItem('customPreguntas')
    if (customLocalPreguntas !== null) {
      const custom: {
        preguntas: Array<Pregunta>
        vidas: number
        tiempo: number
      } = JSON.parse(customLocalPreguntas)
      if (customPreguntas.length === 0) {
        setPreguntas(custom.preguntas)
        setVidas(custom.vidas)
        setTiempo(custom.tiempo)
      }
      const valorInicial = custom.preguntas.length
      const valorRandom = Math.floor(Math.random() * valorInicial)
      const pregunta = custom.preguntas[valorRandom]
      localStorage.setItem(
        'customPreguntas',
        JSON.stringify({
          preguntas: custom.preguntas.filter((p) => {
            return p.id !== pregunta.id
          }),
          vidas: custom.vidas,
          tiempo: custom.tiempo,
        })
      )
      return {
        pregunta,
        tiempo: custom.tiempo,
        vidas: custom.vidas,
        cantidad: custom.preguntas.length,
      }
    }

    return {
      pregunta: { encabezado: '', id: 0, respuesta: '', valores: '' },
      tiempo: 0,
      vidas: 0,
      cantidad: 0,
    }
  }

  const finalizarLista = (
    vidas: number,
    tiempo: number,
    guardar: boolean,
    nombreLista: string,
    id?: number
  ) => {
    const custom = {
      preguntas: customPreguntas,
      vidas,
      tiempo: tiempo === 0 ? -33 : tiempo,
    }

    if (customPreguntas.length !== 0) {
      localStorage.removeItem('customPreguntas')
    }
    if (guardar) {
      const customList = getCustomLists()
      if (id !== undefined) {
        const existList = customList.findIndex((element) => element.id === id)
        customList[existList].nombre = nombreLista
        customList[existList].data = custom
      } else {
        customList.push({
          id: customList.length,
          nombre: nombreLista,
          data: custom,
        })
      }
      localStorage.setItem('customList', JSON.stringify(customList))
    }
    localStorage.setItem('customPreguntas', JSON.stringify(custom))

    if (!guardar) {
      navigator(`/custom/sin-guardar`)
      return
    }

    if (id !== undefined) {
      navigator(`/custom/${id}`)
      return
    }

    if (guardar && id === undefined) {
      navigator(`/custom/${getCustomLists().length - 1}`)
      return
    }
  }

  const deleteListElement = (id: number) => {
    const list = getCustomLists()
    const modList = list.filter((element) => {
      return element.id !== id
    })
    localStorage.setItem('customList', JSON.stringify(modList))
  }

  const getCustomList = (id: number): CustomPregs | undefined => {
    const lists = getCustomLists()
    const list = lists.find((element) => element.id === id)
    return list
  }

  return {
    deleteListElement,
    customPreguntas,
    setPreguntas,
    crearPregunta,
    eliminarPregunta,
    getPreguntaCustom,
    finalizarLista,
    getCustomLists,
    getCustomList,
  }
}

export default UsePreguntasCustomHook
