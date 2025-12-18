import React from 'react';
import ColorPicker from './ColorPicker';

const GOOGLE_FONTS = [
    'DejaVu Sans', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia',
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Inter', 'Playfair Display'
];

const TYPOGRAPHY_PRESETS = [
    {
        name: 'Professional',
        description: 'Clean and business-ready',
        fontFamily: 'Arial',
        fontSize: 10,
        lineHeight: 1.5,
    },
    {
        name: 'Modern',
        description: 'Contemporary and stylish',
        fontFamily: 'Inter',
        fontSize: 10,
        lineHeight: 1.6,
    },
    {
        name: 'Classic',
        description: 'Traditional and elegant',
        fontFamily: 'Georgia',
        fontSize: 11,
        lineHeight: 1.7,
    },
    {
        name: 'Bold',
        description: 'Stand out with impact',
        fontFamily: 'Montserrat',
        fontSize: 11,
        lineHeight: 1.5,
    },
    {
        name: 'Minimal',
        description: 'Simple and clean',
        fontFamily: 'Helvetica',
        fontSize: 9,
        lineHeight: 1.4,
    },
    {
        name: 'Creative',
        description: 'Artistic and unique',
        fontFamily: 'Poppins',
        fontSize: 10,
        lineHeight: 1.6,
    },
];

