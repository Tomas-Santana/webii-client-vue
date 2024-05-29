const host = "https://127.0.0.1:3000";
export default {
  login: `${host}/auth/login`,
  register: `${host}/auth/register`,
  logout: `${host}/auth/logout`,
  authorized: `${host}/auth`,
  createPasswordReset: `${host}/auth/create-password-reset`,
  passwordReset: `${host}/auth/reset-password`,
};
