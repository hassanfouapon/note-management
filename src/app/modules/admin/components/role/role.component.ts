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
import { RoleService } from 'src/app/services/others/role.service';
import { Helpers } from 'src/app/shared/helpers/helper';
import { UserHelper } from 'src/app/shared/helpers/user';
import { Role } from 'src/app/shared/models/role.interface';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers: [ConfirmationService, MessageService, RoleService]
})
export class RoleComponent implements OnInit {

  roleDialog = false;
  fileDialog = false;
  file: any[] = [];
  userId = 0;
  isGettingAll = true;
  senddingRequest = false;
  search = '';
  isUpdating = false;
  roleList: Role[] = [];
  role: Role = {
    code: '',
    libelle: '',
    statutVie: '',
    description: '',
    createurId: 0,
    modificateurId: 0
  };
  newrole: Role = {
    code: '',
    libelle: '',
    statutVie: 'ACTIVE',
    description: '',
    createurId: 0,
    modificateurId: 0
  };
  roleForm = this.formBuilder.group({
    libelle: new FormControl('', [Validators.required]),
    statutVie: new FormControl('ACTIVE', [Validators.required]),
    description: new FormControl('', [Validators.minLength(30)])
  });
  fileForm = this.formBuilder.group({
    file: new FormControl('', [Validators.required]),
  });
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    // todo : get connected user id from local storage
    const user = UserHelper.getUser();
    this.userId = user.id;

    // get role from database
    this.roleService.all().toPromise().then(
      (role) => {
        this.roleList = role;
        this.isGettingAll = false;
      },
      (res) => {
        this.messageService.add({
          severity: 'error',
          summary: 'erreur',
          detail: 'erreur du chargement des données veuillez ressayez plustard',
          life: 3000
        });
      }
    );

  }
  handleFileDialog(): void{
    this.fileDialog = true;
  }

  hideDialog(): void {
    this.roleDialog = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmer',
      detail: 'operation non terminer ou annuler',
      life: 3000
    });
  }

  createRole(): void{
    this.roleDialog = true;
    this.isUpdating = false;
    this.role = this.newrole;
  }

  editRole(role: Role, e: Event): void{
    e.stopPropagation();
    this.role = role;
    this.isUpdating = true;
    this.roleDialog = true;
  }

  saveRole(e: Event): void{
    // take connect user id
    this.role.createurId = this.userId;
    this.role.modificateurId = this.userId;
    // initiate the request
    this.senddingRequest = true;
    const role = {
      libelle: this.role.libelle,
      description: this.role.description,
      statutVie: this.role.statutVie,
      createurId: this.role.createurId,
      modificateurId: this.role.modificateurId,
    };

    if (this.isUpdating){
      this.roleService.update({
        code: this.role.code,
        ...role}
      ).toPromise().then((data) => {
        this.senddingRequest = false;
        this.roleDialog = false;
        this.role = this.newrole;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmer',
          detail: 'role modifier avec success',
          life: 3000
        });
      },
      (res) => {
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification du role', life: 3000 });
      });
    }else{
      this.roleService.create(role).toPromise().then((data) => {
        // console.log(data);
        this.roleList.push(data);
        this.resetData();
        this.senddingRequest = false;
        this.roleDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmer',
          detail: 'role creer avec success',
          life: 3000
        });
      },
      (res) => {
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation du role', life: 3000 });
      });
    }
  }

  dropRole(id: string, libelle:string): void{
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer le role  ' + libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isGettingAll = true;
        this.roleService.delete(id).toPromise().then((data) => {
          this.isGettingAll = false;
          if(data == null){
            // tslint:disable-next-line:max-line-length
            this.messageService.add({ severity: 'success', summary: 'success', detail: `role N° ${id} supprimer avec success`, life: 3000 });
            // tslint:disable-next-line:triple-equals
            this.roleList = this.roleList.filter( it  => it.code != id );
          }
          else{
            this.messageService.add({ severity: 'warn', summary: 'erreur', detail: 'une erreur est survenue lors de la suppression du role', life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'info', detail: 'operation annuler', life: 3000 });
      }
    });
  }

  resetData(){
    this.newrole = {
      code: '',
      libelle: '',
      statutVie: 'ACTIVE',
      description: '',
      createurId: 0,
      modificateurId: 0
    };
    this.role = this.newrole;
  }

  annuler(): void{
    this.resetData();
    if (this.isUpdating === false) {
      this.messageService.add({ severity: 'info', summary: 'info', detail: 'operation annuler', life: 3000 });
    }
    this.roleDialog = false;
  }

  // exportPdf(): void {
  //   import('jspdf').then(jsPDF => {
  //     const doc = new jsPDF.default('l');
  //     doc.autoTable(this.exportColumns, this.roleList);
  //     doc.save('roles.pdf');
  //     // import('jspdf-autotable').then(x => {
  //     // });
  //   });
  // }

  exportExcel(): void {
    Helpers.exportExcel('roles', this.roleList)
  }
  onChange(e: any): void{
    const input = $('input#file');
    this.file.push(input.prop('files')[0]);
  }

  saveManyRole(e: Event): void{

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
          let roles = JSON.parse(json_object);
          // console.log(roles);
        });
      });
    }  
  };
}
