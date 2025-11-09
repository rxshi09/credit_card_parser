import { supabase } from './supabase.js';

export async function saveStatement(statement, rawText) {
  const { data, error } = await supabase
    .from('statements')
    .insert({
      bank_name: statement.bankName,
      card_last_four_digits: statement.cardLastFourDigits,
      billing_cycle: statement.billingCycle,
      payment_due_date: statement.paymentDueDate,
      total_balance: statement.totalBalance,
      card_variant: statement.cardVariant || '',
      raw_text: rawText
    })
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to save statement: ${error.message}`);
  }

  return data?.id || '';
}

export async function getAllStatements() {
  const { data, error } = await supabase
    .from('statements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch statements: ${error.message}`);
  }

  return (data || []).map(row => ({
    id: row.id,
    bankName: row.bank_name,
    cardLastFourDigits: row.card_last_four_digits,
    billingCycle: row.billing_cycle,
    paymentDueDate: row.payment_due_date,
    totalBalance: row.total_balance,
    cardVariant: row.card_variant,
    created_at: row.created_at
  }));
}

export async function deleteStatements(selectedIds = []) {
  if (selectedIds.length === 0) {
    throw new Error("No statements selected for deletion.");
  }

  const { error } = await supabase
    .from('statements')
    .delete()
    .in('id', selectedIds);

  if (error) {
    throw new Error(`Failed to delete statements: ${error.message}`);
  }

  return true;
}