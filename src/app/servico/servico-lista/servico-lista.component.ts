import { Component, OnInit } from '@angular/core';
import { ServicoService } from 'src/app/servico.service';
import { ServicoBusca } from './servico-busca';

@Component({
  selector: 'app-servico-lista',
  templateUrl: './servico-lista.component.html',
  styleUrls: ['./servico-lista.component.css']
})
export class ServicoListaComponent implements OnInit {

  nome!: string;
  mes!: number;
  meses: number [] = [];
  lista!: ServicoBusca[]; 
  menssagem!: string;

  constructor(private service: ServicoService) { 
    this.meses = [1,2,3,4,5,6,7,8,9,10,11];
  }

  ngOnInit(): void {
  }

  consultar() {
    this.service.buscar(this.nome, this.mes)
                .subscribe(response => {
                  this.lista = response;
                  if(this.lista.length <= 0) {
                    this.menssagem = "Nenhum registro encontrado.";
                  }else {
                    this.menssagem = '';
                  }
                });
  }

}
