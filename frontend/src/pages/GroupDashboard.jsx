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

  const fetchGroups = async () => {
    const res = await getGroups();
    setGroups(res.data);
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
        await createGroup({ groupName: name });
      }

      setName("");
      setEditId(null);
      fetchGroups();
    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  const handleEdit = (group) => {
    setName(group.groupName);
    setEditId(group.groupId);
  };

  const handleDelete = async (id) => {
    await deleteGroup(id);
    fetchGroups();
  };

  return (
    <div className="container mt-4">
      <h2>Group Management</h2>

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
          {groups.map((g) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GroupDashboard;