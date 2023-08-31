import { TUsers, TProducts } from './types'
import { createdAt } from './utils'

export const users: TUsers[] = [
  {
    id: 'u001',
    name: 'Fulano',
    email: 'fulano@email.com',
    password: 'fulano123',
    createdAt: createdAt(),
  },
  {
    id: 'u002',
    name: 'Ciclano',
    email: 'ciclano@email.com',
    password: 'ciclano123',
    createdAt: createdAt(),
  },
  {
    id: 'u003',
    name: 'Beltrano',
    email: 'beltrano@email.com',
    password: 'beltrano123',
    createdAt: createdAt(),
  },
]

export const products: TProducts[] = [
  {
    id: 'prod001',
    name: 'Mouse gamer',
    price: 250.00,
    description: 'Melhor mouse do mercado!',
    imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
  },
  {
    id: 'prod001',
    name: 'Monitor',
    price: 1550.00,
    description: 'Melhor monitor do mercado!',
    imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
  },
  {
    id: 'prod001',
    name: 'Cadeira gamer',
    price: 1100.00,
    description: 'Cadeira Gamer do Mercado!',
    imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
  },
]
