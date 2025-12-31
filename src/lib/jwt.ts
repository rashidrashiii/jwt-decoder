import { decodeJwt, decodeProtectedHeader } from 'jose';

export interface DecodedJWT {
  header: Record<string, any>;
  payload: Record<string, any>;
  raw: string;
}

export interface JWTValidation {
  isValid: boolean;
  isExpired: boolean;
  expiresAt?: Date;
  issuedAt?: Date;
  error?: string;
}

/**
 * Decodes a JWT token into header and payload
 */
export function decodeToken(token: string): DecodedJWT | null {
  try {
    const trimmedToken = token.trim();
    
    // Basic validation
    if (!trimmedToken || trimmedToken.split('.').length !== 3) {
      return null;
    }

    const header = decodeProtectedHeader(trimmedToken);
    const payload = decodeJwt(trimmedToken);

    return {
      header,
      payload,
      raw: trimmedToken,
    };
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

/**
 * Validates JWT and checks expiration
 */
export function validateToken(decoded: DecodedJWT): JWTValidation {
  const { payload } = decoded;
  const now = Math.floor(Date.now() / 1000); // Current time in seconds

  // Check if token has expiration
  if (!payload.exp) {
    return {
      isValid: true,
      isExpired: false,
      error: 'No expiration claim (exp) found',
    };
  }

  const expiresAt = new Date(payload.exp * 1000);
  const issuedAt = payload.iat ? new Date(payload.iat * 1000) : undefined;
  const isExpired = payload.exp < now;

  return {
    isValid: !isExpired,
    isExpired,
    expiresAt,
    issuedAt,
  };
}

/**
 * Calculates time remaining until expiration
 */
export function getTimeRemaining(expiresAt: Date): {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const total = expiresAt.getTime() - Date.now();
  
  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
}

/**
 * Formats time remaining as human-readable string
 */
export function formatTimeRemaining(time: ReturnType<typeof getTimeRemaining>): string {
  const { days, hours, minutes, seconds } = time;
  
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
  
  return parts.join(' ');
}
