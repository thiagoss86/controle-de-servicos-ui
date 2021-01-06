import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ServicoFormComponent } from './servico-form/servico-form.component';
import { ServicoListaComponent } from './servico-lista/servico-lista.component';

const routes: Routes = [
  { path: 'servicos', component: LayoutComponent, children: [
    { path: 'form', component: ServicoFormComponent},
    { path: 'lista', component: ServicoListaComponent},
    { path: '', redirectTo: '/servicos/lista', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoRoutingModule { }
