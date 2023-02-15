import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialitesComponent } from './components/specialites/specialites.component';
import {
  AnneeAcademiqueComponent,
} from 'src/app/modules/admin/components/annee-academique/annee-academique.component';
import {
  CandidatComponent,
} from 'src/app/modules/admin/components/candidat/candidat.component';
import {
  ClasseComponent,
} from 'src/app/modules/admin/components/classe/classe.component';
import {
  DroitComponent,
} from 'src/app/modules/admin/components/droit/droit.component';
import {
  EtudiantComponent,
} from 'src/app/modules/admin/components/etudiant/etudiant.component';
import {
  FiliereComponent,
} from 'src/app/modules/admin/components/filiere/filiere.component';
import {
  NiveauComponent,
} from 'src/app/modules/admin/components/niveau/niveau.component';
import {
  RoleComponent,
} from 'src/app/modules/admin/components/role/role.component';

import { AdminComponent } from './admin.component';
import { SemestreComponent } from './components/semestre/semestre.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    pathMatch: 'full',
  },
  {
    path: 'filieres',
    component: FiliereComponent
  },
  {
    path: 'specialites',
    component: SpecialitesComponent
  },
  {
    path: 'annee-academique',
    component: AnneeAcademiqueComponent,
  },
  {
    path: 'niveau',
    component: NiveauComponent,
  },
  {
    path: 'droit',
    component: DroitComponent
  },
  {
    path: 'role',
    component: RoleComponent
  },
  {
    path: 'classes',
    component: ClasseComponent
  },
  {
    path: 'semestre',
    component: SemestreComponent
  },{
    path: 'candidats',
    component: CandidatComponent
  },
  {
    path: 'etudiants',
    component: EtudiantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
