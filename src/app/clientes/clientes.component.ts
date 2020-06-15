import { FirestoreService } from './../services/firestore/firestore.service';
import { Component, OnInit , NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators , FormBuilder} from '@angular/forms';

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

  public deleteClient(documentId){
  this.firestoreservice.deleteCliente(documentId).then(() => {
    console.log('Documento eliminado Wuuuu');
  }, (error) => {
    console.error(error);
  });
}

}
