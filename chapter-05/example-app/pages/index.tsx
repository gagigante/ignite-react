import { FormEvent, useState, useCallback } from 'react';

import { SearchResults } from '../components/SearchResults';

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if(!search.trim()) {
      return;
    }

    const data = await fetch(
      `http://localhost:3333/products?q=${search}`
    ).then(res => res.json());

    setResults(data);
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

      <SearchResults results={results} onAddToWishlist={addToWishlist} />
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