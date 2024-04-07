import { User } from "./User"

export class BarterProduct{
    id_producto_trueque?:number
    titulo:string
    equivalente_moneda_virtual:number
    equivalente_moneda_local:number
    descripcion_producto:string
    descripcion_solicitud:string
    id_estado?:number   
    fecha_publicacion?:Date    
    id_condicion:number       
    id_publicador?:number        
    categorias:any[]
    images:any
    condicion:string
    user:User
}
