import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await loginAdmin(form);
      toast.success("Login successful!");
      console.log('Login API response:', res);
      if (res.status === 200) {
        localStorage.setItem("admin", form.username);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.success("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Admin Login</h2>
      <input name="username" onChange={handleChange} className="border p-2 w-full" placeholder="Username" />
      <input name="password" type="password" onChange={handleChange} className="border p-2 w-full" placeholder="Password" />
      {error && <p className="text-red-500">{error}</p>}
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}