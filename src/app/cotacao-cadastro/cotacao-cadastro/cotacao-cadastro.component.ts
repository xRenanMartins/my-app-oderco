import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CotacaoService } from 'src/app/_services/cotacao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotacao-cadastro',
  templateUrl: './cotacao-cadastro.component.html',
  styleUrls: ['./cotacao-cadastro.component.css']
})
export class CotacaoCadastroComponent implements OnInit {

  public transportadoras: any
  public formCadastroCotacao: FormGroup

  constructor(
    private sCotacao: CotacaoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formCadastroCotacao = this.fb.group({
      transportadora_id: new FormControl('', Validators.required),
      uf: new FormControl('', Validators.required),
      percentual_cotacao: new FormControl('0', Validators.required),
      valor_extra: new FormControl('0', Validators.required)
    })

    this.listaTransportadoras()
  }

  public listaTransportadoras() {
    this.sCotacao.listaTransportadoras().subscribe(dados => {
      this.transportadoras = dados
    }, e => {
      let erro = (e.error.Code == "error" || e.error.Code == "401") ? e.error.message : 'Ops! Houve um erro inesperado.';
      Swal.fire("Ops!", erro, "error");
    })
  }

  public cadastrarCotacao() {
    let checaErro = this.checkErros(this.formCadastroCotacao.value)

    if (checaErro == true) {
      this.sCotacao.cadastraCotacao(this.formCadastroCotacao.value).subscribe(dados => {
        Swal.fire({title: 'Sucesso', html:'Cotação cadastrada com sucesso!', icon: 'success', timer: 2000}).then(() =>{
          window.location.reload()
        })
      }, e => {
        let erro = (e.error.Code == "error" || e.status == "422") ? e.error.errors.uf[0] : 'Ops! Houve um erro inesperado.';
        Swal.fire("Ops!", erro, "error");
      }
      )
    }else {
      return Swal.fire({ title: 'Ops!', text: this.checkErros(this.formCadastroCotacao.value), icon: 'warning'})
    }
  }

  checkErros(form) {
    let message

    if (form.transportadora_id == '') {
      message = 'O select Transportadora é obrigatório!'
    } else if (form.uf == '') {
      message = 'O select UF é obrigatório!'
    } else if (form.percentual_cotacao == null) {
      message = 'O campo Percentual cotação é obrigatório!'
    } else if (form.valor_extra == null) {
      message = 'O campo Valor extra é obrigatório!'
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
