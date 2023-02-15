import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserHelper } from 'src/app/shared/helpers/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService , AuthService]
})
export class LoginComponent implements OnInit {

  submitting = false;
  loginForm = this.formBuilder.group({
    login: new FormControl('', [ Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  constructor(private formBuilder: FormBuilder, private router: Router,
              private messageService: MessageService, 
              private authService: AuthService) { }

  ngOnInit(): void {
    const user = UserHelper.getUser();
    if(user != null){
      this.messageService.add({ 
          severity: 'info', 
          summary: 'information', 
          detail: 'vous etes deja connecté', 
          life: 3000 
        });
      this.router.navigate(['/admin']);
    }
  }

  login(): void{
    this.submitting = true;
    // todo::call the service request
      this.authService.login({
        login: this.loginForm.value.login,
        password: this.loginForm.value.password
      }).toPromise().then((data: any) => {
        this.submitting = false;
        UserHelper.connect(data);
        this.messageService.add({ 
          severity: 'success', 
          summary: 'success', 
          detail: 'login success ', 
          life: 3000 
        });
        this.router.navigate(['/admin']);
      },
      (res) => {
        this.submitting = false;
        this.messageService.add({ 
          severity: 'error', 
          summary: 'erreur', 
          detail: 'verifier votre login ou votre mot de passe', 
          life: 3000 
        });

      });
  }

}
