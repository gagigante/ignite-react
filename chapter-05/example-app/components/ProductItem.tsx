import { memo, useState /* lazy */ } from 'react'; // Para aplicações sem SSR utilizar o lazy
import dynamic from 'next/dynamic'

// import { AddProductToWishlist } from './AddProductToWishlist';
import { AddProductToWishlistProps } from './AddProductToWishlist';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(module => module.AddProductToWishlist)
}, {
  loading: () => <span>Carregando...</span>
})

type ProductItemProps = {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

      {isAddingToWishlist && (
        <AddProductToWishlist 
          onAddToWishlist={() => onAddToWishlist(product.id)} 
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  // Realiza um deep compare
  return Object.is(prevProps.product, nextProps.product)
});

/**
 * Ciclo de atualização de componentes
 * 
 * 1. Cria uma nova versão do componente na memória
 * 2. Compara com a versão atual do componente
 * 3. Caso haja alterações, atualiza o que alterou
 */

/**
 * Função memo 
 * 
 * -> Por padrão realiza um shallow compare
 * -> Para modificar o comportamento padrão é necessário passar um segundo argumento que retornará um boolean que indica se o componente deve ou não ser re-renderizado
 * 
 * Caso nenhuma prop do componente em questão tenha sido modificada, evita os passos 1 e 2
 */

/**
 * Quando devo utilizar?
 * 
 * 1. Em componentes puros (Um componente dado as mesmas props sempre retornam o mesmo resultado)
 * 2. Componentes que re-renderizam muito
 * 3. Componentes que re-renderizam mesmo tendo as mesmas propriedades
 * 4. Não vale a pena utilizar em componentes pequenos
 */

/**
 * Code splitting
 * 
 * Trata-se de importar dinamicamente um recurso apenas quando necessário (lazy import)
 */