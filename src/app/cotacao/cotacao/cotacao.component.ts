import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CotacaoService } from 'src/app/_services/cotacao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotacao',
  templateUrl: './cotacao.component.html',
  styleUrls: ['./cotacao.component.css']
})
export class CotacaoComponent implements OnInit {

  public cotacoes: any
  public transportadoras: any

  constructor(
    private sCotacao: CotacaoService
  ) { }

  ngOnInit(): void {
    this.listaTransportadoras()
    this.listaCotacoes()
  }

  public listaCotacoes() {
    this.sCotacao.listaCotacoes().subscribe(dados => {
      this.cotacoes = dados

      this.cotacoes.forEach(element => {
        this.transportadoras.forEach(t => {
          if (element.transportadora_id === t.id) {
            element.transportadora_id = t.nome
          }
        })
      });
    }, e => {
      let erro = (e.error.Code == "error" || e.error.Code == "401") ? e.error.label : 'Ops! Houve um erro inesperado.';
      Swal.fire("Ops!", erro, "error");
    })
  }

  public listaTransportadoras() {
    this.sCotacao.listaTransportadoras().subscribe(dados => {
      this.transportadoras = dados
      
    }, e => {
      let erro = (e.error.Code == "error" || e.error.Code == "401") ? e.error.label : 'Ops! Houve um erro inesperado.';
      Swal.fire("Ops!", erro, "error");
    })
  }

}
