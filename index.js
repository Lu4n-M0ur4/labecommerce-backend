const initProjet = (num) => {
   
  for (let i = 0; i < num; i++) {
    setTimeout(() => {
      console.log(`iniciando em ${num - i}`);
    }, `${i}000`);
  }
};
initProjet(3)