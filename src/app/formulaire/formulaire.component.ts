import { Component, OnInit,ViewChild } from '@angular/core';
import { EtudiantService } from '../services/etudiant.service';
//import { ModalDirective,ModalModule } from 'ng2-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  forms=[];
  titre:string;
  modalreponse:BsModalRef;
  constructor(private etudiantService:EtudiantService,private bsModal:BsModalService){}
  ngOnInit() {
    
        this.etudiantService.getForm().then( response =>{
           this.forms=JSON.parse(response["_body"]);
            console.log(JSON.parse(response["_body"]))
           /* let data=JSON.parse(response["_body"]);
            this.titre=data.titre;
            for(let i=0;i<data.questions.length;i++){
				let div=document.createElement("div");
				div.setAttribute('class','form-group');
				let label=document.createElement("label");
				label.textContent=data.questions[i].question;
				div.appendChild(label);
				let form=document.getElementById("rasta");
				switch(data.questions[i].typeInput){
					case "1":{
						let select=document.createElement("select");
						for(let j=0;j<data.questions[i].reponses.length;j++){
							let option=document.createElement("option");
							option.textContent=data.questions[i].reponses[j];
							select.appendChild(option);
						}
						div.appendChild(select);
						break;
					}
					case "2":{
						let radio=document.createElement("div");
						for(let j=0;j<data.questions[i].reponses.length;j++){
						    let samadiv=document.createElement("div");
						    samadiv.setAttribute('class','form-inline');
							let option=document.createElement("input");
							option.setAttribute('type','radio');
							option.setAttribute('name','rasta');
							samadiv.appendChild(option);
							let samalabel=document.createElement("label");
							samalabel.textContent=data.questions[i].reponses[j];
							samadiv.appendChild(samalabel);
							radio.appendChild(samadiv);
						}
						div.appendChild(radio);
						break;
					
					}
				}
				
				form.appendChild(div);
            
            }
			console.log(data);
			*/
        });  
        
  }
 // ViewChild('reponse') public reponse :ModalDirective;
  showModal(template:any,form:any){
	//this.reponse.show();
	this.titre=form.titre;
	 let data=form;
	 let Questions=JSON.parse(form.questions);
	 console.log(Questions);
           // this.titre=data.titre;
           this.modalreponse=this.bsModal.show(template);
            for(let i=0;i<Questions.length;i++){
				let div=document.createElement("div");
				div.setAttribute('class','form-group');
				let label=document.createElement("label");
				label.textContent=Questions[i].question;
				div.appendChild(label);
				let br=document.createElement("br");
				div.appendChild(br);
				let Form=document.getElementById("rasta");
				switch(Questions[i].typeInput){
					case "1":{
						let select=document.createElement("select");
						select.setAttribute('id',Questions[i].name);
						for(let j=0;j<Questions[i].reponses.length;j++){
							let option=document.createElement("option");
							option.textContent=Questions[i].reponses[j];
							select.appendChild(option);
						}
						console.log(select);
						div.appendChild(select);
						break;
					}
					case "2":{
						let radio=document.createElement("div");
						for(let j=0;j<Questions[i].reponses.length;j++){
						    let samadiv=document.createElement("div");
						    samadiv.setAttribute('class','form-inline');
							let option=document.createElement("input");
							option.setAttribute('type','radio');
							option.setAttribute('name',Questions[i].name);
							samadiv.appendChild(option);
							let samalabel=document.createElement("label");
							samalabel.textContent=Questions[i].reponses[j];
							samadiv.appendChild(samalabel);
							radio.appendChild(samadiv);
						}
						div.appendChild(radio);
						break;
					
					}
				}
			  Form.appendChild(div);
            
            }
			console.log(data);
			
	//this.modalreponse=this.bsModal.show(template);
  }
  hideModal(){
	this.modalreponse.hide();
  }
  valider(){
	let Questions=JSON.parse(form.questions);
  }

}
