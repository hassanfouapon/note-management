import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FiliereService } from 'src/app/services/others/filieres.service';
import { SpecialitesService } from 'src/app/services/others/specialites.service';
import { FiliereBuilder } from 'src/app/shared/interfaces/filiere.interface.builder';
import { Filiere } from 'src/app/shared/models/filiere.interface';
import { Specialite } from 'src/app/shared/models/specialite.interface';

@Component({
  selector: 'app-specialites',
  templateUrl: './specialites.component.html',
  styleUrls: ['./specialites.component.scss'],
  providers: [ConfirmationService, MessageService, SpecialitesService, FiliereService]
})
export class SpecialitesComponent implements OnInit {

  specialiteDialog = false;
  filiereCode = ''
  userId = 1;
  isGettingAll = true;
  senddingRequest = false;
  search = '';
  exportColumns: any[] | undefined;
  isUpdating = false;
  specialiteList: Specialite[] = [];
  filieresList: Filiere[] = [];
  specialite: Specialite = {
    code: '',
    libelle: '',
    statutVie: '',
    description: '',
    filiere: new FiliereBuilder(),
    createurId: 0,
    modificateurId: 0
  };
  newSpecialite = {
    code: '',
    libelle: '',
    statutVie: 'ACTIVE',
    description: '',
    filiere:  new FiliereBuilder(),
    createurId: 0,
    modificateurId: 0
  };
  specialiteForm = this.formBuilder.group({
    libelle: new FormControl('', [Validators.required]),
    filiere: new FormControl('', [Validators.required]),
    statutVie: new FormControl('ACTIVE', [Validators.required]),
    description: new FormControl('', [Validators.minLength(30)])
  });

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private specialitesService: SpecialitesService,
    private filiereService: FiliereService
  ) { }

  ngOnInit(): void {

    // recuperer les specialites de la base de données
    this.specialitesService.all().toPromise().then(
      (specialite: any) => {
        this.specialiteList = specialite;
        this.isGettingAll = false;
        this.getAllFiliere();
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

    // export array
    this.exportColumns = [
      { dataKey: 'libelle', title: 'Libelle' },
      // { dataKey: 'filiere', title: 'Filiere' },
      { dataKey: 'description', title: 'Description' },
      { dataKey: 'statutVie', title: 'Status' },
    ];
  }

  getAllFiliere(){
        // recuperer les specialites de la base de données
        this.filiereService.all().toPromise().then(
          (data: any) => {
            this.filieresList = data;
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
    this.specialiteDialog = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmer',
      detail: 'operation non terminée ou annulée',
      life: 3000
    });
  }


  createSpecialites(): void {
    this.specialiteDialog = true;
    this.isUpdating = false;
    this.specialite = this.newSpecialite;
  }

  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.specialiteList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'specialites');
    });

  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  editSpecialites(Specialite: Specialite, e: Event): void {
    e.stopPropagation();
    this.specialite = Specialite;
    this.isUpdating = true;
    this.specialiteDialog = true;
    this.filiereCode = this.filieresList.filter((el) => { return el.libelle == Specialite.filiere})[0].code;

  }

  annuler(): void {
    if (this.isUpdating === false) {
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
    }
    this.specialiteDialog = false;
  }

  dropSpecialites(id: string): void {
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer  ' + this.specialite.libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isGettingAll = true;
        this.specialitesService.delete(id).toPromise().then((data) => {
          this.isGettingAll = false;
          // tslint:disable-next-line:max-line-length
          this.messageService.add({ severity: 'success', summary: 'success', detail: `filiere N° ${id} supprimer avec success`, life: 3000 });
          // tslint:disable-next-line:triple-equals
          this.specialiteList = this.specialiteList.filter(it => it.code != id);
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
      }
    });
  }

  saveSpecialite(e: Event): void {
    this.specialite.createurId = this.userId;
    this.specialite.modificateurId = this.userId;
    // initiate the request
    this.senddingRequest = true;
    if (this.isUpdating) {
      const specialite = {
        code: this.specialite.code,
        libelle: this.specialite.libelle,
        filiereId: this.filiereCode,
        description: this.specialite.description,
        statutVie: this.specialite.statutVie,
        createurId: this.specialite.createurId,
        modificateurId: this.specialite.modificateurId,

      };
      // this.filiereCode = ''
      this.specialitesService.update(specialite).toPromise().then((data) => {
        console.log(data)
        let id = this.specialiteList.findIndex((el) => {return el.code == this.specialite.code});
        this.specialiteList[id] = data;
        this.senddingRequest = false;
        this.specialiteDialog = false;
        this.specialite = this.newSpecialite;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmer',
          detail: 'La specialite a été modifiée avec success',
          life: 3000
        });
      },
        (res) => {
          this.senddingRequest = false;
          // tslint:disable-next-line:max-line-length
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification de la specialité', life: 3000 });
        });
    } else {
      const specialite = {
        libelle: this.specialite.libelle,
        filiereId: this.filiereCode,
        description: this.specialite.description,
        statutVie: this.specialite.statutVie,
        createurId: this.specialite.createurId,
        modificateurId: this.specialite.modificateurId,
      };
      this.specialitesService.create(specialite).toPromise().then((data) => {
        // console.log(data);
        this.specialiteList.push(data);
        this.newSpecialite = {
          code: '',
          libelle: '',
          statutVie: 'ACTIVE',
          description: '',
          filiere:  new FiliereBuilder(),
          createurId: 0,
          modificateurId: 0
        };
        this.filiereCode = ''
        this.specialite = this.newSpecialite;
        this.senddingRequest = false;
        this.specialiteDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmer',
          detail: 'La Spécialité a été créée avec success',
          life: 3000
        });
      },
        (res) => {
          this.senddingRequest = false;
          // tslint:disable-next-line:max-line-length
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation de la spécialité', life: 3000 });
        });
    }


  }

}
