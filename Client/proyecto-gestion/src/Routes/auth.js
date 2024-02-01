export const isAuthenticated = (requiredRole) => {
  const user = JSON.parse(sessionStorage.getItem('usuario'));
  const token = sessionStorage.getItem('token');

  // Verifica si ambos datos existen y son válidos
  return user && token && (!requiredRole || user.role_id === requiredRole);
};