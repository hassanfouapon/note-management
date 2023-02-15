import { Droit } from 'src/app/shared/models/droit.interface';

export class DroitBuilder {
  private code: string = "";
  private roleId: number = 1;
  private roleName: string | null = "";
  private libelle: string = "";
  private statutVie: string = "ACTIVE";
  private description: string | null | undefined = "";
  private categorie: string = "";
  private lecture: boolean = false;
  private ecriture: boolean = false;
  private modification: boolean = false;
  private suppression: boolean = false;
  private createurId: number = 1;
  private modificateurId: number = 1;

  public build(): Droit {
    return {
      code: this.code,
      roleId: this.roleId,
      roleName: this.roleName,
      libelle: this.libelle,
      statutVie: this.statutVie,
      description: this.description,
      categorie: this.categorie,
      lecture: this.lecture,
      ecriture: this.ecriture,
      modification: this.modification,
      suppression: this.suppression,
      createurId: this.createurId,
      modificateurId: this.modificateurId
    };
  }

  public withCode(value: string) {
    this.code = value;
    return this;
  }

  public withRoleId(value: number) {
    this.roleId = value;
    return this;
  }

  public withRoleName(value: string | null) {
    this.roleName = value;
    return this;
  }

  public withLibelle(value: string) {
    this.libelle = value;
    return this;
  }

  public withStatutVie(value: string) {
    this.statutVie = value;
    return this;
  }

  public withDescription(value: string | null | undefined) {
    this.description = value;
    return this;
  }

  public withCategorie(value: string) {
    this.categorie = value;
    return this;
  }

  public withLecture(value: boolean) {
    this.lecture = value;
    return this;
  }

  public withEcriture(value: boolean) {
    this.ecriture = value;
    return this;
  }

  public withModification(value: boolean) {
    this.modification = value;
    return this;
  }

  public withSuppression(value: boolean) {
    this.suppression = value;
    return this;
  }

  public withCreateurId(value: number) {
    this.createurId = value;
    return this;
  }

  public withModificateurId(value: number) {
    this.modificateurId = value;
    return this;
  }
}
