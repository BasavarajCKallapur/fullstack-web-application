import { useEffect, useState } from "react";

const API = "http://localhost:3001";

export default function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

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

  async function handleEdit(user) {
    setEditingId(user.id);
    setEditName(user.name);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const trimmed = editName.trim();
    if (!trimmed) return;

    setError("");
    try {
      const res = await fetch(`${API}/update-user/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to update user");
      }
      setEditingId(null);
      setEditName("");
      await loadUsers();
    } catch (e) {
      setError(e.message || "Error updating user");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setError("");
    try {
      const res = await fetch(`${API}/delete-user/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete user");
      }
      await loadUsers();
    } catch (e) {
      setError(e.message || "Error deleting user");
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditName("");
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

      <h2>Users ({users.length})</h2>
      {loading ? (
        <p>Loading…</p>
      ) : users.length === 0 ? (
        <p className="empty">No users yet.</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {editingId === u.id ? (
                <form onSubmit={handleUpdate} className="edit-form">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    autoFocus
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={handleCancelEdit}>Cancel</button>
                </form>
              ) : (
                <>
                  <span className="name">{u.name}</span>
                  <span className="meta"> #{u.id}</span>
                  <div className="actions">
                    <button onClick={() => handleEdit(u)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(u.id)} className="delete-btn">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
