import axios, { AxiosResponse } from 'axios';

interface User {
    email: string;
    password: string;
    roles: string[];
}

function generateUniqueEmail(): string {
    const timestamp = Date.now();
    return `daniel_${timestamp}@solano.com`;
}

async function createUser(): Promise<User> {
    const userData: User = {
        email: generateUniqueEmail(),
        password: 'password123',
        roles: ['ROLE_ADMIN'],
    };

    try {
        const response: AxiosResponse = await axios.post('https://api.club-administration.qa.qubika.com/api/auth/register', userData);
        return {
            ...response.data,
            password: 'password123' // I'm hardcoding the password response because the API has a bug. It's returning a random password that is NOT working at all. 
        };
    } catch (error) {
        console.error('Error while creating the user', error);
        throw error;
    }
}

export { createUser };