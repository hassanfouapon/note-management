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
import { NiveauService } from 'src/app/services/others/niveau.service';
import { Helpers } from 'src/app/shared/helpers/helper';
import { UserHelper } from 'src/app/shared/helpers/user';
import { Niveau } from 'src/app/shared/models/niveau.interface';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.scss'],
  providers: [ConfirmationService, MessageService, NiveauService]
})
export class NiveauComponent implements OnInit {


  niveauDialog = false;
  userId = 0;
  isGettingAll = true;
  senddingRequest = false;
  search = '';
  exportColumns: any[] | undefined;
  isUpdating = false;
  niveauList: Niveau[] = [];
  niveau: Niveau = {
    code: '',
    numero: 0,
    libelle: '',
    statutVie: '',
    description: '',
    createurId: 0,
    modificateurId: 0
  };
  newniveau = {
    code: '',
    numero: 0,
    libelle: '',
    statutVie: 'ACTIVE',
    description: '',
    createurId: 0,
    modificateurId: 0
  };
  
  fileDialog = false;
  file: any[] = [];
  fileForm = this.formBuilder.group({
    file: new FormControl('', [Validators.required]),
  });
  niveauForm = this.formBuilder.group({
    libelle: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required]),
    statutVie: new FormControl('ACTIVE', [Validators.required]),
    description: new FormControl('', [Validators.minLength(30)])
  });
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private niveauService: NiveauService
  ) { }

  ngOnInit(): void {
    // todo : get connected user id from local storage
    const user = UserHelper.getUser();
    this.userId = user.id;

    // get niveau from database
    this.niveauService.all().toPromise().then(
      (niveau) => {
        this.niveauList = niveau;
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
    this.niveauDialog = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmer',
      detail: 'operation non terminer ou annuler',
      life: 3000
    });
  }

  createNiveau(): void{
    this.niveauDialog = true;
    this.isUpdating = false;
    this.niveau = this.newniveau;
  }

  editNiveau(niveau: Niveau, e: Event): void{
    e.stopPropagation();
    this.niveau = niveau;
    this.isUpdating = true;
    this.niveauDialog = true;
  }

  saveNiveau(e: Event): void{
    // take connect user id
    this.niveau.createurId = this.userId;
    this.niveau.modificateurId = this.userId;
    // initiate the request
    this.senddingRequest = true;
    const niveau = {
      libelle: this.niveau.libelle,
      numero: this.niveau.numero,
      description: this.niveau.description,
      statutVie: this.niveau.statutVie,
      createurId: this.niveau.createurId,
      modificateurId: this.niveau.modificateurId,
    };

    if (this.isUpdating){
      this.niveauService.update({
        code: this.niveau.code, 
        ...niveau}
      ).toPromise().then((data) => {
        this.senddingRequest = false;
        this.niveauDialog = false;
        this.niveau = this.newniveau;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmer',
          detail: 'niveau modifier avec success',
          life: 3000
        });
      },
      (res) => {
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification du niveau', life: 3000 });
      });
    }else{
      this.niveauService.create(niveau).toPromise().then((data) => {
        // console.log(data);
        this.niveauList.push(data);
        this.newniveau = {
          code: '',
          libelle: '',
          numero: 0,
          statutVie: 'ACTIVE',
          description: '',
          createurId: 0,
          modificateurId: 0
        };
        this.niveau = this.newniveau;
        this.senddingRequest = false;
        this.niveauDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmer',
          detail: 'niveau creer avec success',
          life: 3000
        });
      },
      (res) => {
        this.senddingRequest = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation du niveau', life: 3000 });
      });
    }
  }

  dropNiveau(id: string, libelle:string): void{
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer  ' + libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isGettingAll = true;
        this.niveauService.delete(id).toPromise().then((data) => {
          this.isGettingAll = false;
          if(data == null){
            // tslint:disable-next-line:max-line-length
            this.messageService.add({ severity: 'success', summary: 'success', detail: `niveau N° ${id} supprimer avec success`, life: 3000 });
            // tslint:disable-next-line:triple-equals
            this.niveauList = this.niveauList.filter( it  => it.code != id );
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'une erreur est survenue lors de la suppression', life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
      }
    });
  }

  annuler(): void{
    this.newniveau = {
      code: '',
      libelle: '',
      numero: 0,
      statutVie: 'ACTIVE',
      description: '',
      createurId: 0,
      modificateurId: 0
    };
    this.niveau = this.newniveau;
    if (this.isUpdating === false) {
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
    }
    this.niveauDialog = false;
  }

  // exportPdf(): void {
  //   import('jspdf').then(jsPDF => {
  //     const doc = new jsPDF.default('l');
  //     doc.autoTable(this.exportColumns, this.niveauList);
  //     doc.save('niveaus.pdf');
  //     // import('jspdf-autotable').then(x => {
  //     // });
  //   });
  // }

exportExcel(): void {
  Helpers.exportExcel('niveaux', this.niveauList)
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
        let niveaux = JSON.parse(json_object);
        // console.log(niveaux);
      });
    });
  }  
};


}
