import { useMemo } from 'react';

import { ProductItem } from './ProductItem';

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
  totalPrice: number;
  onAddToWishlist: (id: number) => void;
}

export function SearchResults({ results, onAddToWishlist, totalPrice }: SearchResultsProps) {

  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map(product => {
        return <ProductItem key={product.id} product={product} onAddToWishlist={onAddToWishlist} />;
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