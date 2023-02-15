import { FiliereBuilder } from 'src/app/shared/interfaces/filiere.interface.builder';
// import {Filiere} from './filiere.interface'

export interface Specialite {
  code: string;
  libelle: string;
  statutVie: string | null | undefined;
  description: string | null | undefined;
  filiere: FiliereBuilder | string;
  createurId: number;
  modificateurId: number;
}
