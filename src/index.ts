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

// const initProjet = (num: number): void => {
//   for (let i: number = 0; i < num; i++) {
//     setTimeout((): void => {
//       console.log(`Carregando dataBase em..... ${num - i}`)
//     }, i * 1000)
//   }
// }
// initProjet(3)

// Exercicio TS II
// setTimeout(():void => {
//   console.table(users)
//   console.table(products)
//   console.log(createUser('u001','Claudia','claudia@email.com','ZéDaManga'))
//   console.log(createProducts('prod004','Microfone', 350 , 'Melhor experiencia de audio'))
//   console.table(getAllUsers())
//   console.table(getAllProducts())
//   console.table(getProductsByName('C'))
//   console.table(getUsersByName('CLAUDIA'))

// },4000);

// Express Api

app.get('/users', (req: Request, res: Response): void => {
  res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response): void => {
  res.status(200).send(products)
})

app.get('/products/search', (req: Request, res: Response): void => {
  const q: string = req.query.q as string

  if (!q) {
    res.status(200).send(products)
  } else {
    // const productsFiltered = products.filter((product) =>
    //   product.name.toLowerCase().includes(q.toLowerCase()),
    //   )

    const productFiltered: TProducts[] = getProductsByName(q)

    res.status(200).send(productFiltered)
  }
})

app.get('/users/search', (req: Request, res: Response): void => {
  const q: string = req.query.q as string

  if (!q) {
    res.status(200).send(users)
  } else {
    // const usersFiltered = users.filter((user) =>
    //   user.name.toLowerCase().includes(q.toLowerCase()),
    // )
    const userByName: TUsers[] = getUsersByName(q)

    res.status(200).send(userByName)
  }
})

app.post('/users', (req: Request, res: Response): void => {
  const { id, name, email, password }: TUsers = req.body

  // const newUsers: TUsers = {
  //   id,
  //   name,
  //   email,
  //   password,
  //   createdAt: new Date().toISOString().valueOf(),
  // }

  createUser(id, name, email, password)

  res.status(201).send('Cadastro realizado com sucesso')
})

app.post('/products', (req: Request, res: Response): void => {
  const { id, name, price, description }: TProducts = req.body

  // const newProduct: TProducts = {
  //   id,
  //   name,
  //   price,
  //   description,
  //   imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400',
  // }

  // products.push(newProduct)
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

  res.status(200).send({message:'User updated successfully'})
})

app.put('/products/:id', (req: Request, res: Response): void => {
  const productsIdToEdit = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newPrice = req.body.price as number | undefined
  const newDescription= req.body.description as string | undefined

  updateProducts(productsIdToEdit, newId, newName, newPrice, newDescription)

  res.status(200).send({message:'Product updated successfully'})
})
