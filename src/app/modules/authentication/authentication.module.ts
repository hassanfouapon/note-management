import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/services/auth/auth.service';
import {PasswordModule} from 'primeng/password';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    PasswordModule
  ],
  providers: [AuthService]
})
export class AuthenticationModule { }
