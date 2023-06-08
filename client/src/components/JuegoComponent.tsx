import { Link } from 'react-router-dom'
import { JuegoComponentProps } from '../types/types'
import ErrorPage from '../pages/error/ErrorPage'
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
  error,
  startTimer,
}: JuegoComponentProps) => {
  const vidasIcon = ['❤️', '❤️', '❤️']

  return (
    <>
      {error ? (
        <ErrorPage message='Parece que la respuesta no ha podido cargar vuelva a intentarlo!' />
      ) : (
        <div className='flex items-center justify-center flex-col text-center gap-3'>
          <div className='flex gap-5 justify-center items-center'>
            <h1>Modo de juego {mode}</h1>
            <Link
              to={'/'}
              className='border rounded-md p-1
            '
            >
              Finalizar partida
            </Link>
            <button onClick={cambiarAudio}>
              {muted ? (
                <img src='/icons/soundon.svg' />
              ) : (
                <img src='/icons/soundoff.svg' />
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
              <h1>Pregunta número: {contador} </h1>
              {tiempo === 0 && mode === 'custom' && startTimer ? null : (
                <h2>Tiempo: {tiempo}</h2>
              )}
              {mode === 'infinito' || vidas === 0 ? null : (
                <div className='flex'>
                  <p>Vidas: </p>
                  {vidasIcon.slice(0, vidas).map((vida, index) => (
                    <p key={index}>{vida}</p>
                  ))}
                  {vidas > 3 ? vidas : null}
                </div>
              )}
              <div className='border rounded-md max-w-[390px] sm:min-w-[500px] sm:max-w-fit'>
                <h1 className='border rounded-md text-xl p-3'>
                  {preg.encabezado}
                </h1>
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
                            (final.correctOption === index &&
                            final.option !== index
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
      )}
    </>
  )
}

export default JuegoComponent
