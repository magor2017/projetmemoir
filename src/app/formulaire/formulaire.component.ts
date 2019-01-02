import { Component, OnInit,ViewChild } from '@angular/core';
import { EtudiantService } from '../services/etudiant.service';
//import { ModalDirective,ModalModule } from 'ng2-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  forms=[];
  titre:string;
  modalreponse:BsModalRef;
  questions:any;
  idCamp:number;
  existeForme:boolean=false;
  messageExiteForm:boolean=false;
  constructor(private etudiantService:EtudiantService,private bsModal:BsModalService){}
  ngOnInit() {
    
        this.etudiantService.getForm().then( response =>{
			console.log(response);
			console.log(JSON.parse(response['_body']));
			let rep=JSON.parse(response['_body']);
			if(rep.length>0){
				this.existeForme=true;
				console.log(rep[0].campagne);
				//console.log(JSON.parse(rep[0].campagne.forms));
				for(let i=0;i<rep.length;i++){
					let idform=parseInt(rep[i].idform);
					let formCam=rep[i].campagne.forms;
					//let formCam=JSON.parse(rep[i].campagne.forms);
					console.log(formCam);
					for(let j=0;j<formCam.length;j++){
						if(parseInt(formCam[j].id)==idform){
							rep[i].campagne.forms=rep[i].campagne.forms;
							//rep[i].campagne.forms=JSON.parse(rep[i].campagne.forms);
							console.log(rep[i].campagne.forms);
							this.forms.push(rep[i].campagne);
							console.log(this.forms);
						}
					}

				}
			}else{
				this.messageExiteForm=true;
			}
			
           // this.forms=JSON.parse(rep[0].campagne);
          //  console.log(JSON.parse(response["_body"]))
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
  showModal(template:any,camp:any,i:number){
	//this.reponse.show();
	let form=camp.forms[i];
	this.idCamp=parseInt(camp.idCam);
	this.titre=form.titre;
	 let data=form;
	 console.log(data);
	 this.questions=form;
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
							let tabrep=Questions[i].reponses[j].split("#");
							option.setAttribute('value',tabrep[1]);
							option.textContent=tabrep[0];
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
							let tabrep=Questions[i].reponses[j].split("#");
							option.setAttribute('type','radio');
							option.setAttribute('name',Questions[i].name);
							option.setAttribute('value',tabrep[1]);
							samadiv.appendChild(option);
							let samalabel=document.createElement("label");
							samalabel.textContent=tabrep[0];
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
	let Questions=JSON.parse(this.questions.questions);
	let reponse=[];
	console.log(this.questions);
	let valu="";
	for(let i=0;i<Questions.length;i++){
		switch(Questions[i].typeInput){
		case "1":{
			//console.log((<HTMLInputElement[]><any>document.getElementsByName(Questions[i].id))[0].value);
			let valu=(<HTMLInputElement>document.getElementById(Questions[i].id)).value;
			let realReponse=valu;
			let rep={poid:Questions[i].poid,id:Questions[i].id,question:Questions[i].question,reponse:realReponse};
			//console.log(realReponse);
			reponse.push(rep);
			break;
		}
		case "2":{
			let tabvalues=(<HTMLInputElement[]><any>document.getElementsByName(Questions[i].id));
			for(let i=0;i<tabvalues.length;i++){
				if(tabvalues[i].checked){
					console.log(tabvalues[i].value);
					valu=tabvalues[i].value;
				}
			}
			//console.log((<HTMLInputElement[]><any>document.getElementsByName(Questions[i].id))[0].value);
			let realReponse=valu;
			let rep={poid:Questions[i].poid,id:Questions[i].id,question:Questions[i].question,reponse:realReponse};
			//console.log(realReponse);
			reponse.push(rep);
			break;
		}
		default:{
			console.log("erreur !!!");
		}
	  }
	}
	console.log(reponse);
	this.etudiantService.validerReponse(JSON.stringify(reponse),parseInt(this.questions.id),this.idCamp).then(rep => {
		console.log(rep);
	});
  }

}
