import { db } from "./database/knex";
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
} from "./dataBase";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProducts, TPurchase, TPurchaseProd, TUsers } from "./types";
import { Console } from "console";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

///Users

app.get("/users", async (req: Request, res: Response) => {
  try {
    const usersResults = await db('users');
    res.status(200).send(usersResults);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

app.get("/users/search", async (req: Request, res: Response) => {
  try {
    const q: string = req.query.q as string;

    if (!q) {
      res.statusCode = 404;
      throw new Error("Digite pelo menos um caracter para buscar!!!");
    }

    const userByName: TUsers[] = await db("users").whereLike("name", `%${q}%`);

    res.status(200).send(userByName);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password }: TUsers = req.body;

    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      res.statusCode = 404;
      throw new Error("Sua requisição necessita informar corretamente os dados do body");
    }

    const [idSearch] = await db("users").where({ id });

    if (idSearch !== undefined) {
      res.statusCode = 404;
      throw new Error(`Este id '${id}', já existe em nossa base de dados.`);
    }

    const [idEmail] = await db("users").where({ email });

    if (idEmail !== undefined) {
      res.statusCode = 404;
      throw new Error(
        `Este e-mail '${email}', já existe em nossa base de dados.`
      );
    }
    const newUser={
      id,
      name,
      email,
      password
    }

    await db('users').insert(newUser)
  

    res.status(200).send({ message: "Cadastro realizado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

app.delete("/users/:id", async(req: Request, res: Response) => {
  try {
    const userIdToDelete:string = req.params.id;

    const [idSearch]:TUsers[] = await db('users').where({id:userIdToDelete})

  
    if (!idSearch) {
      res.statusCode = 404;
      throw new Error("Usuario não encontrado !!! ");
    }

    const deleteUser = await db.delete().from('users').where({id:userIdToDelete})

    res.status(200).send({ message: "Usuario deletado com successo" });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

///Products

app.get("/products", async (req: Request, res: Response) => {
  try {
    const productsResults:string = await db('products');

    res.status(200).send(productsResults);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const q: string = req.query.q as string;

    if (!q) {
      res.statusCode = 404;
      throw new Error("Digite pelo menos um caracter para buscar!!!");
    }

    const productFiltered: TProducts[] = await db("products").whereLike(
      "name",
      `%${q}%`
    );

    res.status(200).send(productFiltered);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

app.post("/products", async(req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl }: TProducts = req.body;
    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof price !== "number" ||
      typeof description !== "string" ||
      typeof imageUrl !== "string"
    ) {
      res.statusCode = 404;
      throw new Error("Sua requisição necessita de um body");
    }

    const [productSearch] = await db('products').where({id})


    if (productSearch) {
      res.statusCode = 404;
      throw new Error(`Este id '${id}', já existe em nossa base de dados.`);
    }

    const newProducts={
      id,
      name,
      price,
      description,
      image_url:imageUrl
    }

    await db('products').insert(newProducts)

    res.status(201).send({ message: "Produto cadastrado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const productsIdToEdit: string = req.params.id;

    const [productSearch] = await db("products").where({
      id: productsIdToEdit,
    });

    if (!productSearch) {
      res.statusCode = 404;
      throw new Error("Produto não encontrado !!! ");
    }

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImage = req.body.imageUrl as string | undefined;

    if (
      (newId !== undefined && typeof newId !== "string") ||
      (newName !== undefined && typeof newName !== "string") ||
      (newPrice !== undefined && typeof newPrice !== "number") ||
      (newDescription !== undefined && typeof newDescription !== "string") ||
      (newImage !== undefined && typeof newImage !== "string")
    ) {
      res.statusCode = 404;
      throw new Error("Informe o body de maneira correta");
    }

    const [product] = await db("products").where({ id: productsIdToEdit });

    const updatedProduct = {
      id: newId || product.id,
      name: newName || product.name,
      price: newPrice || product.price,
      description: newDescription || product.description,
      image_url: newImage || product.image_url,
    };

    await db("products").update(updatedProduct).where({ id: productsIdToEdit });

    res.status(200).send({ message: "Produto atualizado com successo" });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

// Purchases

app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { idPurchase, idBuyer, idProduct, quantity } = req.body;

    if (
      typeof idPurchase !== "string" ||
      typeof idBuyer !== "string" ||
      typeof quantity !== "number"
    ) {
      res.statusCode = 404;
      throw new Error("Digite um produto válido !!! ");
    }

    const [searchPriceProducts] = await db("products").where({ id: idProduct });

    const sumQuantity = quantity * searchPriceProducts.price;

    const [searchId] = await db("users").where({ id: idBuyer });

    if (!searchId) {
      res.statusCode = 404;
      throw new Error("Informe um usuário válido");
    }

    const newPurchasesProducts = {
      purchase_id: idPurchase,
      product_id: idProduct,
      quantity,
    };

    const newPurchases = {
      id: idPurchase,
      buyer: idBuyer,
      total_price: sumQuantity,
      created_at: db.raw("DATETIME('now', 'localtime')"),
    };

    const [searchIdPurschase] = await db("purchases").where({ id: idPurchase });

    const resultsProducts = await db("products AS pdc")
      .select("pdc.price", "p.quantity")
      .innerJoin("purchases_products AS p", "pdc.id", "=", "p.product_id")
      .where({ "p.purchase_id": idPurchase });

    if (searchIdPurschase === undefined) {
      await db("purchases").insert(newPurchases);
      await db("purchases_products").insert(newPurchasesProducts);
    } else {
      const newResultsArrProduct = resultsProducts
        .map((result) => result.price * result.quantity)
        .reduce((a, b) => a + b);
      const updateRes = newPurchases.total_price + newResultsArrProduct;

      await db("purchases_products").insert(newPurchasesProducts);
      await db("purchases")
        .update({ total_price: updateRes })
        .where({ id: idPurchase });
    }

    res.status(201).send({ message: "Pedido realizado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDel: string = req.params.id;

    const [searchId] = await db.raw(`
    SELECT id FROM purchases WHERE id = '${idToDel}'
    `);

    if (!searchId) {
      res.statusCode = 404;
      throw new Error("Pedido cancelado com sucesso");
    }

    await db.raw(`
    DELETE FROM purchases_products WHERE purchase_id ='${searchId.id}';
    `);
    await db.raw(`
    DELETE FROM purchases WHERE id ='${searchId.id}';
    `);

    res.status(200).send({ message: "Pedido cancelado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const purchaseId: string = req.params.id;

    if (typeof purchaseId !== "string") {
      res.statusCode = 404;
      throw new Error("Compra não encontrada!!! ");
    }

    const [searchPurchase] = await db("purchases AS p")
      .select(
        "p.id",
        "p.buyer",
        "u.name",
        "u.email",
        "p.total_price",
        "p.created_at"
      )
      .innerJoin("users AS u ", "u.id", "=", "p.buyer")
      .where({ "p.id": purchaseId });

    const resultsProducts = await db("products AS pdc")
      .select(
        "pdc.id",
        "pdc.name",
        "pdc.price",
        "pdc.description",
        "pdc.image_url",
        "p.quantity"
      )
      .innerJoin("purchases_products AS p", "pdc.id", "=", "p.product_id")
      .where({ "p.purchase_id": purchaseId });

    if (!searchPurchase) {
      res.statusCode = 404;
      throw new Error("Compra não encontrada!!! ");
    }

    const newResult = {
      ...searchPurchase,
      products: resultsProducts,
    };

    res.status(200).json(newResult);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

