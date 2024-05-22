"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./manageProducts.module.css";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { fetchCategories } from "@/services/fetchCategories";
import { IProduct } from "@/types/product.interface";

const units = [
	{ id: 1, name: "Kg" },
	{ id: 2, name: "G" },
	{ id: 3, name: "Un" },
];

const baseURL = "http://localhost:8180/meusProdutos/";

const createProduct = async (
	product: {
		produto_id?: number;
		nome: any;
		descricao: any;
		preco: any;
		categoria_id: any;
		estoque: any;
		unidade: any;
		ativo: any;
		imagemUrl?: string;
	},
	fileName: string
) => {
	const productSubmit = {
		nome: String(product.nome),
		descricao: String(product.descricao),
		preco: String(product.preco),
		categoria_id: Number(product.categoria_id),
		estoque: String(product.estoque),
		unidade: String(product.unidade),
		ativo: String(product.ativo),
		imagemUrl: fileName ? `/images/products/main/${fileName}` : "",
	};

	try {
		const response = await fetch(baseURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(productSubmit),
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(`Failed to create product: ${errorData.message}`);
		}
		return await response.json();
	} catch (error) {
		throw error;
	}
};
const updateProduct = async (
	product: {
		produto_id: any;
		nome: any;
		descricao: any;
		preco: any;
		categoria_id: any;
		estoque: any;
		unidade: any;
		ativo: any;
		imagemUrl?: string;
	},
	fileName: string
) => {
	const productSubmit = {
		nome: String(product.nome),
		descricao: String(product.descricao),
		preco: String(product.preco),
		categoria_id: Number(product.categoria_id),
		estoque: String(product.estoque),
		unidade: String(product.unidade),
		ativo: String(product.ativo),
		imagemUrl: fileName ? `/images/products/main/${fileName}` : "",
	};

	try {
		const response = await fetch(`${baseURL}${product.produto_id}`, {
			// Use backticks for template literals
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(productSubmit),
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(`Failed to update product: ${errorData.message}`);
		}
		return await response.json();
	} catch (error) {
		throw error;
	}
};

const deleteProduct = async (productId: any) => {
	try {
		const response = await fetch(`${baseURL}${productId}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Failed to delete product");
		}
		return await response.json();
	} catch (error) {
		throw error;
	}
};

export default function ManageProducts() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [fileName, setFileName] = React.useState("");
	const [file, setFile] = React.useState<File>();

	const [newProduct, setNewProduct] = useState({
		produto_id: 0,
		nome: "",
		descricao: "",
		preco: "",
		categoria_id: 0,
		estoque: "",
		unidade: "",
		ativo: 1,
		imagemUrl: "",
	});
	const [isEditing, setIsEditing] = useState(false);
	const [categorias, setCategorias] = useState([]);

	useEffect(() => {
		fetchProducts();
		fetchCategories().then((data) => setCategorias(data));
	}, []);

	const categories = categorias.map(({ categoria_id, nome }) => ({
		id: categoria_id,
		name: nome,
	}));

	const fetchProducts = async () => {
		try {
			const response = await fetch(baseURL);
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			toast.error("Erro ao carregar produtos: " + error);
		}
	};

	const validateForm = () => {
		const fields = [
			"nome",
			"descricao",
			"preco",
			"categoria_id",
			"estoque",
			"unidade",
		];
		const missingFields: string[] = [];
		fields.forEach((field) => {
			if (!newProduct[field as keyof typeof newProduct]) {
				missingFields.push(field);
			}
		});
		return missingFields;
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		let { name, value } = e.target;

		let newValue =
			name === "preco" || name === "estoque" ? parseFloat(value) || 0 : value;

		setNewProduct({ ...newProduct, [name]: newValue });
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const missingFields = validateForm();
		if (missingFields.length > 0) {
			toast.error(`
        Por favor, preencha os seguintes campos: ${missingFields.join(", ")}`);
			return;
		}

		try {
			if (file) {
				const data = new FormData();
				data.set("file", file);

				const res = await fetch("/api/upload", {
					method: "POST",
					body: data,
				});

				if (!res.ok) throw new Error(await res.text());
			}
		} catch (e: any) {
			console.log(e);
		}

		try {
			if (isEditing) {
				const updatedProduct = await updateProduct(newProduct, fileName);
				toast.success("Produto atualizado com sucesso!");
			} else {
				const newCreatedProduct = await createProduct(newProduct, fileName);
				toast.success("Produto adicionado com sucesso!");
			}
			fetchProducts(); // Função para recarregar produtos do servidor após a atualização
		} catch (error) {
			toast.error(`Erro ao salvar o produto: ${error}`);
		}
		resetForm();
	};

	const resetForm = () => {
		setNewProduct({
			produto_id: 0,
			nome: "",
			descricao: "",
			preco: "",
			categoria_id: 0,
			estoque: "",
			unidade: "",
			ativo: 1,
			imagemUrl: "",
		});
		setIsEditing(false);
	};

	const editProduct = (
		product:
			| React.SetStateAction<{
					produto_id: number;
					nome: string;
					descricao: string;
					preco: string;
					categoria_id: number;
					estoque: string;
					unidade: string;
					ativo: number;
					imagemUrl: string;
			  }>
			| IProduct
	) => {
		setNewProduct(
			product as React.SetStateAction<{
				produto_id: number;
				nome: string;
				descricao: string;
				preco: string;
				categoria_id: number;
				estoque: string;
				unidade: string;
				ativo: number;
				imagemUrl: string;
			}>
		);
		setIsEditing(true);
	};

	const cancelEdit = () => {
		resetForm();
	};

	return (
		<main className={styles.main}>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className={styles.header}>
				<div className={styles.titleContainer}>
					<h1 className={styles.mainTitle}>Gerenciamento de Produtos</h1>
				</div>
				<form onSubmit={handleSubmit} className={styles.form}>
					<input
						type="text"
						name="nome"
						value={newProduct.nome}
						onChange={handleInputChange}
						placeholder="Nome do Produto"
						maxLength={20}
						className={styles.input}
					/>
					<input
						type="text"
						name="descricao"
						value={newProduct.descricao}
						onChange={handleInputChange}
						placeholder="Descrição"
						maxLength={25}
						className={styles.input}
					/>
					<input
						type="number"
						name="preco"
						value={newProduct.preco}
						onChange={handleInputChange}
						placeholder="Valor em R$"
						maxLength={10}
						className={styles.input}
						min={0}
						step={0.01}
					/>
					<select
						name="categoria_id"
						value={newProduct.categoria_id || ""}
						onChange={handleInputChange}
						className={styles.select}
					>
						<option value="">Selecione uma Categoria</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
					<div className={styles.quantityAndUnit}>
						<input
							type="number"
							name="estoque"
							value={newProduct.estoque}
							onChange={handleInputChange}
							placeholder="Quantidade em KG/G/UN"
							className={styles.quantityInput}
							min={0}
						/>
						<select
							name="unidade"
							value={newProduct.unidade || ""}
							onChange={handleInputChange}
							className={styles.unitSelect}
						>
							<option value="">Unidade ou Kg</option>
							{units.map((unit) => (
								<option key={unit.id} value={unit.name}>
									{unit.name}
								</option>
							))}
						</select>
					</div>
					<input
						type="file"
						name="file"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) {
								setFile(file);
								setFileName(file.name);
							}
						}}
						className={styles.clear_right}
					/>

					{isEditing ? (
						<>
							<button type="submit" className={styles.updateButton}>
								Atualizar
							</button>
							<button
								type="button"
								onClick={cancelEdit}
								className={styles.cancelButton}
							>
								Cancelar
							</button>
						</>
					) : (
						<button type="submit" className={styles.addButton}>
							Adicionar
						</button>
					)}
				</form>
			</div>

			<div className={styles.productList}>
				{products.length > 0 ? (
					products.map((product) => (
						<div key={product.produto_id} className={styles.productItem}>
							<h3>
								{product.nome.length > 20
									? product.nome.substring(0, 20) + "..."
									: product.nome}
							</h3>
							<p className={styles.productDescription}>
								{product.descricao.length > 25
									? product.descricao.substring(0, 25) + "..."
									: product.descricao}
							</p>
							<p>Preço: R$ {Number(product.preco).toFixed(2)}</p>
							<p>
								Categoria:{" "}
								{categories.find(
									(c) => c.id === (product.categoria_id?.toString() || "")
								)?.name || "Sem categoria"}
							</p>
							<p>
								Estoque: {product.estoque}{" "}
								{units.find((u) => u.name === String(product.unidade))?.name ||
									"Sem unidade"}
							</p>
							<div className={styles.productActions}>
								<button
									onClick={() => editProduct(product)}
									className={styles.editButton}
									title="Editar"
								>
									<FaPencilAlt />
								</button>
								<button
									onClick={async () => {
										try {
											await deleteProduct(product.produto_id);
											toast.success("Produto removido com sucesso!");
											fetchProducts();
										} catch (error) {
											toast.error("Erro ao remover o produto: " + error);
										}
									}}
									className={styles.removeButton}
									title="Remover"
								>
									<FaTrashAlt />
								</button>
							</div>
						</div>
					))
				) : (
					<p>Nenhum produto cadastrado.</p>
				)}
			</div>
		</main>
	);
}
