import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductoInterface, ReferenciaInterface} from "../interfaces/producto.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  URL: string = "https://softeclon.com/api/producto.php?";

  constructor(private http: HttpClient) {
  }

  obtenerReferenciasTodas(): Observable<ReferenciaInterface[]> {
    return this.http.get<ReferenciaInterface[]>(`${this.URL}funcion=todo&fecha=2021-07-13`);
  }

  obtenerProductos(fecha: string | null): Observable<ProductoInterface[]> {
    return this.http.get<ProductoInterface[]>(`${this.URL}funcion=todos&fecha=${fecha}`);
  }

  registrarReferencia(numeroRef: string, nombreRef: string, laboratorioRef: string): Observable<any> {
    const datosReferencia = {
      referenciaProducto: numeroRef,
      nombreProducto: nombreRef,
      laboratorioProducto: laboratorioRef
    }
    return this.http.post(`${this.URL}funcion=referencia`, datosReferencia);
  }

  registroProducto(fechaVencimiento: string, cantidad: number, referenciaProducto: string): Observable<any> {
    const datosProductos = {
      fechaVencimiento,
      cantidad,
      referenciaProducto
    }
    return this.http.post(`${this.URL}`, datosProductos);
  }

  actualizarProducto(id: number, fechaVencimiento: Date, cantidad: number): Observable<any> {
    const datosPut = {
      'fechaVencimiento': fechaVencimiento,
      'cantidad': cantidad
    }
    return this.http.put(`${this.URL}id_producto=${id}`, datosPut)
  }
}
