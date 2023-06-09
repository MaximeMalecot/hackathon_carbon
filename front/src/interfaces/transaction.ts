export interface Transaction {
    _id: string;
    userId: string;
    price: 10;
    createdAt: string;
    prize: {
        _id: string;
        name: string;
        price: number;
        quantity: number;
        image: string;
    };
}
