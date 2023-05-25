import axios from 'axios'
import { useEffect, useState } from 'react'
import { Categoria, ServerResponseCategoria } from '../types/types'

const UseCategoriesHook = () => {
  const [categorias, setCategorias] = useState<Array<Categoria>>([])

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    const res = await axios.get<ServerResponseCategoria>(
      `${import.meta.env.VITE_API_URL}categorias`
    )
    setCategorias(res.data.categorias)
  }

  return { categorias }
}

export default UseCategoriesHook
