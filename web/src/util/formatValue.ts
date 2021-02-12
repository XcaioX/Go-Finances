export const formatValue = (value: number): string => {
  return Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}
