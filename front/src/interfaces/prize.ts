export interface Prize {
    _id: string;
    price: number;
    description: string;
    name: string;
    quantity: number;
    image: string;
}

export type CreatePrize = Omit<Prize, "_id">;
