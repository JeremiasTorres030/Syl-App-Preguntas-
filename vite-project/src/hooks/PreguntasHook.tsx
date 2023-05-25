import axios from 'axios'
import { useState, useEffect } from 'react'
import { Final, Mode, Pregunta, ServerResponsePregunta } from '../types/types'
import { useParams } from 'react-router-dom'

const UsePreguntasHook = (mode: Mode) => {
  const [cargando, setCargando] = useState<boolean>(true)
  const [timer, setTimer] = useState<number>()
  const [tiempo, setTiempo] = useState<number>(21)
  const [muted, setMuted] = useState<boolean>(false)
  const [ids, setIds] = useState<Array<number>>([])
  const [final, setFinal] = useState<Final>({
    correctOption: 5,
    msg: '',
    option: 5,
  })
  const [botones, setBotones] = useState<boolean>(false)
  const [vidas, setVidas] = useState<number>(3)
  const [contador, setContador] = useState<number>(0)
  const [preg, setPreg] = useState<Pregunta>({
    id: 0,
    encabezado: '',
    valores: [],
    respuesta: '',
  })
  const [finJuego, setFinJuego] = useState<boolean>(false)

  useEffect(() => {
    getPregunta()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (tiempo === 21) return
    if (tiempo === 0) {
      finDelTimer(preg)
      return
    }
    const t = setTimeout(() => {
      let tiempoCopy = tiempo
      setTiempo(--tiempoCopy)
    }, 1000)
    setTimer(t)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiempo])

  const { categoriaId } = useParams()

  const getPregunta = async (
    id?: number,
    reiniciar?: boolean
  ): Promise<void> => {
    try {
      const body = { ids, categoriaId }
      let contadorCopy = contador

      if (reiniciar) {
        body.ids = []
        contadorCopy = 0
      }

      if (id) {
        body.ids = ids.filter((i) => i !== id)
      }

      const res = await axios.post<ServerResponsePregunta>(
        `${import.meta.env.VITE_API_URL}${
          categoriaId ? 'categoria' : 'pregunta'
        }`,
        body
      )

      setIds(res.data.ids)
      res.data.pregunta.valores = shuffle(res.data.pregunta.valores.split(','))
      setTimeout(() => {
        siguientePregunta(res.data.pregunta, contadorCopy)
      }, 3000)
    } catch (error) {
      console.log('error')
    }
  }

  const siguientePregunta = (pregunta: Pregunta, contadorCopy: number) => {
    setContador(++contadorCopy)
    setFinal({ correctOption: 5, msg: '', option: 5 })
    setPreg(pregunta)
    setBotones(false)
    setCargando(false)
    setTiempo(20)
  }

  const finDelTimer = (preguntaT: Pregunta) => {
    const audio = new Audio('/src/assets/sounds/incorrecto.mp3')
    audio.volume = 0.2
    if (vidas > 1 && !muted) {
      audio.play()
    }

    const correctOption: number = preguntaT.valores.findIndex(
      (element: string) => element === preguntaT.respuesta
    )

    setFinal({ correctOption, msg: 'Se acabo el tiempo', option: 5 })
    if (mode === 'infinito') {
      getPregunta(preguntaT.id)
      return
    }

    let vidasCopia = vidas
    setVidas(--vidasCopia)

    if (vidas === 1) {
      finDelJuego()
      return
    }

    getPregunta(preguntaT.id)
  }

  const finDelJuego = () => {
    clearTimeout(timer)
    const audio = new Audio('/src/assets/sounds/gameover.mp3')
    audio.volume = 0.2
    if (!muted) {
      audio.play()
    }
    setFinJuego(true)
  }

  const correcto = (index: number) => {
    setFinal({ msg: 'Correcto', correctOption: 5, option: index })
    const audio = new Audio('/src/assets/sounds/correcto.mp3')
    audio.volume = 0.2
    if (!muted) {
      audio.play()
    }
    getPregunta(preg.id)
  }

  const shuffle = (array: Array<string>) => {
    let currentIndex = array.length,
      randomIndex

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  const incorrecto = (index: number) => {
    const audio = new Audio('/src/assets/sounds/incorrecto.mp3')
    audio.volume = 0.2
    if (vidas > 1 && !muted) {
      audio.play()
    }
    const correctOption: number = preg.valores.findIndex(
      (element: string) => element === preg.respuesta
    )

    if (mode === 'infinito') {
      setFinal({
        msg: `Incorrecto la respuesta es "${preg.respuesta}"`,
        correctOption,
        option: index,
      })
      getPregunta(preg.id)
      return
    }

    let vidasCopia = vidas
    setFinal({
      msg: `Incorrecto la respuesta es "${preg.respuesta}"`,
      correctOption,
      option: index,
    })
    setVidas(--vidasCopia)

    if (vidas === 1) {
      finDelJuego()
      return
    }

    getPregunta(preg.id)
  }

  const cambiarAudio = () => {
    setMuted(!muted)
  }

  const opcionElegida = (valor: string, index: number) => {
    clearTimeout(timer)
    setBotones(true)
    if (valor !== preg.respuesta) {
      incorrecto(index)
    } else {
      correcto(index)
    }
  }

  const reiniciar = () => {
    setCargando(true)
    setFinal({ correctOption: 5, msg: '', option: 5 })
    setPreg({
      encabezado: '',
      id: 0,
      respuesta: '',
      valores: [],
    })
    setVidas(3)
    setFinJuego(false)
    getPregunta(undefined, true)
  }

  return {
    finJuego,
    final,
    reiniciar,
    opcionElegida,
    preg,
    vidas,
    botones,
    contador,
    cargando,
    muted,
    cambiarAudio,
    tiempo,
  }
}

export default UsePreguntasHook
