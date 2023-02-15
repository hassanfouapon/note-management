import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AnneeAcademiqueService } from 'src/app/services/others/anneeAcademique.service';
import { SemestreService } from 'src/app/services/others/semestre.service';
import { Helpers } from 'src/app/shared/helpers/helper';
import { AnneeAcademiqueBuilder } from 'src/app/shared/interfaces/anneeAcademique.inteface.builder';
import { AnneeAcademique } from 'src/app/shared/models/anneeAcademique.inteface';
import { Semestre } from 'src/app/shared/models/semestre.interface';

@Component({
  selector: 'app-semestre',
  templateUrl: './semestre.component.html',
  styleUrls: ['./semestre.component.scss'],
  providers: [ConfirmationService, MessageService, SemestreService, AnneeAcademiqueService]
})
export class SemestreComponent implements OnInit {

  semestreDialog = false;
  anneeAcademiqueLibelle = '';
  userId = 1;
  isGettingAll = true;
  senddingRequest = false;
  search = '';
  exportColumns: any[] | undefined;
  isUpdating = false;
  semestreList: Semestre[] = [];
  anneeAcademiqueList: AnneeAcademique[] = [];
  semestre: Semestre = {
    code: '',
    libelle: '',
    statutVie: '',
    description: '',
    createurId: 0,
    modificateurId: 0,
    dateCloture: '',
    dateDebut: '',
    anneeAcademique: ""
  };
  newSemestre = {
    code: '',
    libelle: '',
    statutVie: 'ACTIVE',
    description: '',
    createurId: 0,
    modificateurId: 0,
    dateCloture: '',
    dateDebut: '',
    anneeAcademique: ""
  };
  file: any[] = [];
  semestreForm = this.formBuilder.group({
    libelle: new FormControl('', [Validators.required]),
    anneeAcademique: new FormControl('', [Validators.required]),
    statutVie: new FormControl('ACTIVE', [Validators.required]),
    date_debut: new FormControl('ACTIVE', [Validators.required]),
    date_cloture: new FormControl('ACTIVE', [Validators.required]),
    description: new FormControl('', [Validators.minLength(30)])
  })
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private semestreService: SemestreService,
    private anneeAcademiqueService: AnneeAcademiqueService
  ) { }

  ngOnInit(): void {

    //recuperer semstres de la bd
    this.semestreService.all().toPromise().then(
      (semestre: any) => {
        this.semestreList = semestre;
        console.log(semestre[0]);
        this.isGettingAll = false;
        this.getAllAnneeAcademique();
      }, (res: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'erreur',
          detail: 'erreur du chargement des données veuillez ressayez plustard',
          life: 3000
        });
      }
    );

    this.exportColumns = [
      { dataKey: 'libelle', title: 'Libelle' },
      { dataKey: 'date_debut', title: 'Date Debut' },
      { dataKey: 'date_cloture', title: 'Date Fin' },
      { dataKey: 'statutVie', title: 'Status' },
      { dataKey: 'description', title: 'Description' },
    ]
  }
  getAllAnneeAcademique() {
    this.anneeAcademiqueService.all().toPromise().then(
      (data: any) => {
        console.log(data[0]);
        this.anneeAcademiqueList = data;
        this.isGettingAll = false;
      },
      (res: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'erreur',
          detail: 'erreur du chargement des données veuillez ressayez plustard',
          life: 3000
        });
      }
    );
  }


  hideDialog(): void {
    this.semestreDialog = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmer',
      detail: 'operation non terminée ou annulée',
      life: 3000
    });
  }


  createSemestre(): void {
    this.semestreDialog = true;
    this.isGettingAll = false;
    this.semestre = this.newSemestre;
  }

  exportExcel() {
    // import('xlsx').then(xlsx => {
    //   const worksheet = xlsx.utils.json_to_sheet(this.semestreList);
    //   const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    //   const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    //   this.saveAsExcelFile(excelBuffer, 'semestres');
    // });
    Helpers.exportExcel('semestre', this.semestreList)

  }

  onChange(e: any): void {
    const input = $('input#file');
    this.file.push(input.prop('files')[0]);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  editSemestres(Semestre: Semestre, e: Event): void {
    console.log(Semestre);
    const dD = new Date(Date.parse(this.semestre.dateDebut ? this.semestre.dateDebut.toString() : ""));
    const dC = new Date(Date.parse(this.semestre.dateCloture ? this.semestre.dateCloture.toString() : ""));
    e.stopPropagation();
    this.semestre = Semestre;
    this.isUpdating = true;
    this.semestreDialog = true;
    this.semestre.dateDebut = `${dD.getDate()}-${dD.getMonth() + 1}-${dD.getFullYear()}`;
    this.semestre.dateCloture = `${dC.getDate()}-${dC.getMonth() + 1}-${dC.getFullYear()}`;
    this.anneeAcademiqueLibelle = this.anneeAcademiqueList.filter((el) => { return el.libelle == Semestre.anneeAcademique })[0]!.libelle;


  }

  annuler(): void {
    if (this.isUpdating === false) {
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
    }
    this.semestreDialog = false;
  }

  dropSemestres(id: string): void {
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer  ' + this.semestre.libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isGettingAll = true;
        this.semestreService.delete(id).toPromise().then((data) => {
          this.isGettingAll = false;
          // tslint:disable-next-line:max-line-length
          this.messageService.add({ severity: 'success', summary: 'success', detail: `filiere N° ${id} supprimer avec success`, life: 3000 });
          // tslint:disable-next-line:triple-equals
          this.semestreList = this.semestreList.filter(it => it.code != id);
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
      }
    });
  }


  saveSemestre(e: Event): void {
    const dD = new Date(Date.parse(this.semestre.dateDebut ? this.semestre.dateDebut.toString() : ""));
    const dC = new Date(Date.parse(this.semestre.dateCloture ? this.semestre.dateCloture.toString() : ""));
    this.semestre.createurId = this.userId;
    this.semestre.modificateurId = this.userId;
    this.semestre.dateDebut = `${dD.getDate()}-${dD.getMonth() + 1}-${dD.getFullYear()}`;
    this.semestre.dateCloture = `${dC.getDate()}-${dC.getMonth() + 1}-${dC.getFullYear()}`;
    // initiate the request
    this.senddingRequest = true;
    if (this.isUpdating) {
      const semestre = {
        code: this.semestre.code,
        libelle: this.semestre.libelle,
        dateCloture: this.semestre.dateCloture,
        dateDebut: this.semestre.dateDebut,
        annee_academique: this.anneeAcademiqueLibelle,
        description: this.semestre.description,
        statutVie: this.semestre.statutVie,
        createurId: this.semestre.createurId,
        modificateurId: this.semestre.modificateurId,

      };
      // this.filiereCode = ''
      this.semestreService.update(semestre).toPromise().then((data) => {
        console.log(data)
        let id = this.semestreList.findIndex((el) => { return el.code == this.semestre.code });
        this.semestreList[id] = data;
        this.senddingRequest = false;
        this.semestreDialog = false;
        this.semestre = this.newSemestre;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmer',
          detail: 'Le semestre a été modifiée avec success',
          life: 3000
        });
      },
        (res) => {
          this.senddingRequest = false;
          // tslint:disable-next-line:max-line-length
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification du semestre', life: 3000 });
        });
    } else {
      const semestre = {
        code: this.semestre.code,
        libelle: this.semestre.libelle,
        dateCloture: this.semestre.dateCloture,
        dateDebut: this.semestre.dateDebut,
        annee_academique: this.anneeAcademiqueLibelle,
        description: this.semestre.description,
        statutVie: this.semestre.statutVie,
        createurId: this.semestre.createurId,
        modificateurId: this.semestre.modificateurId,
      };
      this.semestreService.create(semestre).toPromise().then((data) => {
        // console.log(data);
        this.semestreList.push(data);
        this.newSemestre = {
          code: '',
          libelle: '',
          statutVie: 'ACTIVE',
          description: '',
          createurId: 0,
          modificateurId: 0,
          dateCloture: '',
          dateDebut: '',
          anneeAcademique: ""
        };
        this.anneeAcademiqueLibelle = ''
        this.semestre = this.newSemestre;
        this.senddingRequest = false;
        this.semestreDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmer',
          detail: 'Le semestre a été créé avec succès',
          life: 3000
        });
      },
        (res) => {
          this.senddingRequest = false;
          // tslint:disable-next-line:max-line-length
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation du semestre', life: 3000 });
        });
    }


  }


  resetRequestVariable(message: string): void {
    this.senddingRequest = false;
    this.semestreDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Confirmer',
      detail: message,
      life: 3000
    });
    this.semestre = {
      code: '',
      libelle: '',
      statutVie: 'ACTIVE',
      description: '',
      createurId: 0,
      modificateurId: 0,
      dateCloture: '',
      dateDebut: '',
      anneeAcademique: ""
    };
  }

  saveManysemestre(e: Event): void{

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
          let yearsList = JSON.parse(json_object);
          // console.log(yearsList);
        });
      });
    }
  };


}
