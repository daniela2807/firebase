import { Observable } from 'rxjs';
import { FirestoreService } from './../../services/firestore/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [FirestoreService]
})
export class NavbarComponent implements OnInit {

  public user$: Observable<any> = this.firestoreservice.afAuth.user;

  constructor(private firestoreservice: FirestoreService, private router: Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.firestoreservice.logout();
    this.router.navigate(['/login']);
  }

}
