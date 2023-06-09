export interface UpdateContentDto {
    _id?: string;
    data: string | File;
    order: number;
    type: string;
}
