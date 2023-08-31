import { users, products } from "./dataBase";

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
},4000);


initProjet(3)