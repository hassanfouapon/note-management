
export interface Role{
  code: string;
  libelle: string;
  statutVie: string | null | undefined;
  description: string | null | undefined;
  createurId: number;
  modificateurId: number;
}