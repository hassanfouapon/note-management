export interface Niveau{
  code: string;
  numero: number;
  libelle: string;
  statutVie: string | null | undefined;
  description: string | null | undefined;
  createurId: number;
  modificateurId: number;
}