import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CotacaoComponent } from './cotacao/cotacao/cotacao.component';
import { CotacaoFreteComponent } from './cotacao-frete/cotacao-frete/cotacao-frete.component';
import { CotacaoCadastroComponent } from './cotacao-cadastro/cotacao-cadastro/cotacao-cadastro.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CotacaoService } from './_services/cotacao.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CotacaoComponent,
    CotacaoCadastroComponent,
    CotacaoFreteComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    appRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    appRoutingModule
  ],
  providers: [
    CotacaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
