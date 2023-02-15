import {
  Component,
  OnInit,
} from '@angular/core';
// import $ from 'jquery';
import {
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

import {
  AnneeAcademique,
} from 'src/app/shared/models/anneeAcademique.inteface';
import {
  Classe,
} from 'src/app/shared/models/classe.interface';
import {
  Filiere
} from 'src/app/shared/models/filiere.interface';
import {
  Niveau
} from 'src/app/shared/models/niveau.interface';
// import {
//   Semestre,
// } from 'src/app/shared/models/semestre.inteface';
// import {
//   Specialite,
// } from 'src/app/shared/models/specialite.inteface';

import { ClasseService } from 'src/app/services/others/classe.service'
import { AnneeAcademiqueService } from 'src/app/services/others/anneeAcademique.service'
import { FiliereService } from 'src/app/services/others/filieres.service'


import { MessageService } from 'primeng/api';
import { ReportService } from 'src/app/services/others/report.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ReportService, MessageService,ClasseService,AnneeAcademiqueService,FiliereService]
})
export class AdminComponent implements OnInit {

  index: number | null | undefined;
  currentMenu: HTMLElement | undefined | null;

  dataDialog = false;
  reportPath = '';
  reportType = '';
  senddingRequest = false;
  reportModel = {
    niveau: '',
    filiere: '',
    annee_academique: '',
    semestre: '',
    specialite: '',
    classe: '',
    format: '',
  };

  pvfRequired = false;
  pvsRequired = false;

  niveaux: Niveau[] = [];
  classes: Classe[] = [];
  semestres: any[] = [];
  filieres: Filiere[] = [];
  annee_academiques: AnneeAcademique[] = [];
  specialites: any[] = [];

  dataForm = this.fb.group({
    niveau: new FormControl('', [Validators.required]),
    filiere: new FormControl('', [Validators.required]),
    annee_academique: new FormControl('', [Validators.required]),
    semestre: new FormControl('', []),
    specialite: new FormControl('', [Validators.required]),
    classe: new FormControl('', []),
    format: new FormControl('', [Validators.required])
  });
  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private printService: ReportService,
    private classeService: ClasseService,
    private yearService: AnneeAcademiqueService,
    private filiereService: FiliereService,
  ) { }

  ngOnInit(): void {
    // const f = new File(['C:/Users/PENA Daniel/Downloads/odoo.pdf'], 'test')
    // console.log(f);
    // this.reportPath = URL.createObjectURL(f);

    // window.location.assign('file:///C:/Users/penadaniel/Downloads/odoo.pdf');
    
    this.classeService.getNiveaux().toPromise().then((data) => {
      this.niveaux = data;
    });
    this.classeService.getSemestre().toPromise().then((data) => {
      this.semestres = data;
    });
    this.classeService.getNiveaux().toPromise().then((data) => {
      this.niveaux = data;
    });
    this.classeService.getSpecialites().toPromise().then((data) => {
      this.specialites = data;
    });
    this.classeService.all().toPromise().then((data) => {
      this.classes = data;
    });
    this.yearService.all().toPromise().then((data) => {
      this.annee_academiques = data;
    });
    this.filiereService.all().toPromise().then((data) => {
      this.filieres = data;
    });
  }

  getFile(event: Event): void{
    this.sendRequest();
  }



  openDialog(type: string): void{
    this.reportType = type;
    
    if(type == 'pvf'){
      this.pvfRequired = true
    }else if(type == "pvs"){
      this.pvsRequired = true;
    }
    this.dataDialog = true;
  }

  hideDialog(): void {
    this.dataDialog = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmer',
      detail: 'operation non terminer ou annuler',
      life: 3000
    });
  }

  sendRequest(): void{

  this.senddingRequest = true;
    if(this.reportType == ''){
      this.messageService.add({
        severity: 'info',
        summary: 'info',
        detail: 'operation annulée',
        life: 3000
      });
    }else{
      if(this.reportType == "pvf"){
        this.getFinalPv();
      }else if(this.reportType == "pvs"){
        this.getSynthesePv();
      }else if(this.reportType == "psc"){
        this.getStudentCard();
      }else{
        this.messageService.add({
          severity: 'warn',
          summary: 'warn',
          detail: 'cette action n\'existe pas encore !',
          life: 3000
        });
      }
    }


  }

  getFinalPv(): void{
    const datas = {
      niveau: 1,
      filiere: 'Licence Professionnelle',
      annee_academique: '2019',
      semestre: 'Semestre 1',
      specialite: 'Concepteur Développeur d\'Application pour l\'Economie Numérique',
      format: 'pdf',
    }
    this.reportModel.niveau = '2';
    this.reportModel.annee_academique = '2021';
    this.printService.getFinalPv(this.reportModel).toPromise().then((data) =>{
      this.reportPath = data;
      console.log(data);
      this.senddingRequest = false;
      this.dataDialog = false;
    }, (error) => {
      console.log(error);
      this.senddingRequest = false;
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation du pv', life: 3000 });
    });
  }

  getStudentCard(): void{
    this.printService.getStudentCard(this.reportModel).toPromise().then((data) =>{
      this.reportPath = data;
      console.log(data);
      this.senddingRequest = false;
      this.dataDialog = false;
    }, (error) => {
      console.log(error);
      this.senddingRequest = false;
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation des carte d\'etudiants ', life: 3000 });
    });
  }

  getSynthesePv(): void{
    const datas = {
      niveau: 1,
      filiere: 'Licence Professionnelle',
      annee_academique: '2019',
      semestre: 'Semestre 1',
      specialite: 'Concepteur Développeur d\'Application pour l\'Economie Numérique',
      format: 'pdf',
    }
    this.printService.getSynthexePv(this.reportModel).toPromise().then((data) =>{
      this.reportPath = data;
      console.log(data);
      this.senddingRequest = false;
      this.dataDialog = false;
    }, (error) => {
      console.log(error);
      this.senddingRequest = false;
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation du pv', life: 3000 });
    });
  }


  b64toBlob(b64Data: any, contentType: any, sliceSize: any) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

}
