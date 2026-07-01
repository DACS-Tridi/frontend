/**
 * Interfaz que define la estructura de la respuesta de la API
 */


export interface IResponse {
    error : boolean ;
    errorCode: string;
    errorDescription: string;
    data: any;
}
export interface ITestResponse{
    id: number;
    name: string;
    age: number;
    city: string;
}