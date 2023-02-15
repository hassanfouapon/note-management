export interface Candidat{
    code: string;
    libelle: string;
    statutVie: string | null | undefined;
    statut: string | null | undefined;
    description: string | null | undefined;

    dateNaissance: string | Date | undefined;
    email: string;
    nom: string;
    prenom: string;
    sexe: string;
    telephone: string;
    ecoleOrigine: string;
    lieuNaissance: string;
    nomDeLaMere: string;
    nomDuPere: string;
    professionDelaMere: string;
    professionDuPere: string;
    regionOrigine: string;
    telephoneDeLaMere: string;
    telephoneDuPere: string;
    classId: string;

    createurId: number;
    modificateurId: number;
}
