import { Specialite } from "../models/specialite.interface";
import { FiliereBuilder } from "./filiere.interface.builder";

export class SpecialiteBuilder {
  public code = '';
  private libelle = '';
  private statutVie: string | null | undefined = undefined;
  private description: string | null | undefined = undefined;
  private filiere:FiliereBuilder=  new FiliereBuilder();
  private createurId = 1;
  private modificateurId = 1;

  public build(): Specialite {
    return {
      code: this.code,
      libelle: this.libelle,
      statutVie: this.statutVie,
      filiere: this.filiere,
      description: this.description,
      createurId: this.createurId,
      modificateurId: this.modificateurId
    };
  }

  public withCode(value: string): this {
    this.code = value;
    return this;
  }


  public withLibelle(value: string): this {
    this.libelle = value;
    return this;
  }


  public withStatutVie(value: string): this {
    this.statutVie = value;
    return this;
  }

  public withFiliere(value: FiliereBuilder): this {
    this.filiere= value;
    return this;
  }

  public withDescription(value: string): this {
    this.description = value;
    return this;
  }

  public withCreateurId(value: number): this {
    this.createurId = value;
    return this;
  }

  public withModificateurId(value: number): this {
    this.modificateurId = value;
    return this;
  }


}
