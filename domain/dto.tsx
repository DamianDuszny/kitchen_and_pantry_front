export interface productStock {
    id: number;
    amount: number;
    created_at: string;
    description: description;
    expiration_date: string | null;
    net_weight: number | null;
    price: number | null;
    unit_weight: number | null;
    users_id: number | null;

    products_ean: products_ean;

}

export interface description {
    company: string | null;
    id: number | null;
    img_url: string | null;
    name: string;
    users_products_stock_id: number | null;
}

export interface products_ean {
    ean: string;
    id: number;
}

export interface response {
    message: string;
    success: boolean;
    errors: string[];
}