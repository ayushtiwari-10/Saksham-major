import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../../components/Topbar';
import { getMyClassesApi } from '../../../services/classService';
import './Students.css'; 

const MyClasses = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyClassesApi()
      .then(data => setClasses(data.classes || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete class?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/teacher/classes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      setClasses(classes.filter(c => c._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEdit = (cls) => {
    // TODO: modal or navigate to edit
    alert(`Edit ${cls.title}`);
  };

  if (loading) return (
    <div className="teacher-root">
      <div className="teacher-main">
        <Topbar title="My Classes" />
        <p>Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="teacher-root">
      <div className="teacher-main">
        <Topbar title="My Classes" />
        <div className="students-container">
          <h3>My Classes ({classes.length})</h3>
          {classes.length === 0 ? (
            <p>No classes created yet. <button className="btn" onClick={() => navigate('/teacher/add-class')}>Create First</button></p>
          ) : (
            <table className="students-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Mode</th>
                  <th>Location</th>
                  <th>Students</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {classes.map(cls => (
                  <tr key={cls._id}>
                    <td>{cls.title}</td>
                    <td>{cls.category}</td>
                    <td>₹{cls.price}</td>
                    <td>{cls.mode}</td>
                    <td>{cls.location || '-'}</td>
                    <td>0</td>
                    <td>
                      <button className="btn small ghost" onClick={() => handleEdit(cls)}>Edit</button>
                      <button className="btn small primary" onClick={() => handleDelete(cls._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
