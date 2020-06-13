import { FirestoreService } from './../services/firestore/firestore.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes = [];
  public documentId = null;
  public newClientForm = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Apellido: new FormControl('', Validators.required),
    Edad: new FormControl('', Validators.required),
    Correo: new FormControl('', Validators.required),
    Contraseña: new FormControl('', Validators.required),
    Contraseña2: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  constructor(private firestoreservice: FirestoreService) {
  }

  ngOnInit() {
    this.firestoreservice.getClientes().subscribe((clienteSnapshot) => {
      this.clientes = [];
      clienteSnapshot.forEach((ClienteData: any) => {
        let client =
        {
          id: ClienteData.payload.doc.id,
          data: ClienteData.payload.doc.data(),
        }
        //client.data.DiaInscripcion = new Date(client.data.DiaInscripcion * 1000).toLocaleString();
        this.clientes.push(client);
      });
    });
  }

  public crearUsuario(form){
    
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
    this.firestoreservice.createClient(data).then(() => {
      console.log('Documento creado exitosamente');
      this.newClientForm.setValue({
        Nombre: '',
        Apellido: '',
        Edad: '',
        Correo: '',
        Activo: '',
        DiaInscripcion: '',
        id: '',
      });
    }, (error) => {
      console.error(error);
    });
  }

  public deleteClient(documentId){
  this.firestoreservice.deleteCliente(documentId).then(() => {
    console.log('Documento eliminado Wuuuu');
  }, (error) => {
    console.error(error);
  });
}

}
