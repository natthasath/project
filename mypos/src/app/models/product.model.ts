export class ProductResponse {
    result:  Product[];
    message: string;
}

export class Product {
    productId: number;
    name:      string;
    image:     string;
    stock:     number;
    price:     number;
    created:   Date;
}
