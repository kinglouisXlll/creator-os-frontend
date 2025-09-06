import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await fetch('https://creator-os-backend.up.railway.app/generate-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResponse(data.content || "No content generated.");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Creator OS - Product Generator</h1>
      <textarea
        className="w-full max-w-lg h-32 p-3 border border-gray-300 rounded mb-4"
        placeholder="Enter your product idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Product'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {response && (
        <div className="mt-6 w-full max-w-lg bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">AI Generated Product</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;