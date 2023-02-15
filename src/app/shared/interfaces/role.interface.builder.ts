import { Role } from 'src/app/shared/models/role.interface';

export class RoleBuilder {
  private code: string = "";
  private libelle: string = "";
  private statutVie: string | null | undefined = "ACTIVE";
  private description: string | null | undefined = "";
  private createurId: number = 1;
  private modificateurId: number = 1;

  public build(): Role {
    return {
      code: this.code,
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
