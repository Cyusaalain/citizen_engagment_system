import { useState } from 'react';
import { submitComplaint } from '../services/api';

const ComplaintForm = () => {
  const [form, setForm] = useState({ name: '', email: '', category: '', description: '' });
  const [ticketId, setTicketId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await submitComplaint(form);
    setTicketId(res.data.ticketId);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Submit a Complaint</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />
        <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Transport">Transport</option>
        </select>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
      {ticketId && <p className="mt-4 text-green-600">Your Ticket ID: {ticketId}</p>}
    </div>
  );
};

export default ComplaintForm;
