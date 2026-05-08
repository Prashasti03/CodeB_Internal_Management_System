import { useEffect, useState } from "react";
import {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
} from "../api/groupService";
import Toast from "../components/Toast";

function GroupDashboard() {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);

  const fetchGroups = async () => {
    try {
      setTableLoading(true);

      const res = await getGroups();

      setGroups(res.data);
    } catch (error) {
      setError("Failed to load groups");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Group name is required");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await updateGroup(editId, {
          groupName: name,
        });

        setSuccess("Group updated successfully");
      } else {
        await createGroup({
          groupName: name,
        });

        setSuccess("Group created successfully");
      }

      setName("");

      setEditId(null);

      fetchGroups();
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (group) => {
    setName(group.groupName);
    setEditId(group.groupId);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this group?",
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await deleteGroup(id);

      setSuccess("Group deleted successfully");

      fetchGroups();
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || error.response.data);
      } else {
        setError("Cannot delete group");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Group Management</h2>

      {/* Success Toast */}
      {success && (
        <Toast
          message={success}
          type="success"
          onClose={() => setSuccess("")}
        />
      )}

      {/* Error Toast */}
      {error && (
        <Toast message={error} type="danger" onClose={() => setError("")} />
      )}

      <form onSubmit={handleSubmit} className="mb-3">
        <input
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter group name"
        />
        <button className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Processing...
            </>
          ) : (
            <>{editId ? "Update" : "Add"} Group</>
          )}
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tableLoading ? (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border text-primary"></div>

                <p className="mt-2">Loading groups...</p>
              </td>
            </tr>
          ) : groups.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No groups found
              </td>
            </tr>
          ) : (
            groups.map((g) => (
              <tr key={g.groupId}>
                <td>{g.groupId}</td>

                <td>{g.groupName}</td>

                <td>{g.isActive ? "Active" : "Inactive"}</td>

                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(g)}
                    disabled={loading}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(g.groupId)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GroupDashboard;
