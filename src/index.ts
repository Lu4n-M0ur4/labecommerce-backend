import { db } from './database/knex'
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
import { TProducts, TPurchase, TPurchaseProd, TUsers } from './types'

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
  console.log('Servidor rodando na porta 3003')
})

app.get('/users', async (req: Request, res: Response) => {
  try {
    const usersResults = await db.raw(`SELECT * FROM users`)
    res.status(200).send(usersResults)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.get('/products', async (req: Request, res: Response) => {
  try {
    const productsResults = await db.raw(`SELECT * FROM products`)
    res.status(200).send(productsResults)
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

app.post('/users', async (req: Request, res: Response) => {
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

    // const idSearch = users.find((user) => user.id === id) Validação via metodo JS

    const [idSearch] = await db.raw(`SELECT id FROM users WHERE id ="${id}"`)

    if (idSearch !== undefined) {
      res.statusCode = 404
      throw new Error(`Este id '${id}', já existe em nossa base de dados.`)
    }

    // const idEmail = users.find((user) => user.email === email)

    const [idEmail] = await db.raw(
      `SELECT email FROM users WHERE email ="${email}"`,
    )

    if (idEmail !== undefined) {
      res.statusCode = 404
      throw new Error(
        `Este e-mail '${email}', já existe em nossa base de dados.`,
      )
    }

    // createUser(id, name, email, password)
    await db.raw(
      `INSERT INTO users VALUES("${id}","${name}","${email}","${password}",DATETIME('now', 'localtime'))`,
    )

    res.status(200).send({ message: 'Cadastro realizado com sucesso' })
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.post('/products', async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl }: TProducts = req.body
    if (
      typeof id !== 'string' ||
      typeof name !== 'string' ||
      typeof price !== 'number' ||
      typeof description !== 'string' ||
      typeof imageUrl !== 'string'
    ) {
      res.statusCode = 404
      throw new Error('Sua requisição necessita de um body')
    }

    // const productSearch = products.find((product) => product.id === id)
    const [productSearch] = await db.raw(
      `SELECT id FROM products WHERE id = "${id}"`,
    )

    if (productSearch !== undefined) {
      res.statusCode = 404
      throw new Error(`Este id '${id}', já existe em nossa base de dados.`)
    }

    // createProducts(id, name, price, description)

    await db.raw(
      `INSERT INTO products VALUES("${id}","${name}","${price}","${description}","${imageUrl}")`,
    )

    res.status(201).send({ message: 'Produto cadastro realizado com sucesso' })
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
    res.status(204).send({ message: 'Usuario deletado com successo' })
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.delete('/products/:id', async (req: Request, res: Response) => {
  try {
    const productsIdToDelete = req.params.id

    const productSearch = products.find(
      (product) => product.id === productsIdToDelete,
    )

    // const [productSearch] = await db.raw(`SELECT id FROM products WHERE id = "${productsIdToDelete}"`)

    if (!productSearch) {
      res.statusCode = 404
      throw new Error('Produto não encontrado !!! ')
    }
    deleteProductById(productsIdToDelete)
    res.status(200).send({ message: 'Produto deletado com successo' })
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.put('/users/:id', (req: Request, res: Response): void => {
  try {
    const userIdToEdit = req.params.id

    const userSearch = users.find((user) => user.id === userIdToEdit)

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
    ) {
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

app.put('/products/:id', async (req: Request, res: Response) => {
  try {
    const productsIdToEdit = req.params.id

    // const productSearch = products.find(
    //   (product) => product.id === productsIdToEdit,
    // )

    const [productSearch] = await db.raw(
      `SELECT id FROM products WHERE id = "${productsIdToEdit}"`,
    )

    if (!productSearch) {
      res.statusCode = 404
      throw new Error('Produto não encontrado !!! ')
    }

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImage = req.body.imageUrl as string | undefined

    if (
      typeof newId !== 'string' ||
      typeof newName !== 'string' ||
      typeof newPrice !== 'number' ||
      typeof newDescription !== 'string' ||
      typeof newImage !== 'string'
    ) {
      res.statusCode = 404
      throw new Error('Informe o body de maneira correta')
    }

    const { product } = await db.raw(
      `SELECT * FROM products WHERE id = "${productsIdToEdit}"`,
    )
    // updateProducts(productsIdToEdit, newId, newName, newPrice, newDescription)

    await db.raw(
      `UPDATE products 
      SET 
      id = '${newId || product.id}',
      name = '${newName || product.name}',
      price = '${newPrice || product.price}',
      description = '${newDescription || product.description}',
      image_url = '${newImage || product.image_url}'
      WHERE id = '${productsIdToEdit}'
      `,
    )
    res.status(200).send({ message: 'Produto atualizado com successo' })
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

// Purchases

app.post('/purchases', async (req: Request, res: Response) => {
  try {
    const { id, buyer, price }: TPurchase = req.body
    const { products }: TPurchaseProd = req.body

    const [results] = await db.raw(`
    SELECT id FROM purchases WHERE id ='${id}'
    `)

    if (
      !results ||
      typeof id !== 'string' ||
      typeof buyer !== 'string' ||
      typeof price !== 'number' ||
      products.length <= 0
    ) {
      res.statusCode = 404
      throw new Error('Digite um produto válido !!! ')
    }

    const [searchId] = await db.raw(`
        SELECT id FROM users WHERE id ='${buyer}'
        `)

    if (!searchId) {
      res.statusCode = 404
      throw new Error('Informe um usuário válido')
    }

    
  
    console.log(products)


    await db.raw(`
    INSERT INTO 
    purchases (id, buyer,total_price,created_at) 
    VALUES ('${id}','${buyer}','${price}',DATETIME('now', 'localtime'))
    `)

  



    


    res.status(200).send({ message: 'Pedido realizado com sucesso' })
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})
