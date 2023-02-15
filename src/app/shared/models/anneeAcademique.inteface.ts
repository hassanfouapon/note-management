export interface AnneeAcademique{
  code: string;
  libelle: string;
  statutVie: string | null | undefined;
  description: string | null | undefined;
  createurId?: number;
  modificateurId?: number;
  dateDebut?: string | Date;
  dateCloture?: string | Date;
}
