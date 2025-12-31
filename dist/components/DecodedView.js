'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { formatJSON, copyToClipboard } from '../lib/utils';
export function DecodedView({ decoded }) {
    const [copiedSection, setCopiedSection] = useState(null);
    const handleCopy = async (section) => {
        const data = section === 'header' ? decoded.header : decoded.payload;
        const success = await copyToClipboard(formatJSON(data));
        if (success) {
            setCopiedSection(section);
            setTimeout(() => setCopiedSection(null), 2000);
        }
    };
    return (_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "rounded-lg bg-white/5 border border-white/10 p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h3", { className: "text-sm font-semibold text-gray-300", children: "Header" }), _jsx("button", { onClick: () => handleCopy('header'), className: "text-xs px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors", children: copiedSection === 'header' ? '✓ Copied' : 'Copy' })] }), _jsx("pre", { className: "text-xs text-gray-300 overflow-x-auto", children: _jsx("code", { children: formatJSON(decoded.header) }) })] }), _jsxs("div", { className: "rounded-lg bg-white/5 border border-white/10 p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h3", { className: "text-sm font-semibold text-gray-300", children: "Payload" }), _jsx("button", { onClick: () => handleCopy('payload'), className: "text-xs px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors", children: copiedSection === 'payload' ? '✓ Copied' : 'Copy' })] }), _jsx("pre", { className: "text-xs text-gray-300 overflow-x-auto", children: _jsx("code", { children: formatJSON(decoded.payload) }) })] })] }));
}
//# sourceMappingURL=DecodedView.js.map