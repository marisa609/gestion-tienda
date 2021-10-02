//Para crear en direcciones un Array de dirección
export interface Direccion {
    _id?: string,
    calle: string,
    localidad: string,
    provincia: string,
    cp: string,
}

export interface Usuario {
    //Con la interrogacion decimos que es opcional
    _id?: string,
    nombre: string,
    apellido: string,
    dni: string,
    email: string,
    username: string,
    clave: string,
    tipoUsuario: UserType,
    direcciones: Array<Direccion>,
}

//Enumerado para el tipo
export enum UserType {
    ADMIN = "Administrador",
    CLIENT = "Cliente"
}