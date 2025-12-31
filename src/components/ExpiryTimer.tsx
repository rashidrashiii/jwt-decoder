'use client';

import { useEffect, useState } from 'react';
import type { JWTValidation } from '../lib/jwt';
import { getTimeRemaining, formatTimeRemaining } from '../lib/jwt';
import { formatDate, formatRelativeTime } from '../lib/utils';

interface ExpiryTimerProps {
  validation: JWTValidation;
}

export function ExpiryTimer({ validation }: ExpiryTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<ReturnType<typeof getTimeRemaining> | null>(null);

  useEffect(() => {
    if (!validation.expiresAt) return;

    const updateTimer = () => {
      setTimeRemaining(getTimeRemaining(validation.expiresAt!));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [validation.expiresAt]);

  if (!validation.expiresAt) {
    return (
      <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4">
        <p className="text-sm text-yellow-400">
          ⚠️ No expiration claim (exp) found in token
        </p>
      </div>
    );
  }

  const isExpired = validation.isExpired;
  const isExpiringSoon = timeRemaining && timeRemaining.total > 0 && timeRemaining.total < 5 * 60 * 1000; // 5 minutes

  return (
    <div className={`rounded-lg border p-4 ${
      isExpired 
        ? 'bg-red-500/10 border-red-500/20' 
        : isExpiringSoon 
        ? 'bg-yellow-500/10 border-yellow-500/20'
        : 'bg-green-500/10 border-green-500/20'
    }`}>
      <div className="space-y-3">
        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">
            {isExpired ? '🔴' : isExpiringSoon ? '🟡' : '🟢'}
          </span>
          <div>
            <p className={`text-sm font-semibold ${
              isExpired ? 'text-red-400' : isExpiringSoon ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {isExpired ? 'Expired' : isExpiringSoon ? 'Expiring Soon' : 'Valid'}
            </p>
            <p className="text-xs text-gray-400">
              {isExpired ? 'This token is no longer valid' : 'Token is currently valid'}
            </p>
          </div>
        </div>

        {/* Time Remaining */}
        {!isExpired && timeRemaining && (
          <div className="flex items-center gap-2">
            <span className="text-lg">⏱️</span>
            <div>
              <p className="text-sm font-semibold text-white">
                {formatTimeRemaining(timeRemaining)}
              </p>
              <p className="text-xs text-gray-400">Time remaining</p>
            </div>
          </div>
        )}

        {/* Expiry Date */}
        <div className="flex items-center gap-2">
          <span className="text-lg">📅</span>
          <div>
            <p className="text-sm font-semibold text-white">
              {formatDate(validation.expiresAt)}
            </p>
            <p className="text-xs text-gray-400">
              {isExpired ? 'Expired' : 'Expires'} {formatRelativeTime(validation.expiresAt)}
            </p>
          </div>
        </div>

        {/* Issued At */}
        {validation.issuedAt && (
          <div className="flex items-center gap-2">
            <span className="text-lg">🕐</span>
            <div>
              <p className="text-sm font-semibold text-white">
                {formatDate(validation.issuedAt)}
              </p>
              <p className="text-xs text-gray-400">
                Issued {formatRelativeTime(validation.issuedAt)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
