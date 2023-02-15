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
import { FiliereService } from 'src/app/services/others/filieres.service';
import { Helpers } from 'src/app/shared/helpers/helper';
import { UserHelper } from 'src/app/shared/helpers/user';
import { Filiere } from 'src/app/shared/models/filiere.interface';

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.scss'],
  providers: [ConfirmationService, MessageService, FiliereService]
})
export class FiliereComponent implements OnInit {

  filiereDialog = false;
  userId = 0;
  isGettingAll = true;
  senddingRequest = false;
  search = '';
  exportColumns: any[] | undefined;
  isUpdating = false;
  filiereList: Filiere[] = [];
  filiere: Filiere = {
    code: '',
    libelle: '',
    statutVie: '',
    description: '',
    createurId: 0,
    modificateurId: 0
  };
  newFiliere = {
    code: '',
    libelle: '',
    statutVie: 'ACTIVE',
    description: '',
    createurId: 0,
    modificateurId: 0
  };
  filiereForm = this.formBuilder.group({
    libelle: new FormControl('', [Validators.required]),
    statutVie: new FormControl('ACTIVE', [Validators.required]),
    description: new FormControl('', [Validators.minLength(30)])
  });
  fileDialog = false;
  file: any[] = [];
  fileForm = this.formBuilder.group({
    file: new FormControl('', [Validators.required]),
  });

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private filiereService: FiliereService
  ) { }

  ngOnInit(): void {
    // todo : get connected user id from local storage
    const user = UserHelper.getUser();
    this.userId = user.id;

    // get filiere from database
    this.filiereService.all().toPromise().then(
      (filiere) => {
        this.filiereList = filiere;
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

    // export array
    // this.exportColumns = [
    //   { dataKey: 'libelle', title: 'Libelle' },
    //   { dataKey: 'description', title: 'Description' },
    //   { dataKey: 'statutVie', title: 'Status' },
    // ];
  }

  handleFileDialog(): void{
    this.fileDialog = true;
  }

  hideDialog(): void {
    this.filiereDialog = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmer',
      detail: 'operation non terminer ou annuler',
      life: 3000
    });
  }

  createFiliere(): void{
    this.filiereDialog = true;
    this.isUpdating = false;
    this.filiere = this.newFiliere;
  }

  editFiliere(filiere: Filiere, e: Event): void{
    e.stopPropagation();
    this.filiere = filiere;
    this.isUpdating = true;
    this.filiereDialog = true;
  }

  saveFiliere(e: Event): void{
    console.log(this.filiere);
    // take connect user id
    this.filiere.createurId = this.userId;
    this.filiere.modificateurId = this.userId;
    // initiate the request
    this.senddingRequest = true;

    if (this.isUpdating){
      const filiere = {
        code: this.filiere.code,
        libelle: this.filiere.libelle,
        description: this.filiere.description,
        statutVie: this.filiere.statutVie,
        createurId: this.filiere.createurId,
        modificateurId: this.filiere.modificateurId,
      };
      this.filiereService.update(filiere).toPromise().then((data) => {
        this.senddingRequest = false;
        this.filiereDialog = false;
        this.filiere = this.newFiliere;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmer',
          detail: 'filiere modifier avec success',
          life: 3000
        });
      },
      (res) => {
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification de la filiere', life: 3000 });
      });
    }else{
      const filiere = {
        libelle: this.filiere.libelle,
        description: this.filiere.description,
        statutVie: this.filiere.statutVie,
        createurId: this.filiere.createurId,
        modificateurId: this.filiere.modificateurId,
      };
      this.filiereService.create(filiere).toPromise().then((data) => {
        // console.log(data);
        this.filiereList.push(data);
        this.newFiliere = {
          code: '',
          libelle: '',
          statutVie: 'ACTIVE',
          description: '',
          createurId: 0,
          modificateurId: 0
        };
        this.filiere = this.newFiliere;
        this.senddingRequest = false;
        this.filiereDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmer',
          detail: 'filiere creer avec success',
          life: 3000
        });
      },
      (res) => {
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation de la filiere', life: 3000 });
      });
    }
  }

  dropFiliere(id: string, libelle:string): void{
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer  ' + libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isGettingAll = true;
        this.filiereService.delete(id).toPromise().then((data) => {
          this.isGettingAll = false;
          // tslint:disable-next-line:max-line-length
          this.messageService.add({ severity: 'success', summary: 'success', detail: `filiere N° ${id} supprimer avec success`, life: 3000 });
          // tslint:disable-next-line:triple-equals
          this.filiereList = this.filiereList.filter( it  => it.code != id );
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
      }
    });
  }

  annuler(): void{
    if (this.isUpdating === false) {
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
    }
    this.filiereDialog = false;
  }

  // exportPdf(): void {
  //   import('jspdf').then(jsPDF => {
  //     const doc = new jsPDF.default('l');
  //     doc.autoTable(this.exportColumns, this.filiereList);
  //     doc.save('filieres.pdf');
  //     // import('jspdf-autotable').then(x => {
  //     // });
  //   });
  // }

exportExcel(): void {
  Helpers.exportExcel('filieres', this.filiereList)
}


onChange(e: any): void{
  const input = $('input#file');
  this.file.push(input.prop('files')[0]);
}


saveManyNiveau(e: Event): void{

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
        let filieres = JSON.parse(json_object);
        // console.log(filieres);
      });
    });
  }  
};

}
