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
export declare function decodeToken(token: string): DecodedJWT | null;
/**
 * Validates JWT and checks expiration
 */
export declare function validateToken(decoded: DecodedJWT): JWTValidation;
/**
 * Calculates time remaining until expiration
 */
export declare function getTimeRemaining(expiresAt: Date): {
    total: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
/**
 * Formats time remaining as human-readable string
 */
export declare function formatTimeRemaining(time: ReturnType<typeof getTimeRemaining>): string;
//# sourceMappingURL=jwt.d.ts.map