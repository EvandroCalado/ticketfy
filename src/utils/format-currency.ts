import { MyBig } from '@/lib/big';

export const toCent = (amount: string) =>
  new MyBig(amount).mul(100).round(2).toString();

export const fromCent = (amount: string) =>
  new MyBig(amount).div(100).round(2).toString();

export const formatCurrency = (amount: string) =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(fromCent(amount)));
