import { SafeUrl } from '@angular/platform-browser';

import { User } from 'src/app/shared/models/user.interface';

export class UserBuilder {
  private nom = '';
  private email = '';
  private password = '';
  private profil: string | File | SafeUrl | undefined | null = undefined;
  private token = '';
  // tslint:disable-next-line:variable-name
  private id_user: number | string = '';

  public build(): User {
    return {
      nom: this.nom,
      email: this.email,
      password: this.password,
      profil: this.profil,
      token: this.token,
      id_user: this.id_user
    };
  }

  public withNom(value: string): this {
    this.nom = value;
    return this;
  }

  public withEmail(value: string): this {
    this.email = value;
    return this;
  }

  public withPassword(value: string): this {
    this.password = value;
    return this;
  }

  public withProfil(value: string | File | SafeUrl | undefined | null): this {
    this.profil = value;
    return this;
  }

  public withToken(value: string): this {
    this.token = value;
    return this;
  }

  public withId_user(value: number | string): this {
    this.id_user = value;
    return this;
  }
}
