const brlNumberFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function brl(value: number) {
  return brlNumberFormatter.format(value);
}