export default function PropertyPanel({ section, onUpdate, layoutMode }) {
    if (!section) {
        return (
            <div className="p-6">
                <h3 className="text-base font-semibold mb-4">Properties</h3>
                <div className="text-center text-gray-400 py-8">
                    <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <p className="text-xs">Select a section to edit</p>
                </div>
            </div>
        );
    }

    const handleChange = (property, value) => {
        onUpdate({
            ...section,
            config: {
                ...section.config,
                [property]: value,
            },
        });
    };

    const handleColumnChange = (column) => {
        onUpdate({
            ...section,
            column: column,
        });
    };

    return (
        <div className="p-4">
            <h3 className="text-base font-semibold mb-4">Properties</h3>

            <div className="space-y-3">
                {/* Section Title */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Section Title
                    </label>
                    <input
                        type="text"
                        value={section.config?.customTitle || section.label}
                        onChange={(e) => handleChange('customTitle', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Typography Presets */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Typography Presets
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {TYPOGRAPHY_PRESETS.map((preset) => (
                            <button
                                key={preset.name}
                                type="button"
                                onClick={() => {
                                    onUpdate({
                                        ...section,
                                        config: {
                                            ...section.config,
                                            fontFamily: preset.fontFamily,
                                            fontSize: preset.fontSize,
                                            lineHeight: preset.lineHeight,
                                        },
                                    });
                                }}
                                className="p-2 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
                                style={{ fontFamily: preset.fontFamily }}
                            >
                                <div className="text-xs font-semibold text-gray-900">{preset.name}</div>
                                <div className="text-xs text-gray-500 truncate">{preset.description}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Column Selection (only for two-column layout) */}
                {layoutMode === 'two-column' && (
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Column Position
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => handleColumnChange('left')}
                                className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${
                                    (section.column || 'right') === 'left'
                                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                Left Sidebar
                            </button>
                            <button
                                onClick={() => handleColumnChange('right')}
                                className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${
                                    (section.column || 'right') === 'right'
                                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                Main Content
                            </button>
                        </div>
                    </div>
                )}

                {/* Width Control */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Section Width
                    </label>
                    <select
                        value={section.config?.width || 'full'}
                        onChange={(e) => handleChange('width', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="full">Full Width</option>
                        <option value="half">Half Width</option>
                        <option value="third">One Third</option>
                        <option value="two-thirds">Two Thirds</option>
                    </select>
                </div>

                {/* Font Family */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Font Family
                    </label>
                    <select
                        value={section.config?.fontFamily || 'DejaVu Sans'}
                        onChange={(e) => handleChange('fontFamily', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ fontFamily: section.config?.fontFamily || 'DejaVu Sans' }}
                    >
                        {GOOGLE_FONTS.map(font => (
                            <option key={font} value={font} style={{ fontFamily: font }}>
                                {font}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Background Color */}
                <ColorPicker
                    label="Background Color"
                    value={section.config?.backgroundColor || '#FFFFFF'}
                    onChange={(value) => handleChange('backgroundColor', value)}
                />

                {/* Text Color */}
                <ColorPicker
                    label="Text Color"
                    value={section.config?.textColor || '#000000'}
                    onChange={(value) => handleChange('textColor', value)}
                />

                {/* Gradient Background */}
                <div>
                    <label className="flex items-center gap-2 mb-2">
                        <input
                            type="checkbox"
                            checked={section.config?.useGradient || false}
                            onChange={(e) => handleChange('useGradient', e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Use Gradient Background</span>
                    </label>
                    {section.config?.useGradient && (
                        <div className="space-y-2 pl-6">
                            <ColorPicker
                                label="Start Color"
                                value={section.config?.gradientStart || '#3b82f6'}
                                onChange={(value) => handleChange('gradientStart', value)}
                                showPresets={false}
                            />
                            <ColorPicker
                                label="End Color"
                                value={section.config?.gradientEnd || '#8b5cf6'}
                                onChange={(value) => handleChange('gradientEnd', value)}
                                showPresets={false}
                            />
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Direction</label>
                                <select
                                    value={section.config?.gradientDirection || '135deg'}
                                    onChange={(e) => handleChange('gradientDirection', e.target.value)}
                                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="90deg">Left to Right</option>
                                    <option value="180deg">Top to Bottom</option>
                                    <option value="135deg">Diagonal ↘</option>
                                    <option value="45deg">Diagonal ↗</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Opacity */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Opacity: {section.config?.opacity || 100}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={section.config?.opacity || 100}
                        onChange={(e) => handleChange('opacity', parseInt(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Box Shadow */}
                <div>
                    <label className="flex items-center gap-2 mb-2">
                        <input
                            type="checkbox"
                            checked={section.config?.useBoxShadow || false}
                            onChange={(e) => handleChange('useBoxShadow', e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Add Shadow</span>
                    </label>
                    {section.config?.useBoxShadow && (
                        <div className="space-y-2 pl-6">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">X Offset</label>
                                    <input
                                        type="number"
                                        value={section.config?.shadowX || 0}
                                        onChange={(e) => handleChange('shadowX', parseInt(e.target.value))}
                                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Y Offset</label>
                                    <input
                                        type="number"
                                        value={section.config?.shadowY || 4}
                                        onChange={(e) => handleChange('shadowY', parseInt(e.target.value))}
                                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Blur</label>
                                    <input
                                        type="number"
                                        value={section.config?.shadowBlur || 6}
                                        onChange={(e) => handleChange('shadowBlur', parseInt(e.target.value))}
                                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Spread</label>
                                    <input
                                        type="number"
                                        value={section.config?.shadowSpread || 0}
                                        onChange={(e) => handleChange('shadowSpread', parseInt(e.target.value))}
                                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                                    />
                                </div>
                            </div>
                            <ColorPicker
                                label="Shadow Color"
                                value={section.config?.shadowColor || '#000000'}
                                onChange={(value) => handleChange('shadowColor', value)}
                                showPresets={false}
                            />
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Shadow Opacity: {section.config?.shadowOpacity || 10}%</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={section.config?.shadowOpacity || 10}
                                    onChange={(e) => handleChange('shadowOpacity', parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Font Size */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Font Size: {section.config?.fontSize || 10}pt
                    </label>
                    <input
                        type="range"
                        min="8"
                        max="24"
                        value={section.config?.fontSize || 10}
                        onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Line Height */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Line Height: {section.config?.lineHeight || 1.5}
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="2.5"
                        step="0.1"
                        value={section.config?.lineHeight || 1.5}
                        onChange={(e) => handleChange('lineHeight', parseFloat(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Padding */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Padding: {section.config?.padding || 20}px
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={section.config?.padding || 20}
                        onChange={(e) => handleChange('padding', parseInt(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Margin Bottom */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Margin Bottom: {section.config?.marginBottom || 20}px
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={section.config?.marginBottom || 20}
                        onChange={(e) => handleChange('marginBottom', parseInt(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Border Toggle */}
                <div>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={section.config?.showBorder || false}
                            onChange={(e) => handleChange('showBorder', e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Show Border</span>
                    </label>
                </div>

                {/* Border Options */}
                {section.config?.showBorder && (
                    <>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Border Style
                            </label>
                            <select
                                value={section.config?.borderStyle || 'solid'}
                                onChange={(e) => handleChange('borderStyle', e.target.value)}
                                className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="solid">Solid</option>
                                <option value="dashed">Dashed</option>
                                <option value="dotted">Dotted</option>
                                <option value="double">Double</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Border Width: {section.config?.borderWidth || 1}px
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={section.config?.borderWidth || 1}
                                onChange={(e) => handleChange('borderWidth', parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <ColorPicker
                            label="Border Color"
                            value={section.config?.borderColor || '#CCCCCC'}
                            onChange={(value) => handleChange('borderColor', value)}
                            showPresets={false}
                        />

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Border Radius: {section.config?.borderRadius || 0}px
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                value={section.config?.borderRadius || 0}
                                onChange={(e) => handleChange('borderRadius', parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </>
                )}

                {/* Text Alignment */}
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Text Alignment
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {['left', 'center', 'right'].map(align => (
                            <button
                                key={align}
                                onClick={() => handleChange('textAlign', align)}
                                className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors capitalize ${
                                    (section.config?.textAlign || 'left') === align
                                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                {align}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
