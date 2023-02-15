import { SafeUrl } from '@angular/platform-browser';

export interface User{
  nom: string;
  email: string;
  password: string;
  profil: string | File | SafeUrl | undefined | null;
  token: string;
  id_user: number | string;
}
