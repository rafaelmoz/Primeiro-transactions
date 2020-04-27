import Transaction from '../models/Transaction';
import { response } from 'express';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const allTransactions = this.transactions;


    const totalIncome = allTransactions.reduce( (total, transaction) => {
      if (transaction.type ==='income') return total += transaction.value;
      else return total
    }, 0);
    const totalOucome = allTransactions.reduce( (total, transaction) => {
      if (transaction.type ==='outcome') return total += transaction.value;
      else return total
    }, 0);

    const balance = {
        income: totalIncome,
        outcome: totalOucome,
        total: totalIncome-totalOucome
    }

    return balance;
  }

  public create({title, value, type}: TransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
