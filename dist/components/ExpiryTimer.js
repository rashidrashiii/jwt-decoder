'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getTimeRemaining, formatTimeRemaining } from '../lib/jwt';
import { formatDate, formatRelativeTime } from '../lib/utils';
export function ExpiryTimer({ validation }) {
    const [timeRemaining, setTimeRemaining] = useState(null);
    useEffect(() => {
        if (!validation.expiresAt)
            return;
        const updateTimer = () => {
            setTimeRemaining(getTimeRemaining(validation.expiresAt));
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [validation.expiresAt]);
    if (!validation.expiresAt) {
        return (_jsx("div", { className: "rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4", children: _jsx("p", { className: "text-sm text-yellow-400", children: "\u26A0\uFE0F No expiration claim (exp) found in token" }) }));
    }
    const isExpired = validation.isExpired;
    const isExpiringSoon = timeRemaining && timeRemaining.total > 0 && timeRemaining.total < 5 * 60 * 1000; // 5 minutes
    return (_jsx("div", { className: `rounded-lg border p-4 ${isExpired
            ? 'bg-red-500/10 border-red-500/20'
            : isExpiringSoon
                ? 'bg-yellow-500/10 border-yellow-500/20'
                : 'bg-green-500/10 border-green-500/20'}`, children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-2xl", children: isExpired ? '🔴' : isExpiringSoon ? '🟡' : '🟢' }), _jsxs("div", { children: [_jsx("p", { className: `text-sm font-semibold ${isExpired ? 'text-red-400' : isExpiringSoon ? 'text-yellow-400' : 'text-green-400'}`, children: isExpired ? 'Expired' : isExpiringSoon ? 'Expiring Soon' : 'Valid' }), _jsx("p", { className: "text-xs text-gray-400", children: isExpired ? 'This token is no longer valid' : 'Token is currently valid' })] })] }), !isExpired && timeRemaining && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-lg", children: "\u23F1\uFE0F" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-white", children: formatTimeRemaining(timeRemaining) }), _jsx("p", { className: "text-xs text-gray-400", children: "Time remaining" })] })] })), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-lg", children: "\uD83D\uDCC5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-white", children: formatDate(validation.expiresAt) }), _jsxs("p", { className: "text-xs text-gray-400", children: [isExpired ? 'Expired' : 'Expires', " ", formatRelativeTime(validation.expiresAt)] })] })] }), validation.issuedAt && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-lg", children: "\uD83D\uDD50" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-white", children: formatDate(validation.issuedAt) }), _jsxs("p", { className: "text-xs text-gray-400", children: ["Issued ", formatRelativeTime(validation.issuedAt)] })] })] }))] }) }));
}
//# sourceMappingURL=ExpiryTimer.js.map