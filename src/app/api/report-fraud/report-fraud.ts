// pages/api/report-fraud.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@vercel/postgres';

interface FraudCaseData {
  nature: string;
  transactionDetails: string;
  supportingDocs: File[]; // Update this if you handle file uploads
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed', success: false });
  }

  const data: FraudCaseData = JSON.parse(req.body);

  // Insert the form data into the database
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    const result = await client.query(
      'INSERT INTO fraud_cases (nature_of_fraud, transaction_details, supporting_documentation) VALUES ($1, $2, $3) RETURNING *',
      [
        data.nature,
        data.transactionDetails,
        // Handle file uploads here if needed
        JSON.stringify(data.supportingDocs), // Just an example; adjust as per your needs
      ]
    );

    res.status(200).json({ success: true, result: result.rows[0] });
  } catch (error) {
    console.error('Error inserting into database:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  } finally {
    await client.end();
  }
}
