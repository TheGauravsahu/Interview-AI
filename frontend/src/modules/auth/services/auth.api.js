import { api } from "../../../lib/axios.js";

class AuthApi {
  async signup(data) {
    return api.post("/auth/signUp", data);
  }
  async signin(data) {
    return api.post("/auth/signIn", data);
  }
  async signOut() {
    return api.post("/auth/signOut");
  }
  async getCurrentUser() {
    return api.get("/auth/getCurrentUser");
  }
}

export const authApi = new AuthApi();
