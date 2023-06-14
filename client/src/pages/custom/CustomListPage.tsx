import UsePreguntasCustomHook from '../../hooks/PreguntasCustomHook'
import { useEffect, useState } from 'react'
import { CustomPregs } from '../../types/types'
import { Link, useNavigate } from 'react-router-dom'
const CustomListPage = () => {
  const [customLists, setCustomLists] = useState<Array<CustomPregs>>([])
  const { getCustomLists, deleteListElement } = UsePreguntasCustomHook()

  useEffect(() => {
    const list = getCustomLists()
    setCustomLists(list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-center flex-col gap-3'>
      <h1 className='text-4xl font-semibold'>
        Lista de preguntas personalizadas
      </h1>
      <Link
        to={'/'}
        className='rounded-md p-2 text-lg text-center text-white font-bold bg-[#83a65b] cursor-pointer hover:underline'
      >
        Volver
      </Link>
      <Link
        to={'/custom-form'}
        className='rounded-md p-2 text-lg text-center text-white font-bold bg-[#be4fbb] cursor-pointer hover:underline'
      >
        Nueva lista +
      </Link>
      {customLists.length === 0 ? (
        <>
          <p className='text-lg'>
            Parece que no tienes ninguna lista personalizada...
          </p>
          <p className='text-lg'>
            Seleccione la opción de guardar en el formulario de creación.
          </p>
        </>
      ) : (
        <div className='flex gap-3 flex-wrap'>
          {customLists.map(({ id, nombre, data }) => {
            return (
              <div
                className='border-2 border-[#c59660] rounded-md p-2 hover:cursor-pointer hover:border-[#6d7ab4]'
                key={id}
                onClick={() => {
                  localStorage.setItem('customPreguntas', JSON.stringify(data))
                  navigate(`/custom/${id}`)
                }}
              >
                <p className='text-lg'>{nombre}</p>
                <p className='text-lg'>Preguntas : {data.preguntas.length}</p>
                <p className='text-lg'>
                  Vidas : {data.vidas === 0 ? 'desactivado' : data.vidas}
                </p>
                <p className='text-lg mb-1'>
                  Tiempo :
                  {data.tiempo === -33
                    ? ' desactivado'
                    : `${data.tiempo} segundos`}
                </p>
                <button
                  className='rounded-md p-2 text-sm text-center text-white font-bold bg-[#b04237] mr-2 cursor-pointer hover:underline'
                  onClick={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    event.stopPropagation()
                    deleteListElement(id)
                    setCustomLists(getCustomLists())
                  }}
                >
                  Eliminar
                </button>
                <Link
                  className='rounded-md p-2 text-sm text-center text-white font-bold bg-[#6d7ab4] cursor-pointer hover:underline'
                  to={`/custom-form/${id}`}
                  onClick={(
                    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                  ) => {
                    event.stopPropagation()
                  }}
                >
                  Editar
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CustomListPage
