import { Semestre } from "../models/semestre.interface";
import { AnneeAcademiqueBuilder } from "./anneeAcademique.inteface.builder";

export class SemestreBuilder{
  public code = '';
  public libelle = '';
  public description = '';
  public createurId = 1;
  public modificateurId = 1;
  public statutVie: string | null | undefined = undefined;
  public dateCloture = '';
  public dateDebut = '';
  public anneeAcademique: string = "";


  public build(): Semestre{
    return{
      code: this.code,
      libelle: this.libelle,
      description: this.description,
      createurId: this.createurId,
      modificateurId: this.modificateurId,
      statutVie: this.statutVie,
      dateCloture: this.dateCloture,
      dateDebut: this.dateDebut,
      anneeAcademique: this.anneeAcademique
    }
  }


  public withCode(value : string): this{
    this.code = value;
    return this;
  }
  public withLibelle(value : string): this{
    this.libelle = value;
    return this;
  }
  public withDescription(value : string): this{
    this.description = value;
    return this;
  }
  public withCreateurId(value : number): this{
    this.createurId = value;
    return this;
  }
  public withModificateurId(value : number): this{
    this.modificateurId = value;
    return this;
  }
  public withStatutVie(value : string): this{
    this.statutVie = value;
    return this;
  }
  public withDateDebut(value : string): this{
    this.dateDebut = value;
    return this;
  }
  public withDateCloture(value : string): this{
    this.dateCloture = value;
    return this;
  }
  public withAnneeAcademique(value : string): this{
    this.anneeAcademique = value;
    return this;
  }
}
