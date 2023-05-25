import UsePreguntasHook from '../../hooks/PreguntasHook'
import { Mode } from '../../types/types'
import JuegoComponent from '../../components/JuegoComponent'
import FinDelJuegoComponent from '../../components/FinDelJuegoComponent'

interface GamePageProps {
  mode: Mode
}

const GamePage = ({ mode }: GamePageProps) => {
  const {
    botones,
    finJuego,
    final,
    opcionElegida,
    preg,
    reiniciar,
    vidas,
    contador,
    cargando,
    cambiarAudio,
    muted,
    tiempo,
  } = UsePreguntasHook(mode)

  return (
    <>
      {finJuego ? (
        <FinDelJuegoComponent reiniciar={reiniciar} />
      ) : (
        <JuegoComponent
          final={final}
          opcionElegida={opcionElegida}
          preg={preg}
          vidas={vidas}
          mode={mode}
          botones={botones}
          contador={contador}
          cargando={cargando}
          cambiarAudio={cambiarAudio}
          muted={muted}
          tiempo={tiempo}
        />
      )}
    </>
  )
}

export default GamePage
