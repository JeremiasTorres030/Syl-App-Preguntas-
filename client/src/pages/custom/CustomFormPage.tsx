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
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      const customList = getCustomList(Number(id))
      if (customList !== undefined && tiempo.current && nombreList.current) {
        setPreguntas(customList.data.preguntas)
        setVidas(vidas.slice(0, customList.data.vidas))
        tiempo.current.value = customList.data.tiempo.toString()
        nombreList.current.value = customList.nombre
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-1'>
      <h1 className='text-4xl mb-1 text-center'>Crear juego personalizado</h1>
      <Link
        to={'/'}
        className='border rounded-md my-1 p-1'
      >
        Volver
      </Link>
      <button
        className='border rounded-md my-1 p-1'
        onClick={() => {
          setLista(!lista)
        }}
      >
        {lista ? 'Ocultar lista de preguntas' : 'Mostrar lista de preguntas'}
      </button>
      {lista && customPreguntas.length >= 1 ? (
        <div className='flex flex-wrap justify-center flex-col border rounded-md p-1 mb-1 gap-2'>
          {customPreguntas.map((pregunta) => {
            return (
              <div
                className='border rounded-md flex p-1 gap-1'
                key={pregunta.id}
              >
                <h1>{pregunta.encabezado}</h1>
                <button
                  className='text-sm ml-auto'
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
            'flex m-auto border rounded-md p-1 ' +
            (erroresCustom.tiempo ? 'border-red-600 text-red-600' : null)
          }
        >
          <label htmlFor='tiempo'>Tiempo :</label>
          <input
            ref={tiempo}
            type='number'
            className='bg-black text-white w-14 text-center rounded-md outline-none'
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
        <div className='flex m-auto border rounded-md p-1'>
          <label>
            Vidas :
            {vidas.slice(0, 3).map((vidas, index) => (
              <span key={index}> {vidas} </span>
            ))}{' '}
            {vidas.length > 3 || vidas.length === 0 ? vidas.length : null}
          </label>
          <button
            type='button'
            className='w-5'
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
            className='w-5'
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
              <h1>Guardar? </h1>
              <input
                className='appearance-none border w-4 h-4 rounded-lg checked:bg-green-400'
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
                    'bg-black text-white border rounded-md outline-none p-1 ' +
                    (erroresCustom.nombre
                      ? 'border-red-600 placeholder:text-red-600'
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
            <p>Coloque 0 en los campos de tiempo o vida para desactivarlos.</p>
            <p className='text-red-500'>{erroresCustom.cantidad}</p>
            <div className='border rounded-md max-w-[390px] sm:min-w-[500px] sm:max-w-fit'>
              <Field
                name='encabezado'
                placeholder={
                  errors.encabezado && touched.encabezado
                    ? errors.encabezado
                    : `Ingrese el encabezado de la pregunta numero ${
                        customPreguntas.length + 1
                      }`
                }
                className={
                  'rounded-md text-xl p-3 bg-black w-full text-center outline-none ' +
                  (errors.encabezado && touched.encabezado
                    ? 'border-red-600 placeholder:text-red-600'
                    : null)
                }
              />
              <div className='flex border justify-center items-center rounded-md p-3 gap-3'>
                <div className='grid grid-rows-2 grid-cols-1 gap-4 sm:grid-flow-col'>
                  <div className='flex items-center justify-center gap-1 flex-row-reverse sm:flex-row'>
                    <Field
                      type='radio'
                      name='valorCorrecto'
                      value='1'
                      className={
                        'appearance-none border w-4 h-4 rounded-lg checked:bg-green-400 ' +
                        (errors.valorCorrecto && touched.valorCorrecto
                          ? 'border-red-600'
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
                        'border rounded-md p-3 min-w-[250px] sm:min-w-[300px] bg-black outline-none ' +
                        (errors.valor1 && touched.valor1
                          ? 'border-red-600 placeholder:text-red-600'
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
                        'appearance-none border w-4 h-4 rounded-lg checked:bg-green-400 ' +
                        (errors.valorCorrecto && touched.valorCorrecto
                          ? 'border-red-600'
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
                        'border rounded-md p-3 min-w-[250px] sm:min-w-[300px] bg-black outline-none ' +
                        (errors.valor2 && touched.valor2
                          ? 'border-red-600 placeholder:text-red-600'
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
                        'border rounded-md p-3 min-w-[250px] sm:min-w-[300px] bg-black outline-none ' +
                        (errors.valor3 && touched.valor3
                          ? 'border-red-600 placeholder:text-red-600'
                          : null)
                      }
                    />
                    <Field
                      type='radio'
                      name='valorCorrecto'
                      value='3'
                      className={
                        'appearance-none border w-4 h-4 rounded-lg checked:bg-green-400 ' +
                        (errors.valorCorrecto && touched.valorCorrecto
                          ? 'border-red-600'
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
                        'border rounded-md p-3 min-w-[250px] sm:min-w-[300px] bg-black outline-none ' +
                        (errors.valor4 && touched.valor4
                          ? 'border-red-600 placeholder:text-red-600'
                          : null)
                      }
                    />
                    <Field
                      type='radio'
                      name='valorCorrecto'
                      value='4'
                      className={
                        'appearance-none border w-4 h-4 rounded-lg checked:bg-green-400 ' +
                        (errors.valorCorrecto && touched.valorCorrecto
                          ? 'border-red-600'
                          : null)
                      }
                    />
                  </div>
                </div>
              </div>
              {errors.valorCorrecto && touched.valorCorrecto ? (
                <p>{errors.valorCorrecto}</p>
              ) : null}
              <button type='submit'>Añadir</button>
            </div>
          </Form>
        )}
      </Formik>
      <button
        className='border rounded-md p-1 mt-1'
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
            id ? Number(id) : undefined
          )
        }}
      >
        Finalizar
      </button>
    </div>
  )
}

export default CustomFormPage
