/**
 * Returns an Authorization header with the current local JWT token.
 * Use this in every fetch() call to protected API endpoints.
 */
export async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = localStorage.getItem('token');
  if (!token) return {};
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}
