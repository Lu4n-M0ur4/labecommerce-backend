export const createdAt = ():string => {
  const newDate = new Date()
  
  // const dateFormatter = (date: Date):string => {
  //   return new Intl.DateTimeFormat('pt-BR', {
  //     dateStyle: 'full',
  //     timeStyle:"long"
  //   }).format(date)
  // }

  // return dateFormatter(newDate)

  return newDate.valueOf().toString()
}
