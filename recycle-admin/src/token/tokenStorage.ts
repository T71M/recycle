class TokenStorage {
  // На момент разработки будем хранить токен в local storage браузера
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  getToken() {
    return this.storage.getItem("auth");
  }

  setToken(token: string) {
    this.storage.setItem("auth", token);
  }

  removeToken() {
    this.storage.removeItem("auth");
  }
}

export default new TokenStorage();
