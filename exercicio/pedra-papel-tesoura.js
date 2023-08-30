function pcChoose() {
  const option = ["pedra", "papel", "tesoura"];
  const optionRandom = Math.floor(Math.random() * option.length);
  return option[optionRandom];
}

const jockeyPow = (choose) => {
  const chooseFinalPc = pcChoose();

  if (
    choose.toLowerCase() === "pedra" ||
    choose.toLowerCase() === "papel" ||
    choose.toLowerCase() === "tesoura"
  ) {
    if (
      chooseFinalPc.toLowerCase() === "pedra" &&
      choose.toLowerCase() === "papel"
    ) {
      return `Pc choose ${chooseFinalPc.toLowerCase()} - You Choose  ${choose.toLowerCase()} >>> You win`;
    } else if (
      chooseFinalPc.toLowerCase() === "pedra" &&
      choose.toLowerCase() === "pedra" 
    ) {
      return `Pc choose ${chooseFinalPc.toLowerCase()} - You Choose  ${choose.toLowerCase()} >>> Draw `;
    } else if (
      chooseFinalPc.toLowerCase() === "pedra" &&
      choose.toLowerCase() === "tesoura" 
    ) {
      return `Pc choose ${chooseFinalPc.toLowerCase()} - You Choose  ${choose.toLowerCase()} >>> You Lose `;
    }else if (
        chooseFinalPc.toLowerCase() === "tesoura" &&
        choose.toLowerCase() === "pedra" 
      ) {
        return `Pc choose ${chooseFinalPc.toLowerCase()} - You Choose  ${choose.toLowerCase()} >>> You win`;
      }else if (
        chooseFinalPc.toLowerCase() === "tesoura" &&
        choose.toLowerCase() === "tesoura" 
      ) {
        return  `Pc choose ${chooseFinalPc.toLowerCase()} - You Choose  ${choose.toLowerCase()} >>> Draw `;
      }else if (
        chooseFinalPc.toLowerCase() === "tesoura" &&
        choose.toLowerCase() === "papel" 
      ) {
        return `Pc choose ${chooseFinalPc.toLowerCase()} - You Choose  ${choose.toLowerCase()} >>> You Lose `;
      }else if (
        chooseFinalPc.toLowerCase() === "papel" &&
        choose.toLowerCase() === "tesoura" 
      ) {
        return `Pc choose ${chooseFinalPc.toLowerCase()} - You Choose  ${choose.toLowerCase()} >>> You win `;
      }else if (
        chooseFinalPc.toLowerCase() === "papel" &&
        choose.toLowerCase() === "papel" 
      ) {
        return `Pc choose ${chooseFinalPc.toLowerCase()} - You Choose  ${choose.toLowerCase()} >>> Draw `;
      }else if (
        chooseFinalPc.toLowerCase() === "papel" &&
        choose.toLowerCase() === "pedra" 
      ) {
        return `Pc choose ${chooseFinalPc.toLowerCase()} - You Choose  ${choose.toLowerCase()} >>> You Lose `;
      }






  } else {
    return `Digite um Argumento Válido`;
  }
};

console.log(jockeyPow(process.argv[2]));
