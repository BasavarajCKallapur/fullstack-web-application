import { useEffect, useState } from "react";

const API = "";

export default function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadUsers() {
    setError("");
    try {
      const res = await fetch(`${API}/users`);
      if (!res.ok) throw new Error("Failed to load users");
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      setError(e.message || "Error loading users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setError("");
    try {
      const res = await fetch(`${API}/add-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to add user");
      }
      setName("");
      await loadUsers();
    } catch (e) {
      setError(e.message || "Error adding user");
    }
  }

  return (
    <div className="wrap">
      <h1>Environment test</h1>
      <p className="hint">Add a name and confirm it appears in the list.</p>

      <form onSubmit={handleSubmit} className="row">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <button type="submit">Add</button>
      </form>

      {error ? <p className="err">{error}</p> : null}

      <h2>Users</h2>
      {loading ? (
        <p>Loading…</p>
      ) : users.length === 0 ? (
        <p className="empty">No users yet.</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              <span className="name">{u.name}</span>
              <span className="meta"> #{u.id}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
