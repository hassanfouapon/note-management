export interface Droit{
    code: string;
    roleId: number;
    roleName: string | null;
    libelle: string;
    statutVie: string;
    description: string | null | undefined;
    categorie: string;
    lecture: boolean;
    ecriture: boolean;
    modification: boolean;
    suppression: boolean;
    createurId: number;
    modificateurId: number;
}