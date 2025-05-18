import { useState } from 'react';
import { trackComplaint } from '../services/api';

const TrackStatus = () => {
  const [ticketId, setTicketId] = useState('');
  const [result, setResult] = useState(null);

  const handleTrack = async () => {
    const res = await trackComplaint(ticketId);
    setResult(res.data);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Track Complaint</h2>
      <input value={ticketId} onChange={(e) => setTicketId(e.target.value)} placeholder="Enter Ticket ID" className="w-full p-2 border rounded" />
      <button onClick={handleTrack} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Track</button>
      {result && (
        <div className="mt-4 border p-4 rounded bg-gray-100">
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Agency:</strong> {result.Agency?.name}</p>
          <p><strong>Response:</strong> {result.response || 'Pending'}</p>
        </div>
      )}
    </div>
  );
};

export default TrackStatus;