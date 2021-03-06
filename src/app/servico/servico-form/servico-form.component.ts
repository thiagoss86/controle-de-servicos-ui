import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoService } from 'src/app/servico.service';
import { Servico } from '../servico';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.css']
})
export class ServicoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: Servico;
  success: boolean = false;
  errors: String[] = [];

  constructor(
    private service: ServicoService,
    private clientesService: ClientesService
    ) {
      this.servico = new Servico();
     }

  ngOnInit(): void {
    this.clientesService
        .getClientes()
        .subscribe(response => this.clientes = response);
  }

  onSubmit() {
    this.service
        .salvar(this.servico)
        .subscribe( response => {
          this.success = true;
          this.errors = [];
          this.servico = new Servico();
        }, errorResponse => {
            this.errors = errorResponse.error.errors;
            this.success = false;
        });
  }
}
