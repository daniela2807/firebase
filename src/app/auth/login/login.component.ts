import { FirestoreService } from './../../services/firestore/firestore.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FirestoreService]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    Correo: new FormControl(''),
    Contraseña: new FormControl(''),
  });


  constructor(private authSvc: FirestoreService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin() {
    const { Correo, Contraseña } = this.loginForm.value;
    //console.log(this.loginForm.value);
    try {
      const user = await this.authSvc.login(Correo, Contraseña);
      //console.log(user)
      if (Correo === 'admin@hotmail.com' && user) {
        this.router.navigate(['/admin']);
      }
      else if (user) {
        //redirect to homepage
        this.router.navigate(['/home']);
      }
      else {
        document.getElementById('Comprobar').innerText = "Cuenta no encontrada, verifica";
      }
    }
    catch (error) {
      console.log(error);
    }
    this.authSvc.login(Correo, Contraseña);
    //console.log("Form->", this.loginForm.value);
  }

  Restablecer(correo: string) {
    console.log(correo);
    this.authSvc.afAuth.sendPasswordResetEmail(correo).then(function(){
      console.log("email enviado a"+correo);
      //email enviado
    }).catch(function(error){

    });
  }

}
