'use client';

import { useState } from 'react';

interface TokenInputProps {
  onTokenChange: (token: string) => void;
  error?: string;
}

export function TokenInput({ onTokenChange, error }: TokenInputProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onTokenChange(newValue);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setValue(text);
      onTokenChange(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleClear = () => {
    setValue('');
    onTokenChange('');
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="jwt-input" className="text-sm font-medium text-gray-300">
          JWT Token
        </label>
        <div className="flex gap-2">
          <button
            onClick={handlePaste}
            className="text-xs px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
          >
            Paste
          </button>
          {value && (
            <button
              onClick={handleClear}
              className="text-xs px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      <textarea
        id="jwt-input"
        value={value}
        onChange={handleChange}
        placeholder="Paste your JWT token here..."
        className={`w-full h-32 px-4 py-3 rounded-lg bg-white/5 border ${
          error ? 'border-red-500/50' : 'border-white/10'
        } text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none font-mono text-sm`}
      />
      
      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
