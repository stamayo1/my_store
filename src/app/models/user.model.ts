export interface User{
    id: string; 
    name: string;
    email: string;
    password: string; 
    role: 'costumer' | 'admin'; 
}


export interface  CreateUserDTO extends Omit<User, 'id'>{}