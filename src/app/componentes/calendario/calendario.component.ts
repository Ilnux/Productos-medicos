import {Component, OnInit} from '@angular/core';
import {ProductosService} from "../../servicios/productos.service";

import {CalendarOptions, EventInput} from '@fullcalendar/angular';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  fechas: string[] = [];
  calendarOptions!: CalendarOptions;

  constructor(private serviciosProductos: ProductosService) {
  }

  ngOnInit(): void {
    this.consumoInicial();
    this.calendario();
  }

  calendario(){
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      events: this.obtenerEventos()
    };
  }

  obtenerEventos(): EventInput[] {
    let fechasUnicas = [... new Set(this.fechas)];
    return fechasUnicas.map(fecha => {
      var numero = 0;
      this.fechas.forEach(fechaGeneral => {
        numero = fecha === fechaGeneral? numero+1 : numero;
      });
      return { title: numero.toString(), start: fecha };
    })
  }

  consumoInicial(): void {
    this.serviciosProductos.obtenerFechasProductos()
      .subscribe(data => {
        this.fechas = data.map(dato => dato.fecha_ingreso_producto);
        this.calendario();
      })
  }


}
