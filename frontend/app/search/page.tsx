'use client';

import { fetchProductsByName } from '@/services/fetchProductsByName';
import { IProduct } from '@/types/product.interface';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/components/Product/product';

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (searchQuery) {
      fetchProductsByName(searchQuery).then((data) => setProducts(data));
    }
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Page</h1>
      {products ? (
        <ul>
          {products.map((product) => (
            <Product key={product.produto_id} product={product} />
          ))}
        </ul>
      ) : (
        <p>Nenhum produto foi encontrado</p>
      )}
    </div>
  );
};

export default SearchPage;
