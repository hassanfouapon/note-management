import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {TooltipModule} from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radioButton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule  } from 'ngx-extended-pdf-viewer';
import { SpecialitesComponent } from './components/specialites/specialites.component';
import {
  AnneeAcademiqueComponent,
} from 'src/app/modules/admin/components/annee-academique/annee-academique.component';
import {
  DroitComponent,
} from 'src/app/modules/admin/components/droit/droit.component';
import {
  FiliereComponent,
} from 'src/app/modules/admin/components/filiere/filiere.component';
import {
  NiveauComponent,
} from 'src/app/modules/admin/components/niveau/niveau.component';
import {
  RoleComponent,
} from 'src/app/modules/admin/components/role/role.component';
import {
  HeaderComponent,
} from 'src/app/shared/components/header/header.component';
import {
  SideBarComponent,
} from 'src/app/shared/components/side-bar/side-bar.component';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SemestreComponent } from './components/semestre/semestre.component';
import { ClasseComponent } from './components/classe/classe.component';
import { CandidatComponent } from './components/candidat/candidat.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';

@NgModule({
  declarations: [AdminComponent,SpecialitesComponent,SemestreComponent, FiliereComponent, SideBarComponent, HeaderComponent, AnneeAcademiqueComponent, NiveauComponent, RoleComponent, DroitComponent, ClasseComponent, CandidatComponent, EtudiantComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    ToolbarModule,
    ConfirmDialogModule,
    RadioButtonModule,
    ButtonModule,
    DialogModule,
    FileUploadModule,
    CalendarModule,
    TooltipModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule
  ]
})
export class AdminModule { }
