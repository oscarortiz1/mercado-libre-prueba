export async function fetchUser() {
  const res = await fetch("/meli/users/me"); // sin header Authorization en el cliente
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0,200)}`);
  return JSON.parse(text);
}
