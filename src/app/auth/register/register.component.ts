import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { FormGroup, FormControl, Validators , FormBuilder} from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FirestoreService],
})
export class RegisterComponent implements OnInit {

  public newClientForm = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Apellido: new FormControl('', Validators.required),
    Edad: new FormControl('', Validators.required),
    Correo: new FormControl('', Validators.required),
    Contraseña: new FormControl('', Validators.required),
    Contraseña2: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  constructor(private firestoreservice: FirestoreService, private router: Router) { }

  ngOnInit(): void {
  }
  public newClient(form) {
    let activo = true;
    let f = new Date();
    let fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    //console.log(`Status: ${this.currentStatus}`);
    let data = {
      Nombre: form.Nombre,
      Apellido: form.Apellido,
      Edad: form.Edad,
      Correo: form.Correo,
      Activo: activo,
      DiaInscripcion: fecha,
    }
    let data2 = {
      Correo: form.Correo,
      Contraseña : form.Contraseña
    }
    this.firestoreservice.createClient(data).then(() => {
      console.log('Documento creado exitosamente');
      this.newClientForm.setValue({
        Nombre: '',
        Apellido: '',
        Edad: '',
        Correo: '',
        Contraseña: '',
        Contraseña2: '',
        id: '',
      });
    }, (error) => {
      console.error(error);
    });

    console.log(data2.Correo, data2.Contraseña);
    const user = this.firestoreservice.register(data2.Correo, data2.Contraseña);
    if(user){
      console.log(user);
      this.router.navigate(['/home']);
    }
  }

}
