export interface Project {
    id: number
    name: string
    state: string
    created_at: string
}
export interface Member {
    first_name: string,
    last_name: string,
    cedula: number,
    email: string,
    description: string,
}

export interface Person {
    first_name: string,
    last_name: string,
    cedula: number,
}