import { Candidat } from 'src/app/shared/models/candidat.interface';

export class CandidatBuilder {
  private code: string = "";
  private libelle: string = "";
  private statutVie: string | null | undefined = "";
  private statut: string | null | undefined = "";
  private description: string | null | undefined = "";
  private dateNaissance: string | Date | undefined = "";
  private email: string = "";
  private nom: string = "";
  private prenom: string = "";
  private sexe: string = "";
  private telephone: string = "";
  private ecoleOrigine: string = "";
  private lieuNaissance: string = "";
  private nomDeLaMere: string = "";
  private nomDuPere: string = "";
  private professionDelaMere: string = "";
  private professionDuPere: string = "";
  private regionOrigine: string = "";
  private telephoneDeLaMere: string = "";
  private telephoneDuPere: string = "";
  private classeId: string = "";
  private createurId: number = 1;
  private modificateurId: number = 1;

  public build(): Candidat {
    return {
      code: this.code,
      libelle: this.libelle,
      statutVie: this.statutVie,
      description: this.description,
      dateNaissance: this.dateNaissance,
      email: this.email,
      nom: this.nom,
      prenom: this.prenom,
      sexe: this.sexe,
      telephone: this.telephone,
      ecoleOrigine: this.ecoleOrigine,
      lieuNaissance: this.lieuNaissance,
      nomDeLaMere: this.nomDeLaMere,
      nomDuPere: this.nomDuPere,
      professionDelaMere: this.professionDelaMere,
      professionDuPere: this.professionDuPere,
      regionOrigine: this.regionOrigine,
      telephoneDeLaMere: this.telephoneDeLaMere,
      telephoneDuPere: this.telephoneDuPere,
      classId: this.classId,
      createurId: this.createurId,
      modificateurId: this.modificateurId,
      statut: this.statut
    };
  }

  public withCode(value: string):this {
    this.code = value;
    return this;
  }

  public withLibelle(value: string):this {
    this.libelle = value;
    return this;
  }

  public withStatutVie(value: string | null | undefined):this {
    this.statutVie = value;
    return this;
  }
  public withStatut(value: string | null | undefined):this {
    this.statut = value;
    return this;
  }

  public withDescription(value: string | null | undefined):this {
    this.description = value;
    return this;
  }

  public withDateNaissance(value: string | Date | undefined):this {
    this.dateNaissance = value;
    return this;
  }

  public withEmail(value: string):this {
    this.email = value;
    return this;
  }

  public withNom(value: string):this {
    this.nom = value;
    return this;
  }

  public withPrenom(value: string):this {
    this.prenom = value;
    return this;
  }

  public withSexe(value: string):this {
    this.sexe = value;
    return this;
  }

  public withTelephone(value: string):this {
    this.telephone = value;
    return this;
  }

  public withEcoleOrigine(value: string):this {
    this.ecoleOrigine = value;
    return this;
  }

  public withLieuNaissance(value: string):this {
    this.lieuNaissance = value;
    return this;
  }

  public withNomDeLaMere(value: string):this {
    this.nomDeLaMere = value;
    return this;
  }

  public withNomDuPere(value: string):this {
    this.nomDuPere = value;
    return this;
  }

  public withprofessionDelaMere(value: string):this {
    this.professionDelaMere = value;
    return this;
  }

  public withProfessionDuPere(value: string):this {
    this.professionDuPere = value;
    return this;
  }

  public withRegionOrigine(value: string):this {
    this.regionOrigine = value;
    return this;
  }

  public withTelephoneDeLaMere(value: string):this {
    this.telephoneDeLaMere = value;
    return this;
  }

  public withTelephoneDuPere(value: string):this {
    this.telephoneDuPere = value;
    return this;
  }

  public withClassId(value: string):this {
    this.classId = value;
    return this;
  }

  public withCreateurId(value: number):this {
    this.createurId = value;
    return this;
  }

  public withModificateurId(value: number):this {
    this.modificateurId = value;
    return this;
  }
}
