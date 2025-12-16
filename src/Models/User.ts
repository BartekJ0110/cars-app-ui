export interface UserDto{
    displayname: string;
    token: string;
    username: string;
}

export interface LoginDto{
    email: string;
    password: string;
}

export interface RegisterDto{
    email: string;
    password: string;
    displayname: string;
    username: string;
}