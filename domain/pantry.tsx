export interface pantry
{
    id: number,
    description: string,
    name: string,

    users: user[]
}

export interface user
{
    id: number,
    user_role_desc: string,
    first_name: string,
    last_name: string
}