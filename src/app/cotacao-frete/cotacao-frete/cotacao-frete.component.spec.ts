import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotacaoFreteComponent } from './cotacao-frete.component';

describe('CotacaoFreteComponent', () => {
  let component: CotacaoFreteComponent;
  let fixture: ComponentFixture<CotacaoFreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotacaoFreteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotacaoFreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
