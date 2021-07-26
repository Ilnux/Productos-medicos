export interface ReferenciaInterface {
  referencia_producto: string;
  nombre_producto: string;
  laboratorio_producto: string;
}

export interface ProductoInterface {
  id_producto_ingreso: number;
  referencia_producto: string;
  nombre_producto: string;
  laboratorio_producto: string;
  fecha_vencimiento_producto: Date
  cantidad_producto: string;
}
