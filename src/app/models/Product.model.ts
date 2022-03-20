export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    title: string;
    price: number; 
    images: string[];
    description: string ;
    category: Category;
}


export interface CreateProductDTO extends Omit<Product, "id" | "category"> {
    categoryID: number;
}

// Para flexibilizar los campos  que se enviaran al back para actualizar, se usa el "?",
// asi description?: string, pero como estoy extendiendo se usa el Partial.

// Basicamente puedo enviar todos los dats, o solo una pequeña porcion
export interface UpdateProductDTO extends Partial<CreateProductDTO>{}