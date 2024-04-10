import { User } from "./User"

export class Product{
    id_producto?:number
    titulo:string
    precio_moneda_virtual:number
    descripcion:string
    id_estado_producto?:number   
    fecha_publicacion?:Date    
    tipo_condicion:number       
    id_publicador?:number        
    categorias:any[]
    images:any
    user:User
    condicion:string
}