export function convertDateToString(datePurchase: Date) {
  const data = new Date(datePurchase)
  return data.getDate()
    + '/' + (data.getMonth() + 1)
    + '/' + data.getFullYear()
}