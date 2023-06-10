export interface ContractData {
    _id: string;
    position: string;
    userId: string;
    entrepriseId: string;
    status: string;
    startDate: Date;
    endDate?: Date;
    createdAt: Date;
}

export interface CreateContractDto {
    position: string;
    userId: string;
    entrepriseId: string;
    startDate: string;
    endDate: string;
}
