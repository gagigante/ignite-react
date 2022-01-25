import { FormEvent, useState, useCallback } from 'react';

import { SearchResults } from '../components/SearchResults';

type Results = {
  totalPrice: number;
  data: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({ totalPrice: 0, data: [] });

  // TIP: Formatar dados após o fetch e não no momento de exibir os dados para evitar cálculos desnecessários
  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if(!search.trim()) {
      return;
    }

    const data = await fetch(
      `http://localhost:3333/products?q=${search}`
    ).then(res => res.json());

    const formatter =  new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

    const products = data.map(product => {
      return {
        ...product,
        priceFormatted: formatter.format(product.price)
      }
    })

    const totalPrice = data.reduce((acc, item) => {
      return acc + item.price
    }, 0);
  

    setResults({ totalPrice, data: products });
  }

  const addToWishlist = useCallback((id: number) => {
    console.log({ id });
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults 
        results={results.data} 
        totalPrice={results.totalPrice} 
        onAddToWishlist={addToWishlist}
      />
    </div>
  );
}

/**
 * useMemo 
 * 
 * -> Função que memoriza (memoization) uma função e evita que ela seja montada do zero caso seu array de dependências não mude
 * -> Conserva a função no mesmo endereço permitindo a comparação referencial
 */

/**
 * Quando devo utilizar?
 * 
 * 1. Quando a função é repassada para componentes filhos. Útil para contextos
 */