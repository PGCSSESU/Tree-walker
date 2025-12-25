export const API_URL = "http://localhost:5001";

export async function fetchNodes() {
  const res = await fetch(`${API_URL}/nodes`);
  if (!res.ok) {
    throw new Error("Failed to fetch nodes");
  }
  return res.json();
}
