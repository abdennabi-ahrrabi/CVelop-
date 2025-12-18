import React, { useState } from 'react';

const COLOR_PRESETS = {
    common: [
        { name: 'Black', value: '#000000' },
        { name: 'White', value: '#FFFFFF' },
        { name: 'Gray', value: '#6B7280' },
        { name: 'Light Gray', value: '#F3F4F6' },
    ],
    professional: [
        { name: 'Navy Blue', value: '#1e3a8a' },
        { name: 'Royal Blue', value: '#3b82f6' },
        { name: 'Sky Blue', value: '#0ea5e9' },
        { name: 'Teal', value: '#14b8a6' },
        { name: 'Emerald', value: '#10b981' },
        { name: 'Purple', value: '#8b5cf6' },
        { name: 'Slate', value: '#475569' },
        { name: 'Stone', value: '#78716c' },
    ],
    warm: [
        { name: 'Red', value: '#ef4444' },
        { name: 'Orange', value: '#f97316' },
        { name: 'Amber', value: '#f59e0b' },
        { name: 'Yellow', value: '#eab308' },
    ],
    cool: [
        { name: 'Cyan', value: '#06b6d4' },
        { name: 'Indigo', value: '#6366f1' },
        { name: 'Violet', value: '#a855f7' },
        { name: 'Fuchsia', value: '#d946ef' },
    ],
};

export default function ColorPicker({ value, onChange, label, showPresets = true }) {
    const [isOpen, setIsOpen] = useState(false);
    const [recentColors, setRecentColors] = useState([]);

    const handleColorChange = (newColor) => {
        onChange(newColor);

        // Add to recent colors (max 8)
        setRecentColors(prev => {
            const filtered = prev.filter(c => c !== newColor);
            return [newColor, ...filtered].slice(0, 8);
        });
    };

    return (
        <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                {label}
            </label>

            {/* Color Display Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white"
            >
                <div
                    className="w-6 h-6 rounded border border-gray-300 shadow-sm"
                    style={{ backgroundColor: value }}
                />
                <span className="flex-1 text-left text-sm font-mono">{value}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Color Picker Panel */}
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 p-4 max-h-96 overflow-y-auto">
                        {/* Custom Color Input */}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Custom Color
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={value}
                                    onChange={(e) => handleColorChange(e.target.value)}
                                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleColorChange(e.target.value)}
                                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded font-mono"
                                    placeholder="#000000"
                                />
                            </div>
                        </div>

                        {/* Recent Colors */}
                        {recentColors.length > 0 && (
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-700 mb-2">
                                    Recent Colors
                                </label>
                                <div className="grid grid-cols-8 gap-1.5">
                                    {recentColors.map((color, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleColorChange(color)}
                                            className="w-7 h-7 rounded border-2 border-gray-300 hover:border-blue-500 transition-colors shadow-sm"
                                            style={{ backgroundColor: color }}
                                            title={color}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {showPresets && (
                            <>
                                {/* Common Colors */}
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-700 mb-2">
                                        Common
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {COLOR_PRESETS.common.map((preset) => (
                                            <button
                                                key={preset.value}
                                                type="button"
                                                onClick={() => handleColorChange(preset.value)}
                                                className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-50 transition-colors"
                                            >
                                                <div
                                                    className="w-10 h-10 rounded border-2 border-gray-300 shadow-sm"
                                                    style={{ backgroundColor: preset.value }}
                                                />
                                                <span className="text-xs text-gray-600">{preset.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Professional Colors */}
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-700 mb-2">
                                        Professional
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {COLOR_PRESETS.professional.map((preset) => (
                                            <button
                                                key={preset.value}
                                                type="button"
                                                onClick={() => handleColorChange(preset.value)}
                                                className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-50 transition-colors"
                                            >
                                                <div
                                                    className="w-10 h-10 rounded border-2 border-gray-300 shadow-sm"
                                                    style={{ backgroundColor: preset.value }}
                                                />
                                                <span className="text-xs text-gray-600 text-center leading-tight">{preset.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Warm Colors */}
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-700 mb-2">
                                        Warm
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {COLOR_PRESETS.warm.map((preset) => (
                                            <button
                                                key={preset.value}
                                                type="button"
                                                onClick={() => handleColorChange(preset.value)}
                                                className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-50 transition-colors"
                                            >
                                                <div
                                                    className="w-10 h-10 rounded border-2 border-gray-300 shadow-sm"
                                                    style={{ backgroundColor: preset.value }}
                                                />
                                                <span className="text-xs text-gray-600">{preset.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Cool Colors */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-2">
                                        Cool
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {COLOR_PRESETS.cool.map((preset) => (
                                            <button
                                                key={preset.value}
                                                type="button"
                                                onClick={() => handleColorChange(preset.value)}
                                                className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-50 transition-colors"
                                            >
                                                <div
                                                    className="w-10 h-10 rounded border-2 border-gray-300 shadow-sm"
                                                    style={{ backgroundColor: preset.value }}
                                                />
                                                <span className="text-xs text-gray-600">{preset.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
