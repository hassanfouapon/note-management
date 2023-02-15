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
import { CandidatService } from 'src/app/services/others/candidat.service';
import { Helpers } from 'src/app/shared/helpers/helper';
import { UserHelper } from 'src/app/shared/helpers/user';
import { Candidat } from 'src/app/shared/models/candidat.interface';
import { Classe } from 'src/app/shared/models/classe.interface';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss'],
  providers: [ConfirmationService, MessageService, CandidatService]
})
export class CandidatComponent implements OnInit {


  candidatDialog = false;
  userId = 0;
  isGettingAll = true;
  senddingRequest = false;
  search = '';
  isUpdating = false;
  candidatList: Candidat[] = [];
  classeList: Classe[] = [];
  candidat!: Candidat;
  newcandidat!: Candidat;
  fileDialog = false;
  file: any[] = [];
  fileForm = this.formBuilder.group({
    file: new FormControl('', [Validators.required]),
  });
  candidatForm = this.formBuilder.group({
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
  });
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private candidatService: CandidatService,
  ) { }

  ngOnInit(): void {
    // todo : get connected user id from local storage
    const user = UserHelper.getUser();
    this.userId = user.id;
    this.resetData();
    // get candidat from database
    this.getCandidats();
    // get role from database
    this.getClasses();



  }

  getCandidats(): void{
    this.candidatService.all().toPromise().then(
      (candidats) => {
        this.candidatList = candidats;
        this.isGettingAll = false;
      },
      (res) => {
        this.candidatList = [];
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
        // get role from database
        this.candidatService.getClasses().toPromise().then(
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
    this.candidatDialog = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmer',
      detail: 'operation non terminer ou annuler',
      life: 3000
    });
  }

  createCandidat(): void{
    this.candidatDialog = true;
    this.isUpdating = false;
    this.candidat = this.newcandidat;
  }

  editCandidat(candidat: Candidat, e: Event): void{
    e.stopPropagation();
    this.candidat = candidat;
    this.isUpdating = true;
    this.candidatDialog = true;

    const dD = new Date(Date.parse(this.candidat.dateNaissance ? this.candidat.dateNaissance.toString() : ""));
    this.candidat.dateNaissance  = `${dD.getDate()}/${dD.getMonth()+1}/${dD.getFullYear()}`;

    console.log(candidat)
  }

  saveCandidat(e: Event): void{

    const dD = new Date(Date.parse(this.candidat.dateNaissance ? this.candidat.dateNaissance.toString() : ""));
    this.candidat.dateNaissance  = `${dD.getDate()}-${dD.getMonth()+1}-${dD.getFullYear()}`;
    // console.log(this.candidat.dateNaissance);




    // take connect user id
    this.candidat.createurId = this.userId;
    this.candidat.modificateurId = this.userId;
    // initiate the request
    this.senddingRequest = true;
    const candidat = {
      libelle: this.candidat.libelle,
      statutVie: this.candidat.statutVie,
      statut: this.candidat.statut,
      description: this.candidat.description,
      createurId: this.candidat.createurId,
      modificateurId: this.candidat.modificateurId,
      dateNaissance: this.candidat.dateNaissance,
      email: this.candidat.email,
      nom: this.candidat.nom,
      prenom: this.candidat.prenom,
      sexe: this.candidat.sexe,
      telephone: this.candidat.telephone,
      ecoleOrigine: this.candidat.ecoleOrigine,
      lieuNaissance: this.candidat.lieuNaissance,
      nomDeLaMere: this.candidat.nomDeLaMere,
      nomDuPere: this.candidat.nomDuPere,
      professionDelaMere: this.candidat.professionDelaMere,
      professionDuPere: this.candidat.professionDuPere,
      regionOrigine: this.candidat.regionOrigine,
      telephoneDeLaMere: this.candidat.telephoneDeLaMere,
      telephoneDuPere: this.candidat.telephoneDuPere,
      classId: this.candidat.classId
    };
    console.log(candidat);

    return;
    if (this.isUpdating){
      this.candidatService.update({
        code: this.candidat.code,
        ...candidat}
      ).toPromise().then((data) => {
        console.log(data);
        this.senddingRequest = false;
        if(data.message){
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: data.message,
            life: 3000
          });
        }else{
          this.candidatDialog = false;
          this.resetData();
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmer',
            detail: 'candidat modifier avec success',
            life: 3000
          });
        }
      },
      (res) => {
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification du candidat', life: 3000 });
      });
    }else{
      this.candidatService.create(candidat).toPromise().then((data) => {
        console.log(data);
        if(data.message){
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: data.message, life: 3000 });
        }else{
          this.candidatList.push(data);
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmer',
            detail: `${this.candidat.nom} ajouter avec success !`,
            life: 3000
          });
          this.resetData();
        }
        this.senddingRequest = false;
        this.candidatDialog = false;
      },
      (res) => {
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation du candidat', life: 3000 });
      });
    }
  }

  dropCandidat(id: string, libelle:string): void{
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer le candidat  ' + libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isGettingAll = true;
        this.candidatService.delete(id).toPromise().then((data) => {
          this.isGettingAll = false;
          if(data == null){
            // tslint:disable-next-line:max-line-length
            this.messageService.add({ severity: 'success', summary: 'success', detail: `candidat N° ${id} supprimer avec success`, life: 3000 });
            // tslint:disable-next-line:triple-equals
            this.candidatList = this.candidatList.filter( it  => it.code != id );
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'une erreur est survenue lors de la suppression du candidat', life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
      }
    });
  }

  resetData(){
    this.newcandidat = {
      code: '',
      libelle: 'test',
      statutVie: 'ACTIVE',
      statut: 'ACTIVE',
      description: 'tester la creation d\'un candidat pour les gens',
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
      classId: ''
    };
    this.candidat = this.newcandidat;
  }

  annuler(): void{
    this.resetData();
    if (this.isUpdating === false) {
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
    }
    this.candidatDialog = false;
  }

exportExcel(): void {
  Helpers.exportExcel('candidats', this.candidatList)
}



onChange(e: any): void{
  const input = $('input#file');
  this.file.push(input.prop('files')[0]);
}


saveManyCandidat(e: Event): void{

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
        let candidats = JSON.parse(json_object);
        // console.log(candidats);
      });
    });
  }
};



}
