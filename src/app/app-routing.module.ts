import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CotacaoCadastroComponent } from "./cotacao-cadastro/cotacao-cadastro/cotacao-cadastro.component";
import { CotacaoFreteComponent } from "./cotacao-frete/cotacao-frete/cotacao-frete.component";
import { CotacaoComponent } from "./cotacao/cotacao/cotacao.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'index', component: CotacaoComponent },
      { path: 'cotacao-cadastro', component: CotacaoCadastroComponent },
      { path: 'cotacao-frete', component: CotacaoFreteComponent }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
    
  ],
  exports: [RouterModule]
})
export class appRoutingModule { }
