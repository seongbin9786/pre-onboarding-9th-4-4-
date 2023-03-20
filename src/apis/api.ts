import axios from 'axios';

interface Transaction {
  id: number;
  transaction_time: string;
  status: boolean;
  customer_id: number;
  customer_name: string;
  currency: string;
}

export const allTransactions = async () => {
  try {
    const response = await axios.get<Transaction[]>('/mock_data.json');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
