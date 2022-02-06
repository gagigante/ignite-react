import { List, ListRowRenderer } from 'react-virtualized';

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
  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem  product={results[index]} onAddToWishlist={onAddToWishlist} />
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      {/* Exemplo de lista virtualizada */}
      <List 
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRender}
      />

      {/* {results.map(product => {
        return <ProductItem key={product.id} product={product} onAddToWishlist={onAddToWishlist} />;
      })} */}
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