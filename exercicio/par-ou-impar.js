function pcChoose(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + 0;
}
const gameImpPar = (parImpar, num) => {
  const chooseFinal = pcChoose(1, 5);
  const sumChooses = Number(num) + Number(chooseFinal);

  if ((parImpar.toLowerCase() === "par" || parImpar.toLowerCase() === "impar") && num >= 0) {
    if (parImpar.toLowerCase() === "par" && sumChooses % 2 === 0) {
      return `Você escolheu ${parImpar} e o resultado ${sumChooses} você ganhou!!!`;
    } else if (parImpar.toLowerCase() === "impar" && sumChooses % 2 === 1) {
      return `Você escolheu ${parImpar} e o resultado ${sumChooses} você Ganhou!!!`;
    } else if (parImpar.toLowerCase() === "impar" && sumChooses % 2 === 0) {
      return `Você escolheu ${parImpar} e o resultado ${sumChooses} você perdeu!!!`;
    } else if (parImpar.toLowerCase() === "par" && sumChooses % 2 === 1) {
      return `Você escolheu ${parImpar} e o resultado ${sumChooses} você perdeu!!!`;
    }
  } else {
    return "Digite os argumentos válidos";
  }
};
console.log(gameImpPar(process.argv[2], process.argv[3]));
