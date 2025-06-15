export const getToken = () => localStorage.getItem('token');
export const getUserRole = () => localStorage.getItem('role');
export const saveUserData = (token, role) => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
};
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};
