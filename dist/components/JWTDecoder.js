'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { TokenInput } from './TokenInput';
import { DecodedView } from './DecodedView';
import { ExpiryTimer } from './ExpiryTimer';
import { decodeToken, validateToken } from '../lib/jwt';
export function JWTDecoder() {
    const [decoded, setDecoded] = useState(null);
    const [validation, setValidation] = useState(null);
    const [error, setError] = useState('');
    const handleTokenChange = (token) => {
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
    return (_jsxs("div", { className: "w-full max-w-6xl mx-auto space-y-6", children: [_jsx(TokenInput, { onTokenChange: handleTokenChange, error: error }), decoded && validation && (_jsxs("div", { className: "space-y-6 animate-fade-in", children: [_jsx(ExpiryTimer, { validation: validation }), _jsx(DecodedView, { decoded: decoded })] })), !decoded && !error && (_jsxs("div", { className: "text-center py-12 text-gray-500", children: [_jsx("p", { className: "text-lg mb-2", children: "\uD83D\uDC46 Paste a JWT token above to decode it" }), _jsx("p", { className: "text-sm", children: "We'll show you the header, payload, and expiration status" })] }))] }));
}
//# sourceMappingURL=JWTDecoder.js.map