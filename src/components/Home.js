import { useEffect, useState } from "react";
import axios from "axios";
import EditModel from "./EditModel";
import "./Home.css";
function Home() {
  const [data, setData] = useState({
    name: "",
    email: "",
  });
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([]);
  const [editid, setEditid] = useState("");
  const [allData, setAllData] = useState([]);

  const openmodal = () => {
    setOpen(true);
  };
  const closemodal = () => {
    setOpen(false);
  };
  const handleEdit = (id) => {
    setEditid(id);
    openmodal();
  };

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const adddata = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_URL}/api/add`, data);
      console.log("Data added successfully");
      getdata();
      setData({ name: "", email: "" });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const editdata = async (_id, updatedData) => {
    try {
      await axios.put(`${process.env.REACT_APP_URL}/api/update/${_id}`, updatedData);
      console.log("Edit updated successfully");
      getdata();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const getdata = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/get`);
      setResult(response.data.data);
      setAllData(response.data.data);
      console.log("Data fetched successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  const deletedata = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/api/delete/${_id}`);
      console.log("Data deleted successfully");
      getdata();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const confirmDelete = async (id, name) => {
    const ok = window.confirm(
      `Delete "${name}"? This action cannot be undone.`,
    );
    if (!ok) return;
    await deletedata(id);
  };
  const filter = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allData.filter((item) =>
      item.name.toLowerCase().includes(query),
    );
    setResult(filtered);
  };

  const listContent =
    result.length === 0 ? (
      <div className="wrapper">
      <div className="empty-state card" >No contacts yet — add one above.</div></div>
    ) : (
      result.map((item) => (
        <article className="card item my-3" key={item._id}>
          <div className="item-content">
            <div>
              <h4 className="item-name">{item.name}</h4>
              <p className="item-email">{item.email}</p>
            </div>
            <div className="item-actions">
              <button
                className="btn danger"
                onClick={() => confirmDelete(item._id, item.name)}
                aria-label={`Delete ${item.name}`}
              >
                ✖
              </button>
              <button
                className="btn"
                onClick={() => handleEdit(item._id)}
                aria-label={`Edit ${item.name}`}
              >
                ✎
              </button>
            </div>
          </div>
        </article>
      ))
    );

  return (
    <>
      <div className="search-box my-5">
        <input
          type="text"
          placeholder="Search contacts..."
          className="input search-input"
          onChange={filter}
        />
      </div>

      <div className="home-container">
        <section className="card form-card">
          <h2 className="card-title">Add Contact</h2>
          <div className="form-row">
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="input"
              value={data.name}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input"
              value={data.email}
              onChange={handleChange}
            />
            <button className="btn primary" onClick={adddata}>
              + Add
            </button>
          </div>
        </section>

        <section className="list-section">
          <div className="gridx">{listContent}</div>
        </section>
      </div>
      <EditModel
        isOpen={open}
        closeModal={closemodal}
        editid={editid}
        result={result}
        editdata={editdata}
      />
    </>
  );
}

export default Home;
