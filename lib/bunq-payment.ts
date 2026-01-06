export function generateBunqPaymentLink(amount: number, description: string, orderId?: string) {
  // Bunq base URL
  const bunqUsername = 'projectben'
  
  // Convert amount from cents to euros
  const amountInEuros = (amount / 100).toFixed(2)
  
  // Generate unique reference from order ID or timestamp
  const reference = orderId ? orderId.slice(-8) : Date.now().toString().slice(-8)
  
  // Bunq.me link format: https://bunq.me/{username}/{amount}#{reference}
  const bunqLink = `https://bunq.me/${bunqUsername}/${amountInEuros}#${reference}`
  
  return {
    paymentUrl: bunqLink,
    amount: amountInEuros,
    reference,
    description,
  }
}

export function formatBunqAmount(cents: number): string {
  return (cents / 100).toFixed(2)
}
