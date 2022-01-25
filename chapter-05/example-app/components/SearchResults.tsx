import { useMemo } from 'react';

import { ProductItem } from './ProductItem';

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>
}

export function SearchResults({ results }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((acc, item) => {
      return acc + item.price
    }, 0)
  }, [results]);

  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map(product => {
        // eslint-disable-next-line react/jsx-key
        return <ProductItem product={product}/>;
      })}
    </div>
  )
}

/**
 * useMemo 
 * 
 * -> Função que memoriza (memoization) um valor e evita que ele seja montado do zero caso seu array de dependências não mude
 * -> Conserva o valor no mesmo endereço permitindo a comparação referencial
 */

/**
 * Quando devo utilizar?
 * 
 * 1. Cálculos pesados
 * 2. Igualdade referencial (Quando repassa a informação para um componente filho)
 */