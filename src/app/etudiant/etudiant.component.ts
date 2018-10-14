import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../services/auth-guard.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
