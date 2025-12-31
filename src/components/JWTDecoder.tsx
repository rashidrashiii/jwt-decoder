'use client';

import { useState } from 'react';
import { TokenInput } from './TokenInput';
import { DecodedView } from './DecodedView';
import { ExpiryTimer } from './ExpiryTimer';
import { decodeToken, validateToken, type DecodedJWT, type JWTValidation } from '../lib/jwt';

export function JWTDecoder() {
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);
  const [validation, setValidation] = useState<JWTValidation | null>(null);
  const [error, setError] = useState<string>('');

  const handleTokenChange = (token: string) => {
    if (!token.trim()) {
      setDecoded(null);
      setValidation(null);
      setError('');
      return;
    }

    const decodedToken = decodeToken(token);
    
    if (!decodedToken) {
      setError('Invalid JWT token. Please check the format.');
      setDecoded(null);
      setValidation(null);
      return;
    }

    setError('');
    setDecoded(decodedToken);
    setValidation(validateToken(decodedToken));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Token Input */}
      <TokenInput onTokenChange={handleTokenChange} error={error} />

      {/* Results */}
      {decoded && validation && (
        <div className="space-y-6 animate-fade-in">
          {/* Expiry Timer */}
          <ExpiryTimer validation={validation} />

          {/* Decoded Token */}
          <DecodedView decoded={decoded} />
        </div>
      )}

      {/* Empty State */}
      {!decoded && !error && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">👆 Paste a JWT token above to decode it</p>
          <p className="text-sm">We'll show you the header, payload, and expiration status</p>
        </div>
      )}
    </div>
  );
}
