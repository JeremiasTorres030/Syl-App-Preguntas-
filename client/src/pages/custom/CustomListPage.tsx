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
    <div className='flex items-center justify-center flex-col gap-5'>
      <h1 className='text-4xl'>Lista de preguntas personalizadas</h1>
      <Link
        to={'/'}
        className='border rounded-md p-1'
      >
        Volver
      </Link>
      <Link
        to={'/custom-form'}
        className='border rounded-md p-2'
      >
        Nueva lista
      </Link>
      {customLists.length === 0 ? (
        <>
          <h1>Parece que no tienes ninguna lista personalizada...</h1>
          <h1>Seleccione la opción de guardar en el formulario de creación.</h1>
        </>
      ) : (
        <div className='flex gap-3 flex-wrap'>
          {customLists.map(({ id, nombre, data }) => {
            return (
              <div
                className='border rounded-md p-2 hover:cursor-pointer'
                key={id}
                onClick={() => {
                  localStorage.setItem('customPreguntas', JSON.stringify(data))
                  navigate('/custom')
                }}
              >
                <p>{nombre}</p>
                <p>Preguntas : {data.preguntas.length}</p>
                <p>Vidas : {data.vidas}</p>
                <p>Tiempo : {data.tiempo} segundos</p>
                <button
                  className='border rounded-md p-2 mt-2 mr-2 text-sm'
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
                  className='border rounded-md p-2 mt-2 text-sm'
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
