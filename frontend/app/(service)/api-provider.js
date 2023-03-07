export default class ApiProvider {
  static async getUser(token) {
    try {
      //   const response = await fetch(config.backendDomain + "/user", {
      //     headers: { Authorization: `Bearer ${token}` },
      //   });
      //   if (response.ok) return response.json();

      return { id: "111", hasStore: true };
    } catch (error) {
      return null;
    }
  }
}
