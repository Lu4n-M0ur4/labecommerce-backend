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
  
  try {
    const q: string = req.query.q as string // pedir uma nova explicação em aula o porque do "as"
    
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
      typeof password !== 'string'
    ) {
      res.statusCode = 404
      throw new Error('Sua requisição necessita de um body')
    }

    const idSearch = users.find((user) => user.id === id)

    if (idSearch !== undefined) {
      res.statusCode = 404
      throw new Error(`Este id '${id}', já existe em nossa base de dados.`)
    }
    const idEmail = users.find((user) => user.email === email)

    if (idEmail !== undefined) {
      res.statusCode = 404
      throw new Error(
        `Este e-mail '${email}', já existe em nossa base de dados.`,
      )
    }

    createUser(id, name, email, password)

    res.status(200).send({message:'Cadastro realizado com sucesso'})
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.post('/products', (req: Request, res: Response): void => {
  try {
    const { id, name, price, description }: TProducts = req.body
    if (
      typeof id !== 'string' ||
      typeof name !== 'string' ||
      typeof price !== 'number' ||
      typeof description !== 'string'
    ) {
      res.statusCode = 404
      throw new Error('Sua requisição necessita de um body')
    }

    const productSearch = products.find((product) => product.id === id)

    if (productSearch !== undefined) {
      res.statusCode = 404
      throw new Error(`Este id '${id}', já existe em nossa base de dados.`)
    }

    createProducts(id, name, price, description)
    res.status(201).send({message:'Produto cadastro realizado com sucesso'})
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.delete('/users/:id', (req: Request, res: Response): void => {
  try {
    const userIdToDelete = req.params.id

    const idSearch = users.find((user) => user.id === userIdToDelete)

    if (!idSearch) {
      res.statusCode = 404
      throw new Error('Usuario não encontrado !!! ')
    }
    deleteUserById(userIdToDelete)
    res.status(204).send({message:'Usuario deletado com successo'})
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.delete('/products/:id', (req: Request, res: Response): void => {
  try {
    const productsIdToDelete = req.params.id

    const productSearch = products.find(
      (product) => product.id === productsIdToDelete,
    )

    if (!productSearch) {
      res.statusCode = 404
      throw new Error('Produto não encontrado !!! ')
    }
    deleteProductById(productsIdToDelete)
    res.status(200).send({message:'Produto deletado com successo'})
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.put('/users/:id', (req: Request, res: Response): void => {
 
  try {
    const userIdToEdit = req.params.id

    const userSearch = users.find(
      (user) => user.id === userIdToEdit,
    )

    if (!userSearch) {
      res.statusCode = 404
      throw new Error('User não encontrado !!! ')
    }

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined
  
    if (
      typeof newId !== 'string' ||
      typeof newName !== 'string' ||
      typeof newEmail !== 'string' ||
      typeof newPassword !== 'string'
    ){
      res.statusCode = 404
      throw new Error('Informe o body de maneira correta')

    }

    updateUser(userIdToEdit, newId, newName, newEmail, newPassword)
    res.status(200).send({ message: 'User updated successfully' })

  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }


})

app.put('/products/:id', (req: Request, res: Response): void => {
  try {
    const productsIdToEdit = req.params.id

    const productSearch = products.find(
      (product) => product.id === productsIdToEdit,
    )

    if (!productSearch) {
      res.statusCode = 404
      throw new Error('Produto não encontrado !!! ')
    }

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined

    if (
      typeof newId !== 'string' ||
      typeof newName !== 'string' ||
      typeof newPrice !== 'number' ||
      typeof newDescription !== 'string'
    ){
      res.statusCode = 404
      throw new Error('Informe o body de maneira correta')

    }

    updateProducts(productsIdToEdit, newId, newName, newPrice, newDescription)
    res.status(200).send({ message: 'Produto atualizado com successo' })
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})
