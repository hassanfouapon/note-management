// import { UserInterface } from './../interfaces/user.interface';
import { LocalStorage } from './localStorage';

export class UserHelper {
  constructor() {

  }

  /**
   * determine wheather or not a user is authenticate
   */
  static isConnect(): boolean {

    return LocalStorage.getItem('note_isj_user') !== (undefined || null);
  }
  /**
   * Remove user data to the local DB
   */
  static disconect(): void {
    LocalStorage.delete('note_isj_user');
  }

  /**
   * Get the current log user
   */
  static getUser(): any {
    return JSON.parse(LocalStorage.getItem('note_isj_user'));
  }
  static getUserId(): any {
    const user = LocalStorage.getItem('note_isj_user');
    const userJson = JSON.parse(user);

    return userJson.id_User;
  }

  /**
   * Add user data to the local DB
   * @param * user user object to be saved
   */
  static connect(user: any): void {
    LocalStorage.setItem('note_isj_user', JSON.stringify(user));
  }

}
