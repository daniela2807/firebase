import { FirestoreService } from './../services/firestore/firestore.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes = [];
  public documentId = null;
  public cursos = [];

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

    this.firestoreservice.getCursos().subscribe((cursoSnapshot) => {
      this.cursos = [];
      cursoSnapshot.forEach((CursoData: any) => {
        this.cursos.push({
          id: CursoData.payload.doc.id,
          data: CursoData.payload.doc.data()
        });
      });
      });
    }
    // this.firestoreservice.getCursos().subscribe((cursoSnapshot) => {
    //   this.cursos = [];
    //   cursoSnapshot.forEach((CursoData: any) => {
    //     let curso =
    //     {
    //       id: CursoData.payload.doc.id,
    //       data: CursoData.payload.doc.data(),
    //     }
    //     this.cursos.push(curso);
    //   });
    // });

  public deleteClient(documentId) {
      this.firestoreservice.deleteCliente(documentId).then(() => {
        console.log('Documento eliminado Wuuuu');
      }, (error) => {
        console.error(error);
      });
    }

  public deleteCurso(documentId){
      this.firestoreservice.deleteCurso(documentId).then(() => {
        console.log('Documento elimiando ');
      }, (error) => {
        console.error(error);
      })
    }

}
