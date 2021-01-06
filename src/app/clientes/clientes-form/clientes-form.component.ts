import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[] = [];
  id!: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { 
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
      this.id = urlParams['id'];
      
      if(this.id){
        this.service
          .getClientePorId(this.id)
          .subscribe( 
            response => this.cliente = response,
            errorResponse => this.cliente = new Cliente()
          );
      }
    });
  }

  onSubmit() {
    if(this.id){
      this.service.atualizar(this.cliente)
          .subscribe( response => {
            this.success = true;
            this.errors = [];
          }, errorResponse => {
            this.errors = ['Erro ao tentar atualizar o ciente.']
            this.success = false;
          })
    }else {
      this.service.salvar(this.cliente)
        .subscribe( response => {
          this.success = true;
          this.errors = [];
          this.cliente = response;
        }, errorResponse => {
            this.errors = errorResponse.error.errors;
            this.success = false;
        });
    }
  }

  voltarListagem() {
    this.router.navigate(['/clientes/lista']);
  }

}
