export type Tariff = {
  id: string;
  period: string;
  price: number;
  full_price: number;
  is_best: boolean;
  text: string;
};

export function getDiscountPercent(price: number, fullPrice: number): number {
  if (fullPrice <= 0) return 0;
  return Math.round((1 - price / fullPrice) * 100);
}

export function formatPrice(value: number): string {
  return `${value.toLocaleString("ru-RU")} ₽`;
}
