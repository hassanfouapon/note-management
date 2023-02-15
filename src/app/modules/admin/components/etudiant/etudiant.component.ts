import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import {
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { EtudiantService } from 'src/app/services/others/etudiant.service';
import { Helpers } from 'src/app/shared/helpers/helper';
import { UserHelper } from 'src/app/shared/helpers/user';
import { Classe } from 'src/app/shared/models/classe.interface';
import { Etudiant } from 'src/app/shared/models/etudiant.interface';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss'],
  providers: [ConfirmationService, MessageService, EtudiantService]
})
export class EtudiantComponent implements OnInit {


  etudiantDialog = false;
  userId = 0;
  isGettingAll = true;
  senddingRequest = false;
  search = '';
  isUpdating = false;
  etudiantList: Etudiant[] = [];
  classeList: Classe[] = [];
  etudiant!: Etudiant;
  newEtudiant!: Etudiant;
  fileDialog = false;
  file: any[] = [];
  fileForm = this.formBuilder.group({
    file: new FormControl('', [Validators.required]),
  });
  etudiantForm = this.formBuilder.group({
    libelle: new FormControl('test', [Validators.required]),
    statutVie: new FormControl('ACTIVE', [Validators.required]),
    statut: new FormControl('ACTIVE', [Validators.required]),
    description: new FormControl('', [Validators.minLength(30)]),
    classe: new FormControl('', [Validators.required]),
    dateNaissance: new FormControl('', [Validators.required]),
    email: new FormControl('test@test.com', [Validators.required]),
    nom: new FormControl('test', [Validators.required]),
    prenom: new FormControl('test', [Validators.required]),
    sexe: new FormControl('M', [Validators.required]),
    telephone: new FormControl('690437856', [Validators.required]),
    ecoleOrigine: new FormControl('mendong', [Validators.required]),
    lieuNaissance: new FormControl('bertoua', [Validators.required]),
    nomDeLaMere: new FormControl('mama', [Validators.required]),
    nomDuPere: new FormControl('papa', [Validators.required]),
    professionDelaMere: new FormControl('menagere', [Validators.required]),
    professionDuPere: new FormControl('president', [Validators.required]),
    regionOrigine: new FormControl('ouest cameroun', [Validators.required]),
    telephoneDeLaMere: new FormControl('64567890', [Validators.required]),
    telephoneDuPere:new FormControl('64567890', [Validators.required]),
    matricule: new FormControl('L0392021', [Validators.required]),
    codeAuthentification: new FormControl('test-test', [Validators.required]),
  });
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private etudiantService: EtudiantService,
  ) { }

  ngOnInit(): void {
    // todo : get connected user id from local storage
    const user = UserHelper.getUser();
    this.userId = user.id;
    this.resetData();
    // get etudiant from database
    this.getEtudiants();
    // get role from database
    this.getClasses();



  }

  getEtudiants(): void{
    this.etudiantService.all().toPromise().then(
      (etudiants) => {
        this.etudiantList = etudiants;
        this.isGettingAll = false;
      },
      (res) => {
        this.etudiantList = [];
        this.isGettingAll = false;
        this.messageService.add({
          severity: 'error',
          summary: 'erreur',
          detail: 'erreur du chargement des données veuillez ressayez plustard',
          life: 3000
        });
      }
    );
  }
  getClasses(): void{
        // get classes from database
        this.etudiantService.getClasses().toPromise().then(
          (data) => {
            this.classeList = data;
          },
          (res) => {
            this.classeList = [];
            this.messageService.add({
              severity: 'error',
              summary: 'erreur',
              detail: 'erreur du chargement des classes veuillez ressayez plustard',
              life: 3000
            });
          }
        );
  }

  handleFileDialog(): void{
    this.fileDialog = true;
  }

  hideDialog(): void {
    this.etudiantDialog = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmer',
      detail: 'operation non terminer ou annuler',
      life: 3000
    });
  }

  createEtudiant(): void{
    this.etudiantDialog = true;
    this.isUpdating = false;
    this.etudiant = this.newEtudiant;
  }

  editEtudiant(etudiant: Etudiant, e: Event): void{
    e.stopPropagation();
    this.etudiant = etudiant;
    this.isUpdating = true;
    this.etudiantDialog = true;

    const dD = new Date(Date.parse(this.etudiant.dateNaissance ? this.etudiant.dateNaissance.toString() : ""));
    this.etudiant.dateNaissance  = `${dD.getDate()}/${dD.getMonth()+1}/${dD.getFullYear()}`;

    console.log(etudiant)
  }

  saveEtudiant(e: Event): void{

    const dD = new Date(Date.parse(this.etudiant.dateNaissance ? this.etudiant.dateNaissance.toString() : ""));
    this.etudiant.dateNaissance  = `${dD.getDate()}-${dD.getMonth()+1}-${dD.getFullYear()}`;
    // console.log(this.etudiant.dateNaissance);

    // take connect user id
    this.etudiant.createurId = this.userId;
    this.etudiant.modificateurId = this.userId;
    // initiate the request
    this.senddingRequest = true;
    const etudiant = {
      libelle: this.etudiant.libelle,
      statutVie: this.etudiant.statutVie,
      statut: this.etudiant.statut,
      description: this.etudiant.description,
      createurId: this.etudiant.createurId,
      modificateurId: this.etudiant.modificateurId,
      dateNaissance: this.etudiant.dateNaissance,
      email: this.etudiant.email,
      nom: this.etudiant.nom,
      prenom: this.etudiant.prenom,
      sexe: this.etudiant.sexe,
      telephone: this.etudiant.telephone,
      ecoleOrigine: this.etudiant.ecoleOrigine,
      lieuNaissance: this.etudiant.lieuNaissance,
      nomDeLaMere: this.etudiant.nomDeLaMere,
      nomDuPere: this.etudiant.nomDuPere,
      professionDelaMere: this.etudiant.professionDelaMere,
      professionDuPere: this.etudiant.professionDuPere,
      regionOrigine: this.etudiant.regionOrigine,
      telephoneDeLaMere: this.etudiant.telephoneDeLaMere,
      telephoneDuPere: this.etudiant.telephoneDuPere,
      classId: this.etudiant.classId,
      matricule: this.etudiant.matricule,
      codeAuthentification: this.etudiant.codeAuthentification
    };
    // console.log(etudiant);

    // return;
    if (this.isUpdating){
      this.etudiantService.update({
        code: this.etudiant.code,
        ...etudiant}
      ).toPromise().then((data) => {
        console.log(data);
        this.senddingRequest = false;
        if(!data.code){
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'une erreur est survenue lors de la modification verifier vos données et retenter',
            life: 3000
          });
        }else{
          this.etudiantDialog = false;
          this.resetData();
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmer',
            detail: 'etudiant modifier avec success',
            life: 3000
          });
        }
      },
      (res) => {
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification de l\'etudiant', life: 3000 });
      });
    }else{
      this.etudiantService.create(etudiant).toPromise().then((data) => {
        console.log(data);
        if(!data.code){
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: "une erreur est survenue lors de l'operation", life: 3000 });
        }else{
          this.etudiantList.push(data);
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmer',
            detail: `${this.etudiant.nom} ajouter avec success !`,
            life: 3000
          });
          this.resetData();
        }
        this.senddingRequest = false;
        this.etudiantDialog = false;
      },
      (res) => {
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation de l\'etudiant', life: 3000 });
      });
    }
  }

  dropEtudiant(id: string, libelle:string): void{
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer le etudiant  ' + libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isGettingAll = true;
        this.etudiantService.delete(id).toPromise().then((data) => {
          this.isGettingAll = false;
          if(data == null){
            // tslint:disable-next-line:max-line-length
            this.messageService.add({ severity: 'success', summary: 'success', detail: `etudiant N° ${id} supprimer avec success`, life: 3000 });
            // tslint:disable-next-line:triple-equals
            this.etudiantList = this.etudiantList.filter( it  => it.code != id );
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'une erreur est survenue lors de la suppression de l\'etudiant', life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
      }
    });
  }

  resetData(){
    this.newEtudiant = {
      code: '',
      libelle: 'test',
      statutVie: 'ACTIVE',
      statut: 'ACTIVE',
      description: 'tester la creation d\'un etudiant pour les gens',
      createurId: 0,
      modificateurId: 0,
      dateNaissance: '',
      email: 'test@test.com',
      nom: 'test',
      prenom: 'test',
      sexe: '',
      telephone: '690436789',
      ecoleOrigine: 'tester',
      lieuNaissance: 'tester',
      nomDeLaMere: 'tester',
      nomDuPere: 'tester',
      professionDelaMere: 'tester',
      professionDuPere: 'tester',
      regionOrigine: 'tester',
      telephoneDeLaMere: '690436789',
      telephoneDuPere: '690436789',
      classId: '',
      matricule: '',
      codeAuthentification: ''
    };
    this.etudiant = this.newEtudiant;
  }

  annuler(): void{
    this.resetData();
    if (this.isUpdating === false) {
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
    }
    this.etudiantDialog = false;
  }

exportExcel(): void {
  Helpers.exportExcel('etudiants', this.etudiantList)
}



onChange(e: any): void{
  const input = $('input#file');
  this.file.push(input.prop('files')[0]);
}


saveManyEtudiant(e: Event): void{

  const fr = new FileReader();
  const data = this.file[0];
  $('#file-form').trigger("reset");
  this.file = [];
  fr.readAsBinaryString(data);
  fr.onload = (e) => {
    const res = fr.result;
    import('xlsx').then(xlsx => {
      var workbook = xlsx.read(res, {
        type: 'binary'
      });

      workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        var val = workbook.Sheets[sheetName];
        var XL_row_object = xlsx.utils.sheet_to_json(val);
        var json_object = JSON.stringify(XL_row_object);
        let etudiants = JSON.parse(json_object);
        // console.log(etudiants);
      });
    });
  }
};


}
