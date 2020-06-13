import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  constructor(private firestore: AngularFirestore ) {
  }

  //crea un nuevo cliente
  public createClient(data: {Nombre: string, Apellido: string, Edad: number, Correo: string, Activo: boolean, DiaInscripcion: string}){
    return this.firestore.collection('Clientes').add(data);
  }

  //Obtiene un cliente
  public getCliente(documentId: string) {
    return this.firestore.collection('Clientes').doc(documentId).snapshotChanges();
  }

  //Obtiene todos los clientes 
  public getClientes(){
    return this.firestore.collection('Clientes').snapshotChanges();
  }

  //Actualiza un cliente
  public updateCliente(documentId: string, data: any){
    return this.firestore.collection('Clientes').doc(documentId).set(data);
  }

  public deleteCliente(documentId: string){
    return this.firestore.collection('Clientes').doc(documentId).delete();
  }
}
