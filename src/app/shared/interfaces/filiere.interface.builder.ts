import { Filiere } from 'src/app/shared/models/filiere.interface';

export class FiliereBuilder {
  public code = '';
  private libelle = '';
  private statutVie: string | null | undefined = undefined;
  private description: string | null | undefined = undefined;
  private createurId = 1;
  private modificateurId = 1;

  public build(): Filiere {
    return {
      code: this.code,
      libelle: this.libelle,
      statutVie: this.statutVie,
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

  public withstatutVie(value: string | null | undefined): this {
    this.description = value;
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
}
