import { Classe } from 'src/app/shared/models/classe.interface';

export class ClasseBuilder {
  private code: string = "";
  private libelle: string = "";
  private statutVie: string = "ACTIVE";
  private description: string | null | undefined = "";
  private createurId: number = -1;
  private modificateurId: number = -1;
  private niveau: string = "";
  private specialite: string = "";

  public build(): Classe {
    return {
      code: this.code,
      libelle: this.libelle,
      statutVie: this.statutVie,
      description: this.description,
      createurId: this.createurId,
      modificateurId: this.modificateurId,
      niveau: this.niveau,
      specialite: this.specialite
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

  public withStatutVie(value: string):this {
    this.statutVie = value;
    return this;
  }

  public withDescription(value: string | null | undefined):this {
    this.description = value;
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

  public withNiveau(value: string):this {
    this.niveau = value;
    return this;
  }

  public withSpecialite(value: string):this {
    this.specialite = value;
    return this;
  }
}
