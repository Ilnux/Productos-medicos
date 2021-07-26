import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuComponent} from "./componentes/menu/menu.component";
import {RegistroComponent} from "./componentes/registro/registro.component";
import {ConsultaComponent} from "./componentes/consulta/consulta.component";
import {CalendarioComponent} from "./componentes/calendario/calendario.component";

const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'consulta', component: ConsultaComponent},
  {path: 'calendario', component: CalendarioComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'menu'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
