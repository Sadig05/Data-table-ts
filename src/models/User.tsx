export interface IUser{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;    
}

export interface IFilter{
    _page?: number;
    _limit? : number;
    q?: string;
    first_name?: string;
    gender?: string;
}