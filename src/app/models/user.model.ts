export interface User{
    id: string; 
    name: string;
    email: string;
    password: string 
}


export interface  CreateUserDTO extends Omit<User, 'id'>{}