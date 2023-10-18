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
import { Console } from 'console'

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
    const productsIdToEdit: string = req.params.id

    const [productSearch] = await db('products').where({ id: productsIdToEdit })

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

    const [product] = await db('products').where({ id: productsIdToEdit })

    console.log(product)

    const updatedProduct = {
      id: newId || product.id,
      name: newName || product.name,
      price: newPrice || product.price,
      description: newDescription || product.description,
      image_url: newImage || product.image_url,
    }

    await db('products').update(updatedProduct).where({ id: productsIdToEdit })

    res.status(200).send({ message: 'Produto atualizado com successo' })
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

// Purchases

app.get('/purchases/:id', async (req: Request, res: Response) => {
  try {
    const purchaseId: string = req.params.id

    if (typeof purchaseId !== 'string') {
      res.statusCode = 404
      throw new Error('Compra não encontrada!!! ')
    }

    const [searchPurchase] = await db('purchases AS p')
      .select(
        'p.id',
        'p.buyer',
        'u.name',
        'u.email',
        'p.total_price',
        'p.created_at',
      )
      .innerJoin('users AS u ', 'u.id', '=', 'p.buyer')
      .where({ 'p.id': purchaseId })

    const resultsProducts = await db('products AS pdc')
      .select(
        'pdc.id',
        'pdc.name',
        'pdc.price',
        'pdc.description',
        'pdc.image_url',
        'p.quantity',
      )
      .innerJoin('purchases_products AS p', 'pdc.id', '=', 'p.product_id')
      .where({ 'p.purchase_id': purchaseId })

      

    if(!searchPurchase){
      res.statusCode = 404
      throw new Error('Compra não encontrada!!! ')
    }

    const newResult = {
      ...searchPurchase,
      products: resultsProducts,
    }


    res.status(200).json(newResult)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.post('/purchases', async (req: Request, res: Response) => {
  try {
    const { idPurchase, idBuyer, idProduct, quantity } = req.body

    if (
      typeof idPurchase !== 'string' ||
      typeof idBuyer !== 'string' ||
      typeof quantity !== 'number'
    ) {
      res.statusCode = 404
      throw new Error('Digite um produto válido !!! ')
    }

    const [searchPriceProducts] = await db('products').where({ id: idProduct })

    const sumQuantity = quantity * searchPriceProducts.price

    const [searchId] = await db('users').where({ id: idBuyer })

    if (!searchId) {
      res.statusCode = 404
      throw new Error('Informe um usuário válido')
    }

    const newPurchasesProducts = {
      purchase_id: idPurchase,
      product_id: idProduct,
      quantity,
    }

    const newPurchases = {
      id: idPurchase,
      buyer: idBuyer,
      total_price: sumQuantity,
      created_at: db.raw("DATETIME('now', 'localtime')"),
    }
    
    const [searchIdPurschase] = await db('purchases').where({ id: idPurchase })
    
    

    const resultsProducts = await db('products AS pdc')
      .select(
        'pdc.price',
        'p.quantity',
      )
      .innerJoin('purchases_products AS p', 'pdc.id', '=', 'p.product_id')
      .where({ 'p.purchase_id': idPurchase })


      console.log(searchIdPurschase,">>>", newPurchases.id)
    if (searchIdPurschase === undefined ) {
      await db('purchases').insert(newPurchases)
      await db('purchases_products').insert(newPurchasesProducts)
      
    }else{
      const newResults = resultsProducts.map((result)=> result.price*result.quantity).reduce((a,b)=>  a+b)
      await db('purchases_products').insert(newPurchasesProducts)
      await db('purchases').update({ total_price:newResults}).where({ id: idPurchase })
    
    }

    res.status(200).send({ message: 'Pedido realizado com sucesso' })
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})

app.delete('/purchases/:id', async (req: Request, res: Response) => {
  try {
    const idToDel: string = req.params.id

    const [searchId] = await db.raw(`
    SELECT id FROM purchases WHERE id = '${idToDel}'
    `)

    if (!searchId) {
      res.statusCode = 404
      throw new Error('Pedido cancelado com sucesso')
    }

    await db.raw(`
    DELETE FROM purchases_products WHERE purchase_id ='${searchId.id}';
    `)
    await db.raw(`
    DELETE FROM purchases WHERE id ='${searchId.id}';
    `)

    res.status(200).send({ message: 'Pedido realizado com sucesso' })
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    }
  }
})
