import { TUsers, TProducts } from './types'

export const users: TUsers[] = [
  {
    id: 'u001',
    name: 'Fulano',
    email: 'fulano@email.com',
    password: 'fulano123',
    createdAt: new Date().toISOString().valueOf(),
  },
  {
    id: 'u002',
    name: 'Ciclano',
    email: 'ciclano@email.com',
    password: 'ciclano123',
    createdAt: new Date().toISOString().valueOf(),
  },
  {
    id: 'u003',
    name: 'Beltrano',
    email: 'beltrano@email.com',
    password: 'beltrano123',
    createdAt: new Date().toISOString().valueOf(),
  },
]

export const products: TProducts[] = [
  {
    id: 'prod001',
    name: 'Mouse gamer',
    price: 250.0,
    description: 'Melhor mouse do mercado!',
    imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
  },
  {
    id: 'prod002',
    name: 'Monitor',
    price: 1550.0,
    description: 'Melhor monitor do mercado!',
    imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
  },
  {
    id: 'prod003',
    name: 'Cadeira gamer',
    price: 1100.0,
    description: 'Cadeira Gamer do Mercado!',
    imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
  },
]

export const createUser = (
  id: string,
  name: string,
  email: string,
  password: string,
): string => {
  const newUsers = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString().valueOf(),
  }

  users.push(newUsers)

  return 'Cadastro Realizado com sucesso'
}

export const getAllUsers = (): TUsers[] =>
  users.map((user) => {
    return user
  })

export const createProducts = (
  id: string,
  name: string,
  price: number,
  description: string,
): string => {
  const newProducts = {
    id,
    name,
    price,
    description,
    imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
  }

  products.push(newProducts)

  return 'Cadastro Realizado com sucesso'
}

export const getAllProducts = (): TProducts[] =>
  products.map((products) => {
    return products
  })

export const getProductsByName = (name: string): TProducts[] => {
  return products.filter((product) => {
    return product.name.toLowerCase().includes(name.toLowerCase())
  })
}

export const getUsersByName = (name: string): TUsers[] => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(name.toLowerCase()),
  )
}
