import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotacaoCadastroComponent } from './cotacao-cadastro.component';

describe('CotacaoCadastroComponent', () => {
  let component: CotacaoCadastroComponent;
  let fixture: ComponentFixture<CotacaoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotacaoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotacaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
