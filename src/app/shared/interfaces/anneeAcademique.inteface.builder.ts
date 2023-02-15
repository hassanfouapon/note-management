import {
  AnneeAcademique,
} from 'src/app/shared/models/anneeAcademique.inteface';

export class AnneeAcademiqueBuilder {
  public code = '';
  private libelle = '';
  private statutVie: string | null | undefined = undefined;
  private description: string | null | undefined = undefined;
  private createurId?: number = undefined;
  private modificateurId?: number = undefined;
  private dateDebut?: string | Date = undefined;
  private dateCloture?: string | Date = undefined;

  public build(): AnneeAcademique {
    return {
      code: this.code,
      libelle: this.libelle,
      statutVie: this.statutVie,
      description: this.description,
      createurId: this.createurId,
      modificateurId: this.modificateurId,
      dateDebut: this.dateDebut,
      dateCloture: this.dateCloture
    };
  }

  public withCode(value: string): string {
    this.code = value;
    return this.code;
  }

  public withLibelle(value: string): this {
    this.libelle = value;
    return this;
  }
  public withStatutVie(value: string | null | undefined): this {
    this.statutVie = value;
    return this;
  }

  public withDescription(value: string | null | undefined): this {
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

  public withDateDebut(value: string | Date): this {
    this.dateDebut = value;
    return this;
  }

  public withDateCloture(value: string | Date): this {
    this.dateCloture = value;
    return this;
  }
}
