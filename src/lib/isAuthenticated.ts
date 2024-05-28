import apiRoutes from "@/apiRoutes";

export async function isAuthenticated() {
  try {
    const response = await fetch(apiRoutes.authorized, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
