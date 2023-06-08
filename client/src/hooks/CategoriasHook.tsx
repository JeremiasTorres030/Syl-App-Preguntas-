import axios from 'axios'
import { useEffect, useState } from 'react'
import { Categoria, ServerResponseCategoria } from '../types/types'

const UseCategoriesHook = () => {
  const [categorias, setCategorias] = useState<Array<Categoria>>([])
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    try {
      const res = await axios.get<ServerResponseCategoria>(
        `${import.meta.env.VITE_API_URL}categorias`
      )
      setCategorias(res.data.categorias)
    } catch (error) {
      setError(true)
    }
  }

  return { categorias, error }
}

export default UseCategoriesHook
