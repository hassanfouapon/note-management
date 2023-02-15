export interface Semestre{
  code: string;
  libelle: string;
  description: string;
  createurId: number;
  modificateurId: number;
  statutVie: string | null | undefined;
  dateCloture: string | Date;
  dateDebut: string | Date;
  anneeAcademique:  string;
}
