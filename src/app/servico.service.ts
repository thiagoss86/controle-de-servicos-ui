import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servico } from './servico/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  apiURL: string = environment.apiURLBase + '/api/servicos'

  constructor(private http: HttpClient) { }

  salvar(servico: Servico) : Observable<Servico> {
    return this.http.post<Servico>(this.apiURL, servico);
  }
}
