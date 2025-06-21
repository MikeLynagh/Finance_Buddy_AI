import React, { useRef, useState } from 'react';

export function CSVImporter() {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-full max-w-md mx-auto mb-8">
      <h2 className="text-xl font-semibold mb-2">Import Bank Statement (CSV)</h2>
      <p className="text-gray-500 mb-4 text-center">Drag and drop your AIB or Revolut CSV file here, or click to select a file.</p>
      <div
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center cursor-pointer hover:border-blue-400 transition"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          accept=".csv"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <span className="text-gray-400 mb-2">📄</span>
        <span className="text-gray-600">{fileName ? fileName : 'No file selected'}</span>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={!fileName}
      >
        Import CSV (Mock)
      </button>
    </div>
  );
} 