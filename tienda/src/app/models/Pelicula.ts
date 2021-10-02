export interface Pelicula {
    //Con la interrogacion decimos que es opcional
    _id?: string,
    titulo: string,
    generos: Array<string>,
    productora: string
}