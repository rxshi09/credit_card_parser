// ParsedStatement and Transaction definitions (for reference only in comments)
/*
  ParsedStatement = {
    id?: string,
    bankName: string,
    cardLastFourDigits: string,
    billingCycle: string,
    paymentDueDate: string,
    totalBalance: string,
    cardVariant?: string,
    transactions?: Transaction[],
    created_at?: string
  }

  Transaction = {
    date: string,
    description: string,
    amount: string
  }
*/

export const SUPPORTED_BANKS = [
  'HDFC Bank',
  'ICICI Bank',
  'SBI Card',
  'Axis Bank',
  'Kotak Mahindra Bank'
];

// SupportedBank type equivalent is not needed in JS,
// but you can still define a helper if you want to check valid banks:
export function isSupportedBank(bankName) {
  return SUPPORTED_BANKS.includes(bankName);
}
