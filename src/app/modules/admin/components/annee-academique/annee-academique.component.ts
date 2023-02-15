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
import {
  AnneeAcademiqueService,
} from 'src/app/services/others/anneeAcademique.service';
import { Helpers } from 'src/app/shared/helpers/helper';
import { UserHelper } from 'src/app/shared/helpers/user';
import {
  AnneeAcademique,
} from 'src/app/shared/models/anneeAcademique.inteface';

@Component({
  selector: 'app-annee-academique',
  templateUrl: './annee-academique.component.html',
  styleUrls: ['./annee-academique.component.scss'],
  providers: [MessageService, ConfirmationService, AnneeAcademiqueService]
})
export class AnneeAcademiqueComponent implements OnInit {

  yearDialog = false;
  userId = 0;
  isGettingAll = true;
  senddingRequest = false;
  isUpdating = false;
  search = '';
  YearsList: AnneeAcademique[] = [];
  AcademicYear: AnneeAcademique = {
    code: '',
    libelle: '',
    statutVie: 'ACTIVE',
    description: ''
  };

  fileDialog = false;
  file: any[] = [];
  fileForm = this.formBuilder.group({
    file: new FormControl('', [Validators.required]),
  });
  AcademicYearForm = this.formBuilder.group({
    code: new FormControl('', []),
    libelle: new FormControl('', [Validators.required]),
    dateDebut: new FormControl('', [Validators.required]),
    dateCloture: new FormControl('', [Validators.required]),
    statutVie: new FormControl('ACTIVE', [Validators.required]),
    description: new FormControl('', [Validators.minLength(30)])
  });
  exportColumns: any[] = [];



  constructor(
    private anneeService: AnneeAcademiqueService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    const user = UserHelper.getUser();
    this.userId = user.id;
    this.getAllYears();
  }


  getAllYears(): void{
    this.anneeService.all().toPromise().then((data) => {
      this.YearsList = data;
      console.log(data);
      this.isGettingAll = false;
      // console.log(data);
    });
  }

  handleFileDialog(): void{
    this.fileDialog = true;
  }

  hideDialog(): void {
    this.yearDialog = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmer',
      detail: 'operation non terminer ou annuler',
      life: 3000
    });
  }

  createAcademicYear(): void{
    this.yearDialog = true;
    this.isUpdating = false;
    this.AcademicYear = {
      code: '',
      libelle: '',
      statutVie: 'ACTIVE',
      description: ''
    };

    console.log(this.AcademicYear);
  }

  editAcademicYear(academicYear: AnneeAcademique, e: Event): void{
    e.stopPropagation();

    const dD = new Date(Date.parse(academicYear.dateDebut ? academicYear.dateDebut.toString() : ""));
    const dC = new Date(Date.parse(academicYear.dateCloture ? academicYear.dateCloture.toString() : ""));
    // this.AcademicYear = academicYear;
    this.AcademicYear.code = academicYear.code;
    this.AcademicYear.libelle = academicYear.libelle;
    this.AcademicYear.description = academicYear.description;
    this.AcademicYear.statutVie = academicYear.statutVie;
    this.AcademicYear.dateDebut = `${dD.getDate()}-${dD.getMonth()+1}-${dD.getFullYear()}`;
    this.AcademicYear.dateCloture = `${dC.getDate()}-${dC.getMonth()+1}-${dC.getFullYear()}`;
    this.isUpdating = true;
    this.yearDialog = true;

    // console.log(this.AcademicYear);
  }

  saveAcademicYear(e: Event): void {
    e.preventDefault();
    const dD = new Date(Date.parse(this.AcademicYear.dateDebut ? this.AcademicYear.dateDebut.toString() : ""));
    const dC = new Date(Date.parse(this.AcademicYear.dateCloture ? this.AcademicYear.dateCloture.toString() : ""));
    this.AcademicYear.dateDebut = `${dD.getDate()}-${dD.getMonth()+1}-${dD.getFullYear()}`;
    this.AcademicYear.dateCloture = `${dC.getDate()}-${dC.getMonth()+1}-${dC.getFullYear()}`;
    console.log(this.AcademicYear.dateDebut);

    // return;

    // take connect user id
    this.AcademicYear.createurId = this.userId;
    this.AcademicYear.modificateurId = this.userId;
    const year = {
      libelle: this.AcademicYear.libelle,
      description: this.AcademicYear.description,
      createurId: this.userId,
      modificateurId: this.userId,
      statutVie: this.AcademicYear.statutVie,
      dateDebut: this.AcademicYear.dateDebut,
      dateCloture: this.AcademicYear.dateCloture,
    };
    // initiate the request
    this.senddingRequest = true;

    if (this.isUpdating){
      this.anneeService.update({
        code: this.AcademicYear.code,
        ...year
      }).toPromise().then((data) => {
        this.getAllYears()
        if(data != null){
          this.resetRequestVariable("Annee acadmique modifiée avec success");
        }else{
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: "une erreur est survenue lors de la modification", life: 3000 });
        }
      },
      (res) => {
        this.senddingRequest = false;
        this.yearDialog = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification', life: 3000 });
      });
    }else{
      this.anneeService.create(year).toPromise().then((data) => {
        if(data != null){
          this.YearsList.push(data);
          this.resetRequestVariable("Annee acadmique créee avec success");
          // this.getAllYears()
        }else{
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: "une erreur est survenue lors de la creation surement une probleme de date", life: 3000 });
        }
        
      },
      (res) => {
        this.senddingRequest = false;
        this.yearDialog = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation', life: 3000 });
      });
    }


  }

  resetRequestVariable(message: string): void{
    this.senddingRequest = false;
    this.yearDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Confirmer',
      detail: message,
      life: 3000
    });
    this.AcademicYear =  {
      code: '',
      libelle: '',
      statutVie: 'ACTIVE',
      description: ''
    };
  }


  dropAcademicYear(id: string, libelle:string): void{
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer  ' + libelle + '? noter que ça suppression inplique la supprimer de tout les données qui luisont liées',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isGettingAll = true;
        this.anneeService.delete(id).toPromise().then((data) => {
          this.isGettingAll = false;
          console.log(data);
          if(data != null){
            this.messageService.add({ severity: 'error', summary: 'erreur', detail: data, life: 3000 });
          }else{
            // tslint:disable-next-line:max-line-length
            this.messageService.add({ severity: 'success', summary: 'success', detail: `annee academique N° ${id} supprimer avec success`, life: 3000 });
            // tslint:disable-next-line:triple-equals
            this.YearsList = this.YearsList.filter( it  => it.code != id );
          }
        }, (res)=>{
          this.isGettingAll = false
          console.log(res);
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: res.error.error, life: 3000 });
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
    this.yearDialog = false;
  }


  exportExcel(): void {
    Helpers.exportExcel('annee-academique', this.YearsList)
  }

  
onChange(e: any): void{
  const input = $('input#file');
  this.file.push(input.prop('files')[0]);
}


saveManyAcademicYear(e: Event): void{

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
