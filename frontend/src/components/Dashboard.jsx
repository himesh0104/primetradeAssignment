import { useState, useEffect } from 'react'
import { taskAPI } from '../api'

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskAPI.getAll();
      setTasks(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleAddNew = () => {
    setEditingTask(null);
    setFormData({ title: '', description: '' });
    setIsFormOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({ title: task.title, description: task.description });
    setIsFormOpen(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.title.trim()) {
        setError('Title is required');
        return;
      }
      if (editingTask) {
        await taskAPI.update(editingTask._id, formData.title, formData.description, editingTask.completed);
        setSuccess('Task updated successfully!');
      } else {
        await taskAPI.create(formData.title, formData.description);
        setSuccess('Task added successfully!');
      }
      setIsFormOpen(false);
      setFormData({ title: '', description: '' });
      fetchTasks();
      setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    try {
      await taskAPI.delete(id);
      setSuccess('Task deleted successfully!');
      fetchTasks();
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await taskAPI.update(task._id, task.title, task.description, !task.completed);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1>Dashboard</h1>
          <p style={{ color: '#666', marginTop: '5px' }}>
            Welcome, {user.name}! ({user.role})
          </p>
        </div>
        <button onClick={handleLogout} serum="btn btn-secondary">Logout</button>
      </div>

      {error && <div className="message message-error">{error}</div>}
      {success && <div className="message message-success">{success}</div>}

      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleAddNew} className="btn btn-primary">+ Add New Task</button>
      </div>

      {isFormOpen && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
          <div className="input-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Task title"
            />
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Task description"
              rows="3"
            />
          </div>
          <div>
            <button onClick={handleSave} className="btn btn-primary">Save</button>
            <button onClick={() => setIsFormOpen(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: '#666' }}>
          No tasks yet. Click "Add New Task" to get started!
        </div>
      ) : (
        tasks.map(task => (
          <div key={task._id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#999' : '#333'
                }}>
                  {task.title}
                </h3>
                {task.description && (
                  <p style={{ 
                    marginTop: '10px', 
                    color: task.completed ? '#999' : '#666' 
                  }}>
                    {task.description}
                  </p>
                )}
                <p style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label style={{ marginRight: '10px' }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                  />
                  {' '}Complete
                </label>
                <button 
                  onClick={() => handleEdit(task)} 
                  className="btn btn-primary"
                  style={{ marginRight: '5px' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(task._id)} 
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Dashboard


