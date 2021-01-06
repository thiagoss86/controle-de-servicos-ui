import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente = new Cliente();
  mensagemSucesso!: string;
  mensagemErro!: string;
  
  constructor(
    private service: ClientesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  novoCadastro() {
    this.router.navigate(['/clientes/form']);
  }

  preDelete(cliente: Cliente) {
    this.clienteSelecionado = cliente; 
  }

  deletarCliente() {
    this.service
        .deletar(this.clienteSelecionado)
        .subscribe( 
          response => {
            this.mensagemSucesso = 'Cliente deletao com sucesso!';
            this.carregarClientes();
          },
          errorResponse => this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.'
          )
  }

  carregarClientes() {
    this.service.getClientes()
                .subscribe( response => this.clientes = response ); 
  }

}
