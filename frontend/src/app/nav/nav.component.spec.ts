/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpModule } from '@angular/http';


import { ModalModule } from 'ng2-bootstrap/modal';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertModule } from 'ng2-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [
        ModalModule.forRoot(),
        RouterTestingModule,
        ReactiveFormsModule,
        HttpModule,
        AlertModule.forRoot(),
      ],
      providers: [
        AuthService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
