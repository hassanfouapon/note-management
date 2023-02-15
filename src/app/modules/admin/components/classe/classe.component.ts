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
import { ClasseService } from 'src/app/services/others/classe.service';
import { Helpers } from 'src/app/shared/helpers/helper';
import { UserHelper } from 'src/app/shared/helpers/user';
import { Classe } from 'src/app/shared/models/classe.interface';
import { Niveau } from 'src/app/shared/models/niveau.interface';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss'],
  providers: [MessageService, ConfirmationService, ClasseService]
})
export class ClasseComponent implements OnInit {

  classeDialog = false;
  userId = 0;
  isGettingAll = true;
  senddingRequest = false;
  search = '';
  isUpdating = false;
  classeList: Classe[] = [];
  specialiteList: any[] = [];
  niveauList: Niveau[] = [];
  classe: Classe = {
    code: '',
    libelle: '',
    statutVie: '',
    description: '',
    createurId: 0,
    modificateurId: 0,
    niveau: "",
    specialite: ""
  };
  newClasse: Classe = {
    code: '',
    libelle: '',
    statutVie: 'ACTIVE',
    description: '',
    createurId: 0,
    modificateurId: 0,
    niveau: "",
    specialite: ""
  };
  fileDialog = false;
  file: any[] = [];
  fileForm = this.formBuilder.group({
    file: new FormControl('', [Validators.required]),
  });
  classeForm = this.formBuilder.group({
    libelle: new FormControl('', [Validators.required]),
    specialite: new FormControl('', [Validators.required]),
    niveau: new FormControl('', [Validators.required]),
    statutVie: new FormControl('ACTIVE', [Validators.required]),
    description: new FormControl('', [Validators.minLength(30)])
  });

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private classeService: ClasseService
  ) { }

  ngOnInit(): void {
    // todo : get connected user id from local storage
    const user = UserHelper.getUser();
    this.userId = user.id;
    this.getClasses();
    this.getSpecialites();
    this.getNiveaux();

  }

  getClasses(): void{
    // get classe from database
    this.classeService.all().toPromise().then(
      (classe) => {
        this.classeList = classe;
        this.isGettingAll = false;
      },
      (res) => {
        this.classeList = [];
        this.isGettingAll = false;
        this.messageService.add({
          severity: 'error',
          summary: 'erreur',
          detail: 'erreur du chargement des classes veuillez ressayez plustard',
          life: 3000
        });
      }
    );
  }

  getSpecialites(): void{
    this.classeService.getSpecialites().toPromise().then(
      (specialites) => {
        this.specialiteList = specialites;
      },
      (res) => {
        this.specialiteList = [];
        this.messageService.add({
          severity: 'error',
          summary: 'erreur',
          detail: 'erreur du chargement des specialites !',
          life: 3000
        });
      }
    );
  }
  getNiveaux(): void{
    this.classeService.getNiveaux().toPromise().then(
      (niveaux) => {
        this.niveauList = niveaux;
      },
      (res) => {
        this.niveauList = [];
        this.messageService.add({
          severity: 'error',
          summary: 'erreur',
          detail: 'erreur du chargement des niveaux !',
          life: 3000
        });
      }
    );
  }
  handleFileDialog(): void{
    this.fileDialog = true;
  }

  hideDialog(): void {
    this.classeDialog = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmer',
      detail: 'operation non terminer ou annuler',
      life: 3000
    });
  }

  createClasse(): void{
    this.classeDialog = true;
    this.isUpdating = false;
    this.classe = this.newClasse;
  }

  editClasse(classe: Classe, e: Event): void{
    e.stopPropagation();
    this.classe = classe;

    // brice doit envoyer les codes pas les libelles (pour les champs niveau et specialite)
    const ni = this.niveauList.filter((it) =>{ return it.libelle === classe.niveau });
    this.classe.niveau = ni[0].code;

    const sp = this.specialiteList.filter((it) =>{ return it.libelle === classe.specialite });
    this.classe.specialite = sp[0].code;

    this.isUpdating = true;
    this.classeDialog = true;
  }

  saveClasse(e: Event): void{
    // take connect user id
    this.classe.createurId = this.userId;
    this.classe.modificateurId = this.userId;
    // initiate the request
    this.senddingRequest = true;
    const classe = {
      libelle: this.classe.libelle,
      description: this.classe.description,
      statutVie: this.classe.statutVie,
      createurId: this.classe.createurId,
      modificateurId: this.classe.modificateurId,
      codeniveau: this.classe.niveau,
      codespecialite: this.classe.specialite
    };

    if (this.isUpdating){
      this.classeService.update({
        code: this.classe.code,
        ...classe}
      ).toPromise().then((data) => {
        console.log(data);
        this.senddingRequest = false;
        this.classeDialog = false;
        this.classe = this.newClasse;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmer',
          detail: 'classe modifier avec success',
          life: 3000
        });
      },
      (res) => {
        this.getClasses();
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification de la classe', life: 3000 });
      });
    }else{
      this.classeService.create(classe).toPromise().then((data) => {
        console.log(data);
        // this.classeList.push(data);
        this.senddingRequest = false;
        this.classeDialog = false;
        if(data.code){
          this.resetData();
          this.getClasses();
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmer',
            detail: 'classe creer avec success',
            life: 3000
          });
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: data.message,
            life: 3000
          });
        }
      },
      (res) => {
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation de la classe', life: 3000 });
      });
    }
  }

  dropClasse(id: string, libelle:string): void{
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer ' + libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isGettingAll = true;
        this.classeService.delete(id).toPromise().then((data) => {
          this.isGettingAll = false;
          if(data == null){
            // tslint:disable-next-line:max-line-length
            this.messageService.add({ severity: 'success', summary: 'success', detail: `classe N° ${id} supprimer avec success`, life: 3000 });
            // tslint:disable-next-line:triple-equals
            this.classeList = this.classeList.filter( it  => it.code != id );
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'une erreur est survenue lors de la suppression du classe', life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'suppression annuler', life: 3000 });
      }
    });
  }

  resetData(){
    this.newClasse = {
      code: '',
      libelle: '',
      statutVie: 'ACTIVE',
      description: '',
      createurId: 0,
      modificateurId: 0,
      niveau: "",
      specialite: ""
    };
    this.classe = this.newClasse;
  }

  annuler(): void{
    this.resetData();
    if (this.isUpdating === false) {
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
    }
    this.classeDialog = false;
  }

  exportExcel(): void {
    Helpers.exportExcel('classes', this.classeList)
  }

  
onChange(e: any): void{
  const input = $('input#file');
  this.file.push(input.prop('files')[0]);
}


saveManyClasse(e: Event): void{

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
        let classes = JSON.parse(json_object);
        // console.log(classes);
      });
    });
  }  
};

}