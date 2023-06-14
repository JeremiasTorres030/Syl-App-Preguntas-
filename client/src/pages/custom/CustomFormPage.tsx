import { Form, Formik, Field } from 'formik'
import UsePreguntasCustomHook from '../../hooks/PreguntasCustomHook'
import * as Yup from 'yup'
import { FormPreguntaValues } from '../../types/types'
import { useState, useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const formPreguntaValues: FormPreguntaValues = {
  encabezado: '',
  valor1: '',
  valor2: '',
  valor3: '',
  valor4: '',
  valorCorrecto: '',
}

const preguntaValidationSchema = Yup.object().shape({
  encabezado: Yup.string().required('Ingrese un encabezado'),
  valor1: Yup.string().required('Ingrese un valor valido'),
  valor2: Yup.string().required('Ingrese un valor valido'),
  valor3: Yup.string().required('Ingrese un valor valido'),
  valor4: Yup.string().required('Ingrese un valor valido'),
  valorCorrecto: Yup.string().required('Seleccione la opción correcta'),
})

const CustomFormPage = () => {
  const {
    customPreguntas,
    crearPregunta,
    eliminarPregunta,
    finalizarLista,
    getCustomList,
    setPreguntas,
  } = UsePreguntasCustomHook()
  const [mostrarNombre, setMostrarNombre] = useState<boolean>(true)
  const [erroresCustom, setErroresCustom] = useState<{
    tiempo: string
    nombre: string
    cantidad: string
  }>({ tiempo: '', nombre: '', cantidad: '' })
  const [vidas, setVidas] = useState<Array<string>>(['❤️', '❤️', '❤️'])
  const [lista, setLista] = useState<boolean>(false)
  const tiempo = useRef<HTMLInputElement>(null)
  const guardar = useRef<HTMLInputElement>(null)
  const nombreList = useRef<HTMLInputElement>(null)
  const { listid } = useParams()
  useEffect(() => {
    if (listid) {
      const customList = getCustomList(Number(listid))
      if (customList !== undefined && tiempo.current && nombreList.current) {
        setPreguntas(customList.data.preguntas)
        setVidas(vidas.slice(0, customList.data.vidas))
        tiempo.current.value =
          customList.data.tiempo === -33
            ? '0'
            : customList.data.tiempo.toString()
        nombreList.current.value = customList.nombre
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-1'>
      <h1 className='text-4xl font-semibold mb-1'>Crear juego personalizado</h1>
      <Link
        to={'/'}
        className='rounded-md p-2 text-lg text-center text-white font-bold bg-[#83a65b] cursor-pointer hover:underline'
      >
        Volver
      </Link>
      <button
        className='rounded-md p-1 text-lg text-center text-white font-bold bg-[#be4fbb] cursor-pointer hover:underline my-1'
        onClick={() => {
          setLista(!lista)
        }}
      >
        {lista ? 'Ocultar lista de preguntas' : 'Mostrar lista de preguntas'}
      </button>
      {lista && customPreguntas.length >= 1 ? (
        <div className='flex flex-wrap justify-center flex-col border-[#6d7ab4] border-2  rounded-md p-1 mb-1 gap-2'>
          {customPreguntas.map((pregunta) => {
            return (
              <div
                className='border-2 border-[#be4fbb] rounded-md flex p-1 gap-1'
                key={pregunta.id}
              >
                <h1 className='text-lg'>{pregunta.encabezado}</h1>
                <button
                  className='text-lg ml-auto'
                  onClick={() => {
                    eliminarPregunta(pregunta.id)
                  }}
                >
                  X
                </button>
              </div>
            )
          })}
        </div>
      ) : null}
      <div className='flex items-center justify-center text-center gap-1 mb-2'>
        <div
          className={
            'flex m-auto border-2 border-[#6d7ab4] rounded-md p-1 ' +
            (erroresCustom.tiempo ? 'border-[#dc2626] text-red-600' : null)
          }
        >
          <label
            htmlFor='tiempo'
            className='text-lg'
          >
            Tiempo :
          </label>
          <input
            id='tiempo'
            ref={tiempo}
            type='number'
            className='bg-transparent w-14 text-center rounded-md text-lg outline-none'
            defaultValue={20}
            onChange={() => {
              const errorCustomCopy = { ...erroresCustom }
              if (
                tiempo.current?.value === '' ||
                Number(tiempo.current?.value) < 0
              ) {
                errorCustomCopy.tiempo = 'Ingrese un valor mayor o igual a 0'
                setErroresCustom(errorCustomCopy)
              } else {
                errorCustomCopy.tiempo = ''
                setErroresCustom(errorCustomCopy)
              }
            }}
          />
        </div>
        <div className='flex m-auto border-2 border-[#6d7ab4] rounded-md p-1'>
          <label className='text-lg'>
            Vidas :
            {vidas.slice(0, 3).map((vidas, index) => (
              <span key={index}> {vidas} </span>
            ))}{' '}
            {vidas.length > 3 || vidas.length === 0 ? vidas.length : null}
          </label>
          <button
            type='button'
            className='w-5 text-lg'
            onClick={() => {
              const vidasCopy = [...vidas]
              vidasCopy.push('❤️')
              setVidas(vidasCopy)
            }}
          >
            +
          </button>
          <button
            type='button'
            className='w-5 text-lg'
            onClick={() => {
              const vidasCopy = [...vidas]
              vidasCopy.pop()
              setVidas(vidasCopy)
            }}
          >
            -
          </button>
        </div>
      </div>
      <Formik
        validationSchema={preguntaValidationSchema}
        initialValues={formPreguntaValues}
        onSubmit={(values, actions) => {
          crearPregunta(values)
          actions.resetForm()
        }}
      >
        {({ errors, touched }) => (
          <Form className='flex items-center justify-center flex-col text-center gap-1'>
            <div className='flex justify-center items-center gap-2'>
              <h1 className='text-lg'>Guardar? </h1>
              <input
                className='appearance-none border-2 border-[#6d7ab4] w-4 h-4 rounded-lg checked:bg-[#6d7ab4]'
                type='checkbox'
                ref={guardar}
                defaultChecked={true}
                onChange={() => {
                  if (guardar.current) {
                    setMostrarNombre(guardar.current?.checked)
                  }
                }}
              />
              {mostrarNombre ? (
                <input
                  className={
                    'bg-transparent border-2 border-[#6d7ab4] rounded-md outline-none p-1 ' +
                    (erroresCustom.nombre
                      ? 'border-[#dc2626] placeholder:text-red-600'
                      : null)
                  }
                  type='text'
                  placeholder={
                    erroresCustom.nombre
                      ? erroresCustom.nombre
                      : 'Nombre de la lista'
                  }
                  ref={nombreList}
                  onChange={() => {
                    const errorCustomCopy = { ...erroresCustom }
                    if (nombreList.current?.value === '') {
                      errorCustomCopy.nombre = 'Ingrese un nombre valido'
                      setErroresCustom(errorCustomCopy)
                    } else {
                      errorCustomCopy.nombre = ''
                      setErroresCustom(errorCustomCopy)
                    }
                  }}
                />
              ) : null}
            </div>
            <p className='text-lg'>
              Coloque 0 en los campos de tiempo o vida para desactivarlos.
            </p>
            <p className='text-red-600 text-lg'>{erroresCustom.cantidad}</p>
            <div className='border-2 border-[#6d7ab4] rounded-md max-w-[390px] sm:min-w-[500px] sm:max-w-fit'>
              <Field
                name='encabezado'
                placeholder={
                  errors.encabezado && touched.encabezado
                    ? errors.encabezado
                    : `Ingrese el encabezado de la pregunta número ${
                        customPreguntas.length + 1
                      }`
                }
                className={
                  'rounded-md text-xl p-3 bg-transparent w-full text-center outline-none ' +
                  (errors.encabezado && touched.encabezado
                    ? 'border-[#dc2626] placeholder:text-red-600'
                    : null)
                }
              />
              <div className='flex border-2 border-[#6d7ab4] border-x-0 justify-center items-center p-3 gap-3'>
                <div className='grid grid-rows-2 grid-cols-1 gap-4 sm:grid-flow-col'>
                  <div className='flex items-center justify-center gap-1 flex-row-reverse sm:flex-row'>
                    <Field
                      type='radio'
                      name='valorCorrecto'
                      value='1'
                      className={
                        'appearance-none border-2 border-[#6d7ab4] w-4 h-4 rounded-lg checked:bg-[#6d7ab4] ' +
                        (errors.valorCorrecto && touched.valorCorrecto
                          ? 'border-[#dc2626]'
                          : null)
                      }
                    />
                    <Field
                      name='valor1'
                      placeholder={
                        errors.valor1 && touched.valor1
                          ? errors.valor1
                          : 'Ingrese el valor de la primera opción'
                      }
                      className={
                        'border-2 border-[#6d7ab4] rounded-md p-3 min-w-[250px] sm:min-w-[300px] bg-transparent outline-none ' +
                        (errors.valor1 && touched.valor1
                          ? 'border-[#dc2626] placeholder:text-red-600'
                          : null)
                      }
                    />
                  </div>
                  <div className='flex items-center justify-center gap-1 flex-row-reverse sm:flex-row'>
                    <Field
                      type='radio'
                      name='valorCorrecto'
                      value='2'
                      className={
                        'appearance-none border-2 border-[#6d7ab4] w-4 h-4 rounded-lg checked:bg-[#6d7ab4] ' +
                        (errors.valorCorrecto && touched.valorCorrecto
                          ? 'border-[#dc2626]'
                          : null)
                      }
                    />
                    <Field
                      name='valor2'
                      placeholder={
                        errors.valor2 && touched.valor2
                          ? errors.valor2
                          : 'Ingrese el valor de la segunda opción'
                      }
                      className={
                        'border-2 border-[#6d7ab4] rounded-md p-3 min-w-[250px] sm:min-w-[300px] bg-transparent outline-none ' +
                        (errors.valor2 && touched.valor2
                          ? 'border-[#dc2626] placeholder:text-red-600'
                          : null)
                      }
                    />
                  </div>
                  <div className='flex items-center justify-center gap-1'>
                    <Field
                      name='valor3'
                      placeholder={
                        errors.valor3 && touched.valor3
                          ? errors.valor3
                          : 'Ingrese el valor de la tercera opción'
                      }
                      className={
                        'border-2 border-[#6d7ab4] rounded-md p-3 min-w-[250px] sm:min-w-[300px] bg-transparent outline-none ' +
                        (errors.valor3 && touched.valor3
                          ? 'border-[#dc2626] placeholder:text-red-600'
                          : null)
                      }
                    />
                    <Field
                      type='radio'
                      name='valorCorrecto'
                      value='3'
                      className={
                        'appearance-none border-2 border-[#6d7ab4] w-4 h-4 rounded-lg checked:bg-[#6d7ab4] ' +
                        (errors.valorCorrecto && touched.valorCorrecto
                          ? 'border-[#dc2626]'
                          : null)
                      }
                    />
                  </div>
                  <div className='flex items-center justify-center gap-1'>
                    <Field
                      name='valor4'
                      placeholder={
                        errors.valor4 && touched.valor4
                          ? errors.valor4
                          : 'Ingrese el valor de la cuarta opción'
                      }
                      className={
                        'border-2 border-[#6d7ab4] rounded-md p-3 min-w-[250px] sm:min-w-[300px] bg-transparent outline-none ' +
                        (errors.valor4 && touched.valor4
                          ? 'border-[#dc2626] placeholder:text-red-600'
                          : null)
                      }
                    />
                    <Field
                      type='radio'
                      name='valorCorrecto'
                      value='4'
                      className={
                        'appearance-none border-2 border-[#6d7ab4] w-4 h-4 rounded-lg checked:bg-[#6d7ab4] ' +
                        (errors.valorCorrecto && touched.valorCorrecto
                          ? 'border-[#dc2626]'
                          : null)
                      }
                    />
                  </div>
                </div>
              </div>
              {errors.valorCorrecto && touched.valorCorrecto ? (
                <p className='text-lg text-red-600'>{errors.valorCorrecto}</p>
              ) : null}
              <button
                type='submit'
                className='text-lg font-bold bg-[#be4fbb] text-white p-1 rounded-md my-1'
              >
                Añadir +
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <button
        className='rounded-md p-1 text-lg text-center text-white font-bold bg-[#c59660] cursor-pointer hover:underline mt-1'
        onClick={() => {
          const errorCustomCopy = { ...erroresCustom }
          if (customPreguntas.length === 0) {
            errorCustomCopy.cantidad = 'Ingrese al menos una pregunta'
            setErroresCustom(errorCustomCopy)
          }

          if (guardar.current?.checked && nombreList.current?.value === '') {
            errorCustomCopy.nombre = 'Ingrese un nombre valido'
            setErroresCustom(errorCustomCopy)
          }

          if (
            customPreguntas.length === 0 ||
            (guardar.current?.checked && nombreList.current?.value === '')
          )
            return

          finalizarLista(
            vidas.length,
            Number(tiempo.current?.value) ?? 20,
            guardar.current?.checked ?? true,
            nombreList.current?.value ?? '',
            listid ? Number(listid) : undefined
          )
        }}
      >
        Finalizar
      </button>
    </div>
  )
}

export default CustomFormPage
