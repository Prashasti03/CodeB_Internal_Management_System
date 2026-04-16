import { useEffect, useState } from "react";
import {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
} from "../api/groupService";

function GroupDashboard() {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchGroups = async () => {
    try {
      const res = await getGroups();
      setGroups(res.data);
    } catch (error) {
      setError("Failed to load groups");
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateGroup(editId, { groupName: name });
      } else {
        if (!name.trim()) {
          setError("Group name is required");
          return;
        }
        await createGroup({ groupName: name });
        alert(editId ? "Updated successfully" : "Created successfully");
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
    }
  };

  const handleEdit = (group) => {
    setName(group.groupName);
    setEditId(group.groupId);
  };

  const handleDelete = async (id) => {
    try {
      await deleteGroup(id);
      fetchGroups();
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || error.response.data);
      } else {
        setError("Cannot delete group");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Group Management</h2>

      {/* Error Alert */}
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
          ></button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-3">
        <input
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter group name"
        />
        <button className="btn btn-primary">
          {editId ? "Update" : "Add"} Group
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
          {groups.length === 0 ? (
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
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(g.groupId)}
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
