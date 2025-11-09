import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';

export default function CreditCardParser() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
      setResult(null);
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('statement', file);

    try {
      const response = await fetch('http://localhost:3001/api/parse', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to parse statement');
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure backend is running on port 3001');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Statement Parser
            </h1>
          </div>
          <p className="text-sm text-zinc-500 ml-13">
            Extract structured data from credit card statements
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Upload Section */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden mb-6">
          <div className="p-8">
            <label className="block mb-6">
              <span className="text-sm font-medium text-zinc-700 mb-3 block">
                Select PDF Document
              </span>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full px-6 py-12 border-2 border-dashed border-zinc-300 rounded-lg cursor-pointer hover:border-zinc-400 transition-all group"
                >
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-3 group-hover:text-zinc-600 transition-colors" />
                    <p className="text-sm font-medium text-zinc-700">
                      {file ? file.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      PDF up to 10MB
                    </p>
                  </div>
                </label>
              </div>
            </label>

            <div className="flex gap-3">
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Parse Document</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-zinc-300 text-zinc-700 rounded-lg font-medium hover:bg-zinc-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-white border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-900 text-sm">Error</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Result */}
        {result && (
          <div className="space-y-6">
            {/* Success Header */}
            <div className="bg-white border border-zinc-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-zinc-900">
                  Extraction Complete
                </h2>
              </div>
              <p className="text-sm text-zinc-500 ml-8">
                {result.issuer} • Confidence: {result.confidence}
              </p>
            </div>

            {/* Data Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <DataCard
                label="Card Number"
                value={result.cardLast4 ? `•••• ${result.cardLast4}` : 'Not found'}
              />
              <DataCard
                label="Statement Period"
                value={result.statementPeriod || 'Not found'}
              />
              <DataCard
                label="Payment Due"
                value={result.dueDate || 'Not found'}
              />
              <DataCard
                label="Total Due"
                value={result.totalDue || 'Not found'}
                highlight
              />
              <DataCard
                label="Previous Balance"
                value={result.previousBalance || 'Not found'}
              />
              <DataCard
                label="Bank/Issuer"
                value={result.issuer}
              />
            </div>

            {/* Transactions */}
            {result.transactions && result.transactions.length > 0 && (
              <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-200">
                  <h3 className="font-semibold text-zinc-900 text-sm">
                    Recent Transactions
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {result.transactions.length} transactions found
                  </p>
                </div>
                <div className="divide-y divide-zinc-100">
                  {result.transactions.slice(0, 5).map((transaction, idx) => (
                    <div
                      key={idx}
                      className="px-6 py-3 flex justify-between items-center hover:bg-zinc-50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-sm text-zinc-900 font-medium">
                          {transaction.description}
                        </p>
                        {transaction.date && (
                          <p className="text-xs text-zinc-500 mt-0.5">
                            {transaction.date}
                          </p>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-zinc-900 ml-4">
                        {transaction.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Info Footer */}
        
      </main>
    </div>
  );
}

function DataCard({ label, value, highlight }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-5 hover:border-zinc-300 transition-colors">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2">
        {label}
      </p>
      <p className={`text-base font-semibold ${highlight ? 'text-zinc-900' : 'text-zinc-800'}`}>
        {value}
      </p>
    </div>
  );
}