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
import { DroitService } from 'src/app/services/others/droit.service';
import { RoleService } from 'src/app/services/others/role.service';
import { Helpers } from 'src/app/shared/helpers/helper';
import { UserHelper } from 'src/app/shared/helpers/user';
import { Droit } from 'src/app/shared/models/droit.interface';
import { Role } from 'src/app/shared/models/role.interface';

@Component({
  selector: 'app-droit',
  templateUrl: './droit.component.html',
  styleUrls: ['./droit.component.scss'],
  providers: [ConfirmationService, MessageService, DroitService,RoleService]
})
export class DroitComponent implements OnInit {


  droitDialog = false;
  userId = 0;
  isGettingAll = true;
  senddingRequest = false;
  search = '';
  isUpdating = false;
  droitList: Droit[] = [];
  roleList: Role[] = [];
  droit: Droit = {
    code: '',
    libelle: '',
    statutVie: '',
    description: '',
    createurId: 0,
    modificateurId: 0,
    roleId: 0,
    roleName: "",
    categorie: '',
    lecture: false,
    ecriture: false,
    modification: false,
    suppression: false
  };
  newDroit: Droit = {
    code: '',
    libelle: '',
    statutVie: 'ACTIVE',
    description: '',
    createurId: 0,
    modificateurId: 0,
    roleId: 0,
    roleName: "",
    categorie: '',
    lecture: false,
    ecriture: false,
    modification: false,
    suppression: false
  };
  fileDialog = false;
  file: any[] = [];
  fileForm = this.formBuilder.group({
    file: new FormControl('', [Validators.required]),
  });
  droitForm = this.formBuilder.group({
    libelle: new FormControl('', [Validators.required]),
    categorie: new FormControl('', [Validators.required]),
    permissions: new FormControl('', []),
    lecture: new FormControl(false, [Validators.required]),
    role: new FormControl('', [Validators.required]),
    ecriture: new FormControl(false, [Validators.required]),
    modification: new FormControl(false, [Validators.required]),
    suppression: new FormControl(false, [Validators.required]),
    statutVie: new FormControl('ACTIVE', [Validators.required]),
    description: new FormControl('', [Validators.minLength(30)])
  });
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private droitService: DroitService,
    private roleService: RoleService,
  ) { }

  ngOnInit(): void {
    // todo : get connected user id from local storage
    const user = UserHelper.getUser();
    this.userId = user.id;
    // get droit from database
    this.getDroits();
    // get role from database
    this.getRoles();

  }

  getDroits(): void{
    this.droitService.all().toPromise().then(
      (droits) => {
        this.droitList = droits;
        this.isGettingAll = false;
      },
      (res) => {
        this.droitList = [];
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
  getRoles(): void{
        // get role from database
        this.roleService.all().toPromise().then(
          (role) => {
            this.roleList = role;
          },
          (res) => {
            this.roleList = [];
            this.messageService.add({
              severity: 'error',
              summary: 'erreur',
              detail: 'erreur du chargement des roles veuillez ressayez plustard',
              life: 3000
            });
          }
        );
  }

  handleFileDialog(): void{
    this.fileDialog = true;
  }

  hideDialog(): void {
    this.droitDialog = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmer',
      detail: 'operation non terminer ou annuler',
      life: 3000
    });
  }

  createDroit(): void{
    this.droitDialog = true;
    this.isUpdating = false;
    this.droit = this.newDroit;
  }

  editDroit(droit: Droit, e: Event): void{
    e.stopPropagation();
    this.droit = droit;
    this.isUpdating = true;
    this.droitDialog = true;
  }

  saveDroit(e: Event): void{
    // take connect user id
    this.droit.createurId = this.userId;
    this.droit.modificateurId = this.userId;
    // initiate the request
    this.senddingRequest = true;
    const droit = {
      libelle: this.droit.libelle,
      description: this.droit.description,
      statutVie: this.droit.statutVie,
      createurId: this.droit.createurId,
      modificateurId: this.droit.modificateurId,
      roleId: this.droit.roleId,
      categorie: this.droit.categorie,
      lecture: this.droit.lecture,
      ecriture: this.droit.ecriture,
      modification: this.droit.modification,
      suppression: this.droit.suppression
    };
    console.log(droit);

    return;
    if (this.isUpdating){
      this.droitService.update({
        code: this.droit.code, 
        ...droit}
      ).toPromise().then((data) => {
        this.senddingRequest = false;
        this.droitDialog = false;
        this.droit = this.newDroit;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmer',
          detail: 'droit modifier avec success',
          life: 3000
        });
      },
      (res) => {
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification du droit', life: 3000 });
      });
    }else{
      this.droitService.create(droit).toPromise().then((data) => {
        // console.log(data);
        this.droitList.push(data);
        this.resetData();
        this.senddingRequest = false;
        this.droitDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmer',
          detail: 'droit creer avec success',
          life: 3000
        });
      },
      (res) => {
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation du droit', life: 3000 });
      });
    }
  }

  dropDroit(id: string, libelle:string): void{
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer le droit  ' + libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isGettingAll = true;
        this.droitService.delete(id).toPromise().then((data) => {
          this.isGettingAll = false;
          if(data == null){
            // tslint:disable-next-line:max-line-length
            this.messageService.add({ severity: 'success', summary: 'success', detail: `droit N° ${id} supprimer avec success`, life: 3000 });
            // tslint:disable-next-line:triple-equals
            this.droitList = this.droitList.filter( it  => it.code != id );
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'une erreur est survenue lors de la suppression du droit', life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
      }
    });
  }

  resetData(){
    this.newDroit = {
      code: '',
      libelle: '',
      statutVie: 'ACTIVE',
      description: '',
      createurId: 0,
      modificateurId: 0,
      roleId: 0,
      roleName: "",
      categorie: '',
      lecture: false,
      ecriture: false,
      modification: false,
      suppression: false
    };
    this.droit = this.newDroit;
  }

  annuler(): void{
    this.resetData();
    if (this.isUpdating === false) {
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
    }
    this.droitDialog = false;
  }

  // exportPdf(): void {
  //   import('jspdf').then(jsPDF => {
  //     const doc = new jsPDF.default('l');
  //     doc.autoTable(this.exportColumns, this.droitList);
  //     doc.save('droits.pdf');
  //     // import('jspdf-autotable').then(x => {
  //     // });
  //   });
  // }

exportExcel(): void {
  Helpers.exportExcel('droits', this.droitList)
}



onChange(e: any): void{
  const input = $('input#file');
  this.file.push(input.prop('files')[0]);
}


saveManyDroit(e: Event): void{

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
        let droits = JSON.parse(json_object);
        // console.log(droits);
      });
    });
  }  
};


}
