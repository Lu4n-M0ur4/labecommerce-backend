export const createdAt = ():string => {
  const newDate = new Date()

  const dateFormatter = (date: Date):string => {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'full',
      timeStyle:"short"
    }).format(date)
  }

  return dateFormatter(newDate)
}
