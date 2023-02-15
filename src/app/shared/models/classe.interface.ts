export interface Classe{
    code: string;
    libelle: string;
    statutVie: string;
    description: string | null | undefined;
    createurId: number;
    modificateurId: number;
    niveau: string;
    specialite: string;
}