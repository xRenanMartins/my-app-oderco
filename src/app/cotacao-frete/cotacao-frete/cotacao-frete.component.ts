import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CotacaoService } from 'src/app/_services/cotacao.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-cotacao-frete',
  templateUrl: './cotacao-frete.component.html',
  styleUrls: ['./cotacao-frete.component.css']
})
export class CotacaoFreteComponent implements OnInit {

  public melhoresCotacoes: any
  public transportadoras: any
  public cotacoes: any
  public formCotacaoFrete: FormGroup
  @Inject(DOCUMENT) private document: Document

  constructor(
    private sCotacao: CotacaoService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.formCotacaoFrete = this.fb.group({
      uf: new FormControl('', Validators.required),
      valor_pedido: new FormControl('0', Validators.required)
    })

    this.listaCotacoes()
    this.listaTransportadoras()
  }

  public listaTransportadoras() {
    this.sCotacao.listaTransportadoras().subscribe(dados => {
      this.transportadoras = dados
    }, e => {
      let erro = (e.error.Code == "error" || e.error.Code == "401") ? e.error.label : 'Ops! Houve um erro inesperado.';
      Swal.fire("Ops!", erro, "error");
    })
  }

  public listaCotacoes() {
    this.sCotacao.listaCotacoes().subscribe(dados => {
      this.cotacoes = dados
    }, e => {
      let erro = (e.error.Code == "error" || e.error.Code == "401") ? e.error.label : 'Ops! Houve um erro inesperado.';
      Swal.fire("Ops!", erro, "error");
    })
  }

  public cotacaoFrete() {
    let checaErro = this.checkErros(this.formCotacaoFrete.value)
    if (checaErro == true) {
      this.sCotacao.cotaFrete(this.formCotacaoFrete.value).subscribe(dados => {
        this.melhoresCotacoes = dados
        Swal.fire('Sucesso', 'Cotação realizada com sucesso!', 'success')
        
        this.melhoresCotacoes.forEach(element => {
          this.transportadoras.forEach(t => {
            if (element.transportadora_id === t.id) {
              element.transportadora_id = t.nome
            }
          })
        });
      }, e => {
        let erro = (e.error.Code == "error" || e.error.Code == "401") ? e.error.label : 'Ops! Houve um erro inesperado.';
        Swal.fire("Ops!", erro, "error");
      }
      )
    }else {
      return Swal.fire({ title: 'Ops!', text: this.checkErros(this.formCotacaoFrete.value), icon: 'warning'})
    }
  }

  checkErros(form) {
    console.log(form)
    let message

    if (form.uf == '') {
      message = 'O select UF é obrigatório!'
    } else if (form.valor_pedido == null) {
      message = 'O campo Percentual cotação é obrigatório!'
    } else {
      message = true
    }

    if (message === true) {
      return true;
    } else {
      return message
    }
  }

}
