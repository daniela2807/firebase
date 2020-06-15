import { FirestoreService } from './../../services/firestore/firestore.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FirestoreService]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    Correo : new FormControl(''),
    Contraseña: new FormControl(''),
  });

  constructor(private authSvc: FirestoreService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin(){
    const {Correo, Contraseña} = this.loginForm.value;
    //console.log(this.loginForm.value);
    try{
      const user = await this.authSvc.login(Correo, Contraseña);
      if(Correo === 'admin@hotmail.com' && user){
        this.router.navigate(['/admin']);
      }
      else if(user){
        //redirect to homepage
        this.router.navigate(['/home']);
      }
    }
    catch(error){
      console.log(error);
    }
    this.authSvc.login(Correo, Contraseña);
    //console.log("Form->", this.loginForm.value);
  }

}
