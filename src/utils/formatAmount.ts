// amount: R$50,00
export function formatAmount(amount: string) {
  return parseFloat(
    amount
      .slice(2, amount.length)
      .replace('.', '')
      .replace(',', '.')
  )
}