import axios from 'axios'
import { useState, useEffect } from 'react'
import { Final, Mode, Pregunta, ServerResponsePregunta } from '../types/types'
import { useParams } from 'react-router-dom'
import confetti from 'canvas-confetti'
import UsePreguntasCustomHook from './PreguntasCustomHook'

const UsePreguntasHook = (mode: Mode) => {
  const [startTimer, setStartTimer] = useState<boolean>(false)
  const [cargando, setCargando] = useState<boolean>(true)
  const [timer, setTimer] = useState<number>()
  const [victoria, setVictoria] = useState<boolean>(false)
  const [tiempo, setTiempo] = useState<number>(20)
  const [muted, setMuted] = useState<boolean>(false)
  const [ids, setIds] = useState<Array<number>>([])
  const [racha, setRacha] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)
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
  const { getPreguntaCustom } = UsePreguntasCustomHook()

  const MENSAJES_RACHA = [
    '¡Increíble!',
    '¡Impresionante!',
    '¡Excelente!',
    '¡Fenomenal!',
    '¡Bravo!',
  ]

  useEffect(() => {
    if (mode === 'custom') {
      const customVidas = getCPregunta()
      setVidas(customVidas)
    } else {
      getPregunta()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!startTimer) return
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
  }, [tiempo, startTimer])

  const { categoriaId } = useParams()

  const getCPregunta = (reiniciar?: boolean): number => {
    setStartTimer(false)
    let contadorCopy = contador
    if (reiniciar) {
      contadorCopy = 0
    }
    const customPreg = getPreguntaCustom(reiniciar)

    const fakeIds: Array<number> = []
    fakeIds.length = customPreg.cantidad
    setIds(fakeIds)

    customPreg.pregunta.valores = shuffle(customPreg.pregunta.valores)
    setTimeout(() => {
      siguientePregunta(customPreg.pregunta, contadorCopy, customPreg.tiempo)
    }, 3000)

    return customPreg.vidas
  }

  const getPregunta = async (
    id?: number,
    reiniciar?: boolean
  ): Promise<void> => {
    try {
      setStartTimer(false)
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
      setCargando(false)
      setError(true)
    }
  }

  const siguientePregunta = (
    pregunta: Pregunta,
    contadorCopy: number,
    cTiempo = 20
  ) => {
    setContador(++contadorCopy)
    setFinal({ correctOption: 5, msg: '', option: 5 })
    setPreg(pregunta)
    setBotones(false)
    setCargando(false)
    setTiempo(cTiempo)
    if (cTiempo !== 0) {
      setStartTimer(true)
    }
  }

  const finDelTimer = (preguntaT: Pregunta) => {
    const audio = new Audio('/sounds/incorrecto.mp3')
    audio.volume = 0.2
    if (vidas > 1 && !muted && ids.length > 1) {
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

    if (mode === 'custom' && vidas === 0) {
      getCPregunta()
      return
    }

    let vidasCopia = vidas
    setVidas(--vidasCopia)

    if (vidas === 1) {
      finDelJuego()
      return
    }

    if (ids.length === 1) {
      victoriaF()
      return
    }

    if (mode === 'custom') {
      getCPregunta()
      return
    }
    getPregunta(preguntaT.id)
  }

  const finDelJuego = () => {
    clearTimeout(timer)
    const audio = new Audio('/sounds/gameover.mp3')
    audio.volume = 0.2
    if (!muted) {
      audio.play()
    }
    setFinJuego(true)
  }

  const mensajeRacha = (rachaN: number): string => {
    const numeroRandom = Math.floor(Math.random() * MENSAJES_RACHA.length)
    const mensaje = `${MENSAJES_RACHA[numeroRandom]} racha de ${rachaN} respuestas.`
    confetti()
    return mensaje
  }

  const correcto = (index: number) => {
    const audio = new Audio('/sounds/correcto.mp3')
    audio.volume = 0.2

    let mensaje = ''

    let rachaCopy = racha
    setRacha(++rachaCopy)

    if (rachaCopy % 5 === 0) {
      const mRacha = mensajeRacha(rachaCopy)
      mensaje = mRacha
    } else {
      mensaje = 'Correcto'
    }

    setFinal({ msg: mensaje, correctOption: 5, option: index })

    if (ids.length === 1) {
      victoriaF()
      return
    }

    if (!muted && ids.length > 1) {
      audio.play()
    }

    if (mode === 'custom') {
      getCPregunta()
      return
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
    setRacha(0)
    const audio = new Audio('/sounds/incorrecto.mp3')
    audio.volume = 0.2
    if (vidas > 1 && !muted) {
      audio.play()
    }
    const correctOption: number = preg.valores.findIndex(
      (element: string) => element === preg.respuesta
    )

    if (ids.length === 1) {
      victoriaF()
      return
    }

    if (mode === 'custom' && vidas === 0) {
      setFinal({
        msg: `Incorrecto la respuesta es "${preg.respuesta}"`,
        correctOption,
        option: index,
      })
      getCPregunta()
      return
    }

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

    if (mode === 'custom') {
      getCPregunta()
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

  const victoriaF = () => {
    const audio = new Audio('/sounds/victoria.mp3')
    audio.volume = 0.2
    if (!muted) {
      audio.play()
    }
    setVictoria(true)
    setIds([])
  }

  const continuar = () => {
    setVictoria(false)
    if (mode === 'custom') {
      getCPregunta()
      return
    }
    getPregunta()
  }

  const reiniciar = () => {
    setCargando(true)
    setVictoria(false)
    setRacha(0)
    setFinal({ correctOption: 5, msg: '', option: 5 })
    setPreg({
      encabezado: '',
      id: 0,
      respuesta: '',
      valores: [],
    })
    setVidas(3)
    setFinJuego(false)
    if (mode === 'custom') {
      const customVidas = getCPregunta(true)
      setVidas(customVidas)
      return
    }
    getPregunta(undefined, true)
    return
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
    error,
    victoria,
    continuar,
    startTimer,
  }
}

export default UsePreguntasHook
