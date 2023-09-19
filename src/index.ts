import {
  users,
  products,
  createUser,
  getAllUsers,
  createProducts,
  getAllProducts,
  getProductsByName,
  getUsersByName,
  deleteUserById,
  deleteProductById,
  updateUser,
  updateProducts,
} from './dataBase'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { TProducts, TUsers } from './types'

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
  console.log('Servidor rodando na porta 3003')
})

app.get('/users', (req: Request, res: Response): void => {
  try {
    res.status(200).send(users)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.get('/products', (req: Request, res: Response): void => {
  try {
    res.status(200).send(products)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.get('/products/search', (req: Request, res: Response): void => {
  const q: string = req.query.q as string

  try {
    if (!q) {
      res.statusCode = 404
      throw new Error('Digite pelo menos um caracter para buscar!!!')
    }

    const productsFiltered: TProducts[] = products.filter((product) =>
      product.name.toLowerCase().includes(q.toLowerCase()),
    )

    const productFiltered: TProducts[] = getProductsByName(q)

    res.status(200).send(productFiltered)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.get('/users/search', (req: Request, res: Response): void => {
  const q: string = req.query.q as string

  try {
    if (!q) {
      res.statusCode = 404
      throw new Error('Digite pelo menos um caracter para buscar!!!')
    }
    const userByName: TUsers[] = getUsersByName(q)

    res.status(200).send(userByName)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.post('/users', (req: Request, res: Response): void => {
  try {
    const { id, name, email, password }: TUsers = req.body

    if (
      typeof id !== 'string' ||
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof id !== 'string'
    ) {
      res.statusCode = 404
      throw new Error('Sua requisição necessita de um body')
    }

    const idSearch =  users.find((user) => user.id === id  )
   
    if(idSearch !== undefined){
      res.statusCode=404
      throw new Error(`Este id '${id}', já existe em nossa base de dados.`)
    }
    const idEmail =  users.find((user) => user.email === email  )
   
    if(idEmail !== undefined){
      res.statusCode=404
      throw new Error(`Este e-mail '${email}', já existe em nossa base de dados.`)
    }

    createUser(id, name, email, password)

    res.status(200).send('Cadastro realizado com sucesso')

  } catch (error) {
    if (error instanceof Error) {
      
      res.send(error.message)
    }
  }
})

app.post('/products', (req: Request, res: Response): void => {
  const { id, name, price, description }: TProducts = req.body

  createProducts(id, name, price, description)

  res.status(201).send('Produto cadastro realizado com sucesso')
})

app.delete('/users/:id', (req: Request, res: Response): void => {
  const userIdToDelete = req.params.id

  const results: void = deleteUserById(userIdToDelete)

  res.status(200).send('User deleted successfully')
})

app.delete('/products/:id', (req: Request, res: Response): void => {
  const productsIdToDelete = req.params.id

  const results: void = deleteProductById(productsIdToDelete)

  res.status(200).send('Product deleted successfully')
})

app.put('/users/:id', (req: Request, res: Response): void => {
  const userIdToEdit = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newEmail = req.body.email as string | undefined
  const newPassword = req.body.password as string | undefined

  updateUser(userIdToEdit, newId, newName, newEmail, newPassword)

  res.status(200).send({ message: 'User updated successfully' })
})

app.put('/products/:id', (req: Request, res: Response): void => {
  const productsIdToEdit = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newPrice = req.body.price as number | undefined
  const newDescription = req.body.description as string | undefined

  updateProducts(productsIdToEdit, newId, newName, newPrice, newDescription)

  res.status(200).send({ message: 'Product updated successfully' })
})
