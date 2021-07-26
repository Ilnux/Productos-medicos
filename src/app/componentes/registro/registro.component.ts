import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductosService} from "../../servicios/productos.service";
import {ReferenciaInterface} from "../../interfaces/producto.interface";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formRegistro!: FormGroup;
  ocultarReferencia: boolean = false;
  referenciaLista: ReferenciaInterface [] = [];
  fechaMinima!: Date;


  constructor(private fb: FormBuilder,
              private productoServicios: ProductosService,
              private router: Router,
              private datePipe: DatePipe) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.peticionInicial();
    this.deshabilitarFechasAtras();
  }

  deshabilitarFechasAtras(): void {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = this.datePipe.transform(Date.now(), 'dd')
    this.fechaMinima = new Date(currentYear, currentMonth, Number(currentDay));
  }

  peticionInicial(): void {
    this.productoServicios.obtenerReferenciasTodas()
      .subscribe(data => {
        this.referenciaLista = data;
      });
  }

  guardar(): void {
    if (this.formRegistro.invalid)
      return;
    this.productoServicios.registroProducto(this.formRegistro.get('fechaVencimiento')!.value,
      this.formRegistro.get('cantidad')!.value,
      this.formRegistro.get('productoMedico')!.value)
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
            text: 'Producto registrado con exito'
          })
            .then(res => {
              if (res.isConfirmed)
                window.location.reload();
            });
        }
      });
  }

  guardarReferencia(): void {
    if (this.formRegistro.get('numeroReferencia')!.value === ''
      || this.formRegistro.get('nombreProducto')!.value === ''
      || this.formRegistro.get('nombreLaboratorio')!.value === '') {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: 'Error!',
        text: 'Llenar todos los campos por favor'
      });

    } else {
      this.productoServicios.registrarReferencia(this.formRegistro.get('numeroReferencia')!.value,
        this.formRegistro.get('nombreProducto')!.value,
        this.formRegistro.get('nombreLaboratorio')!.value).subscribe(() => {
        Swal.fire({
          allowOutsideClick: false,
          icon: "success",
          title: 'Bien!',
          text: 'Referencia registrada'
        })
          .then(res => {
            if (res.isConfirmed)
              window.location.reload();
          });
      });
    }
  }

  crearFormulario(): void {
    this.formRegistro = this.fb.group({
      'productoMedico': ['', [Validators.required]],
      'numeroReferencia': [''],
      'nombreProducto': ['',],
      'nombreLaboratorio': [''],
      'fechaVencimiento': ['', [Validators.required]],
      'cantidad': ['', [Validators.required]],
    });
  }
}
