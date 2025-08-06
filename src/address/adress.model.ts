export interface Address {
    id: number;
    uid: string;
    country: string;
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    zipCode: string;
}