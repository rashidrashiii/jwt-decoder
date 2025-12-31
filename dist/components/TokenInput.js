'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export function TokenInput({ onTokenChange, error }) {
    const [value, setValue] = useState('');
    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onTokenChange(newValue);
    };
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setValue(text);
            onTokenChange(text);
        }
        catch (err) {
            console.error('Failed to read clipboard:', err);
        }
    };
    const handleClear = () => {
        setValue('');
        onTokenChange('');
    };
    return (_jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("label", { htmlFor: "jwt-input", className: "text-sm font-medium text-gray-300", children: "JWT Token" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: handlePaste, className: "text-xs px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors", children: "Paste" }), value && (_jsx("button", { onClick: handleClear, className: "text-xs px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors", children: "Clear" }))] })] }), _jsx("textarea", { id: "jwt-input", value: value, onChange: handleChange, placeholder: "Paste your JWT token here...", className: `w-full h-32 px-4 py-3 rounded-lg bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none font-mono text-sm` }), error && (_jsx("p", { className: "mt-2 text-sm text-red-400", children: error }))] }));
}
//# sourceMappingURL=TokenInput.js.map