import { Niveau } from 'src/app/shared/models/niveau.interface';

export class NiveauBuilder {
  private code: string = '';
  private numero: number = 1;
  private libelle: string = '';
  private statutVie: string | null | undefined = 'ACTIVE';
  private description: string | null | undefined = '';
  private createurId: number = 1;
  private modificateurId: number = 1;

  public build(): Niveau {
    return {
      code: this.code,
      numero: this.numero,
      libelle: this.libelle,
      statutVie: this.statutVie,
      description: this.description,
      createurId: this.createurId,
      modificateurId: this.modificateurId
    };
  }

  public withCode(value: string) {
    this.code = value;
    return this;
  }

  public withNumero(value: number) {
    this.numero = value;
    return this;
  }

  public withLibelle(value: string) {
    this.libelle = value;
    return this;
  }

  public withStatutVie(value: string | null | undefined) {
    this.statutVie = value;
    return this;
  }

  public withDescription(value: string | null | undefined) {
    this.description = value;
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
