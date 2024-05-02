import styles from './quantitySelector.module.css';
import { IProduct } from '../../types/product.interface';

interface ProductProps {
  product: IProduct;
}

export default function QuantitySelector({ product }: ProductProps) {
  return (
    <div className={styles.quantitySelector}>
      <button
        className={styles.quantityButton}
        onClick={(e) => {
          const quantity = document.getElementById(
            product.produto_id.toString()
          ) as HTMLInputElement;
          if (Number(quantity.value) > 1)
            quantity.value = String(Number(quantity.value) - 1);
        }}
      >
        -
      </button>
      <input
        className={styles.quantityInput}
        type='number'
        defaultValue='1'
        id={product.produto_id.toString()}
        min={1}
      />
      <button
        className={styles.quantityButton}
        onClick={(e) => {
          const quantity = document.getElementById(
            product.produto_id.toString()
          ) as HTMLInputElement;
          quantity.value = String(Number(quantity.value) + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
