import { create } from "zustand";
import { IProduct } from "@/types/product.interface";

interface State {
	cart: IProduct[];
	totalItems: number;
	totalPrice: number;
}

interface Actions {
	addToCart: (product: IProduct, qtd: number) => void;
	decrementFromCart: (productId: IProduct) => void;
	removeFromCart: (productId: IProduct) => void;
}

const INITIAL_STATE: State = {
	cart: [],
	totalItems: 0,
	totalPrice: 0,
};

export const useCartStore = create<State & Actions>((set, get) => ({
	cart: INITIAL_STATE.cart,
	totalItems: INITIAL_STATE.totalItems,
	totalPrice: INITIAL_STATE.totalPrice,
	addToCart: (product: IProduct, qtd: number) => {
		const cart = get().cart;
		const cartItem = cart.find(
			(item: IProduct) => item.produto_id === product.produto_id
		);

		if (cartItem) {
			const updateCart = cart.map((item: IProduct) =>
				item.produto_id === product.produto_id
					? { ...item, quantity: (item.quantity as number) + qtd }
					: item
			);
			set((state: State) => ({
				cart: updateCart,
				totalItems: state.totalItems + qtd,
				totalPrice: state.totalPrice + product.preco * qtd,
			}));
		} else {
			const updateCart = [...cart, { ...product, quantity: qtd }];

			set((state: State) => ({
				cart: updateCart,
				totalItems: state.totalItems + qtd,
				totalPrice: state.totalPrice + product.preco * qtd,
			}));
		}
	},
	decrementFromCart: (product: IProduct) => {
		const cart = get().cart;
		const cartItem = cart.find(
			(item: IProduct) => item.produto_id === product.produto_id
		);

		if (cartItem) {
			const updateCart = cart.map((item: IProduct) =>
				item.produto_id === product.produto_id
					? { ...item, quantity: (item.quantity as number) - 1 }
					: item
			);
			set((state: State) => ({
				cart: updateCart,
				totalItems: state.totalItems - 1,
				totalPrice: state.totalPrice - product.preco,
			}));
		}
	},
	removeFromCart: (product: IProduct) =>
		set((state: State) => ({
			cart: state.cart.filter(
				(item: IProduct) => item.produto_id !== product.produto_id
			),
			totalItems: state.totalItems - (product.quantity as number),
			totalPrice:
				state.totalPrice - product.preco * (product.quantity as number),
		})),
}));
