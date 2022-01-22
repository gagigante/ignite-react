import { ProductItem } from "./ProductItem";

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div>
      {results.map(product => {
        // eslint-disable-next-line react/jsx-key
        return <ProductItem product={product}/>;
      })}
    </div>
  )
}