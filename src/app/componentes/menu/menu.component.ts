import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  eventoRegistro: string = '';
  eventoConsulta: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  evento(tipoImg: string) {
    if (tipoImg === 'registro') {
      const item: HTMLElement | null = document.getElementById('imgRegistro');
      // @ts-ignore
      if (item.classList.contains('animate__bounce')) {
        this.eventoRegistro = "animate__animated animate__pulse";
      } else {
        this.eventoRegistro = "animate__animated animate__bounce";
      }
    } else {
      const item: HTMLElement | null = document.getElementById('imgConsulta');
      // @ts-ignore
      if (item.classList.contains('animate__bounce')) {
        this.eventoConsulta = "animate__animated animate__pulse";
      } else {
        this.eventoConsulta = "animate__animated animate__bounce";
      }
    }
  }
}
