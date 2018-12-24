import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit {
  private idCampagne:number;
  private campagne:any;
  private formulaires:any;
  modaldetail:BsModalRef;
  constructor(private adminService:AdminService,private bsModal:BsModalService) { }

  ngOnInit() {
    this.idCampagne=parseInt(sessionStorage.getItem("id"));
    console.log(this.idCampagne);
    this.adminService.getCampagneById(this.idCampagne).then(reponse =>{
      this.campagne=JSON.parse(reponse['_body']);
      this.formulaires=JSON.parse(this.campagne.formulaire);
      console.log(this.formulaires);

    });


  }
  showModalDetail(template:any){
    this.modaldetail=this.bsModal.show(template);
  }
  hideModalDetail(){
    this.modaldetail.hide();
  }

}
