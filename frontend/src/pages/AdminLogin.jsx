import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginAdmin(form); // simulate success
      navigate('/admin/dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Admin Login</h2>
      <input name="username" onChange={handleChange} className="border p-2 w-full" placeholder="Username" />
      <input name="password" type="password" onChange={handleChange} className="border p-2 w-full" placeholder="Password" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}