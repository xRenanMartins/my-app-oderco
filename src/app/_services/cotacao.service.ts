import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment, api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CotacaoService {
  public url = `${api.urlBase}`
  constructor(private http: HttpClient) { }
  public httpOptions ={
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
  }   

  listaTransportadoras() {
    return this.http.get<any>(`${this.url}/transportadora`,this.httpOptions)
      .pipe(map(dados => {
        return dados
      }))
  }

  listaCotacoes() {
    return this.http.get<any>(`${this.url}/cotacao`,this.httpOptions)
      .pipe(map(dados => {
        return dados
      }))
  }

  cadastraCotacao(form: any): Observable<any> {
    return this.http.post<any>(`${this.url}/cotacao`,form, this.httpOptions)
      .pipe(map(dados => {
        return dados;
      }))
  }

  cotaFrete(form: any): Observable<any> {
    return this.http.put<any>(`${this.url}/cotacao`,form, this.httpOptions)
      .pipe(map(dados => {
        return dados;
      }))
  }
}

