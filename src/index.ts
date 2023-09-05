import { users, products, createUser, getAllUsers, createProducts, getAllProducts, getProductsByName, getUsersByName } from "./dataBase";

const initProjet = (num:number):void => {
   
  for (let i:number = 0; i < num; i++) {
    setTimeout(():void => {
      console.log(`Carregando dataBase em..... ${num - i}`);
    }, i * 1000);
  }
};

setTimeout(():void => {
  console.table(users)
  console.table(products)
  console.log(createUser('u001','Claudia','claudia@email.com','ZéDaManga'))
  console.log(createProducts('prod004','Microfone', 350 , 'Melhor experiencia de audio'))
  console.table(getAllUsers())
  console.table(getAllProducts())
  console.table(getProductsByName('C'))
  console.table(getUsersByName('CLAUDIA'))


},4000);


initProjet(3)