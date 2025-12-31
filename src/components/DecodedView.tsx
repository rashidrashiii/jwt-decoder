'use client';

import { useState } from 'react';
import type { DecodedJWT } from '../lib/jwt';
import { formatJSON, copyToClipboard } from '../lib/utils';

interface DecodedViewProps {
  decoded: DecodedJWT;
}

export function DecodedView({ decoded }: DecodedViewProps) {
  const [copiedSection, setCopiedSection] = useState<'header' | 'payload' | null>(null);

  const handleCopy = async (section: 'header' | 'payload') => {
    const data = section === 'header' ? decoded.header : decoded.payload;
    const success = await copyToClipboard(formatJSON(data));
    
    if (success) {
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Header */}
      <div className="rounded-lg bg-white/5 border border-white/10 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-300">Header</h3>
          <button
            onClick={() => handleCopy('header')}
            className="text-xs px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
          >
            {copiedSection === 'header' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <pre className="text-xs text-gray-300 overflow-x-auto">
          <code>{formatJSON(decoded.header)}</code>
        </pre>
      </div>

      {/* Payload */}
      <div className="rounded-lg bg-white/5 border border-white/10 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-300">Payload</h3>
          <button
            onClick={() => handleCopy('payload')}
            className="text-xs px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
          >
            {copiedSection === 'payload' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <pre className="text-xs text-gray-300 overflow-x-auto">
          <code>{formatJSON(decoded.payload)}</code>
        </pre>
      </div>
    </div>
  );
}
