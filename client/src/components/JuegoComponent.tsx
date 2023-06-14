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
              className='rounded-md p-1 text-lg text-center text-white font-bold bg-[#be4fbb] cursor-pointer hover:underline'
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
              <h1 className='text-lg'>Cargando...</h1>
            </div>
          ) : (
            <>
              <h1>Pregunta número: {contador} </h1>
              {mode === 'custom' && tiempo === -33 ? null : (
                <h2 className='text-lg'>Tiempo: {tiempo}</h2>
              )}
              {mode === 'infinito' || vidas === 0 ? null : (
                <div className='flex'>
                  <p className='text-lg'>Vidas: </p>
                  {vidasIcon.slice(0, vidas).map((vida, index) => (
                    <p key={index}>{vida}</p>
                  ))}
                  {vidas > 3 ? vidas : null}
                </div>
              )}
              <div className='border-2 border-[#6d7ab4] rounded-md max-w-[390px] sm:min-w-[500px] sm:max-w-fit'>
                <h1 className='text-xl p-3'>{preg.encabezado}</h1>
                {final.msg ? (
                  <em className='text-lg border-2 border-[#6d7ab4] border-x-0 border-b-0 block'>
                    {final.msg}
                  </em>
                ) : null}
                <div className='flex border-2 border-[#6d7ab4] border-x-0 justify-center items-center border-b-0 p-3 gap-3'>
                  <div className='grid grid-rows-2 grid-cols-1 gap-4 sm:grid-flow-col'>
                    {preg.valores.map((valor: string, index: number) => {
                      return (
                        <button
                          key={index}
                          className={
                            'border-2 border-[#6d7ab4] rounded-md p-3 min-w-[250px] text-lg sm:min-w-[300px] ' +
                            (final.correctOption === 5 && final.option === index
                              ? 'bg-[#83a65b] font-bold text-white'
                              : null) +
                            ' ' +
                            (final.correctOption === index &&
                            final.option !== index
                              ? 'bg-[#83a65b] font-bold text-white'
                              : null) +
                            ' ' +
                            (final.correctOption !== 5 && final.option === index
                              ? 'bg-red-700 font-bold text-white'
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
