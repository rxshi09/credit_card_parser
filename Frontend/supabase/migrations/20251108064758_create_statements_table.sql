/*
  # Create Credit Card Statements Table

  1. New Tables
    - `statements`
      - `id` (uuid, primary key) - Unique identifier for each statement
      - `bank_name` (text) - Name of the credit card issuer bank
      - `card_last_four_digits` (text) - Last 4 digits of the card
      - `billing_cycle` (text) - Billing period for the statement
      - `payment_due_date` (text) - Date when payment is due
      - `total_balance` (text) - Total amount due
      - `card_variant` (text, optional) - Type/variant of credit card
      - `raw_text` (text) - Original extracted text from PDF
      - `created_at` (timestamptz) - Timestamp when record was created

  2. Security
    - Enable RLS on `statements` table
    - Add policy for public read access (for demo purposes)
    - Add policy for public insert access (for demo purposes)
*/

CREATE TABLE IF NOT EXISTS statements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_name text NOT NULL DEFAULT 'Not Found',
  card_last_four_digits text NOT NULL DEFAULT 'Not Found',
  billing_cycle text NOT NULL DEFAULT 'Not Found',
  payment_due_date text NOT NULL DEFAULT 'Not Found',
  total_balance text NOT NULL DEFAULT 'Not Found',
  card_variant text DEFAULT '',
  raw_text text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE statements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON statements
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access"
  ON statements
  FOR INSERT
  TO public
  WITH CHECK (true);
