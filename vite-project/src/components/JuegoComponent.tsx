import { Link } from 'react-router-dom'
import { JuegoComponentProps } from '../types/types'

const JuegoComponent = ({
  preg,
  vidas,
  final,
  opcionElegida,
  mode,
  botones,
  contador,
  cargando,
  cambiarAudio,
  muted,
  tiempo,
}: JuegoComponentProps) => {
  const vidasIcon = ['❤️', '❤️', '❤️']

  return (
    <div className='flex items-center justify-center flex-col text-center gap-3'>
      <div className='flex gap-5 justify-center items-center'>
        <h1>Modo de juego {mode}</h1>
        <Link to={'/'}>Finalizar partida</Link>
        <button onClick={cambiarAudio}>
          {muted ? (
            <img src='/src/assets/icons/soundon.svg' />
          ) : (
            <img src='/src/assets/icons/soundoff.svg' />
          )}
        </button>
      </div>
      {cargando ? (
        <div>
          <div className='lds-dual-ring'></div>
          <h1>Cargando...</h1>
        </div>
      ) : (
        <>
          <h1>Pregunta numero: {contador} </h1>
          <h2>Tiempo: {tiempo}</h2>
          {mode !== 'infinito' ? (
            <div className='flex'>
              <p>Vidas: </p>
              {vidasIcon.slice(0, vidas).map((vida, index) => (
                <p key={index}>{vida}</p>
              ))}
            </div>
          ) : null}
          <div className='border rounded-md max-w-[390px] sm:min-w-[500px] sm:max-w-fit'>
            <h1 className='border rounded-md text-xl p-3'>{preg.encabezado}</h1>
            <em>{final.msg}</em>
            <div className='flex border justify-center items-center rounded-md p-3 gap-3'>
              <div className='grid grid-rows-2 grid-cols-1 gap-4 sm:grid-flow-col'>
                {preg.valores.map((valor: string, index: number) => {
                  return (
                    <button
                      key={index}
                      className={
                        'border rounded-md p-3 min-w-[250px] sm:min-w-[300px] ' +
                        (final.correctOption === 5 && final.option === index
                          ? 'bg-green-700'
                          : null) +
                        ' ' +
                        (final.correctOption === index && final.option !== index
                          ? 'bg-green-700'
                          : null) +
                        ' ' +
                        (final.correctOption !== 5 && final.option === index
                          ? 'bg-red-700'
                          : null)
                      }
                      disabled={botones}
                      onClick={() => {
                        opcionElegida(valor, index)
                      }}
                    >
                      {valor}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default JuegoComponent
