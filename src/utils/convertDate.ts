// data: 06/03/2024
// dataArray = ['06', '03', '2024']
export function convertDate(data: string) {
  const dataArray = data.split('/')
  const nDay = Number(dataArray[0])// retorna '06'
  const nMonth = Number(dataArray[1]) - 1 // retorna '03'
  const nYear = Number(dataArray[2]) // retorna '2024'
  const newData = new Date(nYear, nMonth, nDay)
  console.log(data, newData)
  return newData
}
// 0 é Janeiro (1)
// 1 é Fevereiro (2)