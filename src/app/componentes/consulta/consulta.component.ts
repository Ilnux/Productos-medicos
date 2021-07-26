import {Component, OnInit} from '@angular/core';
import {ProductosService} from "../../servicios/productos.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ProductoInterface} from "../../interfaces/producto.interface";
import Swal from "sweetalert2";

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  formConsulta!: FormGroup;
  listaProducto: ProductoInterface[] = [];
  producto!: ProductoInterface;
  activarTabla: boolean = false;
  fechaMinima!: Date;
  mostrarActualizar: boolean = false;
  mostrarSubmit: boolean = false;


  constructor(private servicioProductos: ProductosService,
              private fb: FormBuilder,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.crearFormConsulta();
    this.deshabilitarFechasAtras()
  }

  deshabilitarFechasAtras(): void {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = this.datePipe.transform(Date.now(), 'dd')
    this.fechaMinima = new Date(currentYear, currentMonth, Number(currentDay));
  }


  consultar() {
    if (this.formConsulta.get('fechaIngreso')?.value === '') {
      Swal.fire({
        allowOutsideClick: false,
        icon: "info",
        title: 'Atencion!',
        text: 'Ingresar una fecha por favor.'
      });
    } else {
      const fecha = this.formConsulta.get('fechaIngreso')?.value;
      this.servicioProductos.obtenerProductos(this.datePipe.transform(fecha, 'yyyy-MM-dd'))
        .subscribe(data => {
          this.listaProducto = data;
          this.activarTabla = true;
        });
    }
    this.mostrarActualizar = false;
  }

  crearFormConsulta(): void {
    this.formConsulta = this.fb.group({
      'fechaIngreso': [''],
      'idReferencia': [{value: '', disabled: true}],
      'numeroReferencia': [{value: '', disabled: true}],
      'nombreReferencia': [{value: '', disabled: true}],
      'laboratorio': [{value: '', disabled: true}],
      'fechaVenci': ['', Validators.required],
      'cantidad': ['', Validators.required],
    });
  }

  enviarDatos(datos: ProductoInterface) {
    this.formConsulta.get('idReferencia')?.setValue(datos.id_producto_ingreso);
    this.formConsulta.get('numeroReferencia')?.setValue(datos.referencia_producto);
    this.formConsulta.get('nombreReferencia')?.setValue(datos.nombre_producto);
    this.formConsulta.get('laboratorio')?.setValue(datos.laboratorio_producto);
    this.formConsulta.get('fechaVenci')?.setValue(datos.fecha_vencimiento_producto);
    this.formConsulta.get('cantidad')?.setValue(datos.cantidad_producto);
    this.activarTabla = false;
    this.mostrarActualizar = true;

    if (this.formConsulta.valid) {
      this.mostrarSubmit = true;
    }
  }


  actualizar() {
    if (this.formConsulta.invalid) {
      return;
    }
    this.producto = this.formConsulta.value;
    this.servicioProductos.actualizarProducto(this.formConsulta.get('idReferencia')?.value,
      this.formConsulta.get('fechaVenci')?.value,
      this.formConsulta.get('cantidad')?.value)
      .subscribe(resp => {
        if (resp.respuesta === 'Error') {
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: 'Error!',
            text: `${resp.mensaje}`
          });
        } else {
          Swal.fire({
            allowOutsideClick: false,
            icon: "success",
            title: 'Bien!',
            text: `${resp.mensaje}`
          }).then(rs => {
            if (rs.isConfirmed) {
              window.location.reload();
            }
          })
        }
      });
  }
}
