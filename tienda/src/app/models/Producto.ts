import { Categoria } from "./Categoria";

export interface Producto {
    //Con la interrogacion decimos que es opcional
    _id?: string,
    referencia: string,
    titulo: string,
    descripcion: string,
    precio: number,
    categoriaId: Categoria | string,
}