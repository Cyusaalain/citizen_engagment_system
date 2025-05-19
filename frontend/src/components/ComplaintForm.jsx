import { useState } from 'react';
import { submitComplaint } from '../services/api';
import toast from 'react-hot-toast';

const ComplaintForm = () => {
  const [form, setForm] = useState({ name: '', email: '', category: '', description: '' });
  const [errors, setErrors] = useState({});
  const [ticketId, setTicketId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
    alert('Please enter both your name and email');
    return;
  }
    const res = await submitComplaint(form);
    setTicketId(res.data.ticketId);
    toast.success("Complaint submitted successfully!");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Submit a Complaint</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        className={`border p-2 w-full ${
          errors.name ? 'border-red-500' : 'border-gray-300'
        }`}
      />
        <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Your Email"
        className={`border p-2 w-full ${
          errors.email ? 'border-red-500' : 'border-gray-300'
        }`}
      />
        <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Transport">Transport</option>
        </select>
        <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Describe your issue"
        className="border p-2 w-full"
      />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
      {ticketId && <p className="mt-4 text-green-600">Your Ticket ID: {ticketId}</p>}
    </div>
  );
};

export default ComplaintForm;
