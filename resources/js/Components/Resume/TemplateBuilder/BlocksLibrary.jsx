import React, { useState } from 'react';

const STYLED_BLOCKS = {
    headers: [
        {
            id: 'header-minimal',
            name: 'Minimal Header',
            preview: '👤 Minimal',
            config: {
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
                fontFamily: 'DejaVu Sans',
                fontSize: 14,
                padding: 30,
                marginBottom: 20,
                textAlign: 'center',
                showBorder: false
            }
        },
        {
            id: 'header-bold',
            name: 'Bold Header',
            preview: '👤 Bold',
            config: {
                backgroundColor: '#1e293b',
                textColor: '#FFFFFF',
                fontFamily: 'Montserrat',
                fontSize: 16,
                padding: 40,
                marginBottom: 25,
                textAlign: 'center',
                showBorder: false
            }
        },
        {
            id: 'header-gradient',
            name: 'Gradient Header',
            preview: '👤 Gradient',
            config: {
                backgroundColor: '#3b82f6',
                backgroundGradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                textColor: '#FFFFFF',
                fontFamily: 'Poppins',
                fontSize: 15,
                padding: 35,
                marginBottom: 20,
                textAlign: 'left',
                showBorder: false,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }
        },
        {
            id: 'header-bordered',
            name: 'Bordered Header',
            preview: '👤 Bordered',
            config: {
                backgroundColor: '#f8fafc',
                textColor: '#1e293b',
                fontFamily: 'Georgia',
                fontSize: 14,
                padding: 25,
                marginBottom: 20,
                textAlign: 'center',
                showBorder: true,
                borderColor: '#3b82f6',
                borderWidth: 2,
                borderStyle: 'solid',
                borderRadius: 8
            }
        }
    ],
    sections: [
        {
            id: 'section-clean',
            name: 'Clean Section',
            preview: '📝 Clean',
            config: {
                backgroundColor: '#FFFFFF',
                textColor: '#334155',
                fontFamily: 'Inter',
                fontSize: 10,
                padding: 20,
                marginBottom: 15,
                showBorder: false
            }
        },
        {
            id: 'section-card',
            name: 'Card Style',
            preview: '📝 Card',
            config: {
                backgroundColor: '#f8fafc',
                textColor: '#1e293b',
                fontFamily: 'Inter',
                fontSize: 10,
                padding: 20,
                marginBottom: 15,
                showBorder: true,
                borderColor: '#e2e8f0',
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 8,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }
        },
        {
            id: 'section-highlighted',
            name: 'Highlighted',
            preview: '📝 Highlight',
            config: {
                backgroundColor: '#eff6ff',
                textColor: '#1e40af',
                fontFamily: 'Inter',
                fontSize: 10,
                padding: 20,
                marginBottom: 15,
                showBorder: true,
                borderColor: '#3b82f6',
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 0
            }
        },
        {
            id: 'section-elevated',
            name: 'Elevated',
            preview: '📝 Elevated',
            config: {
                backgroundColor: '#FFFFFF',
                textColor: '#1e293b',
                fontFamily: 'Inter',
                fontSize: 10,
                padding: 25,
                marginBottom: 20,
                showBorder: false,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)'
            }
        }
    ],
    colorSchemes: [
        {
            id: 'scheme-professional',
            name: 'Professional Blue',
            colors: {
                primary: '#3b82f6',
                secondary: '#1e293b',
                text: '#334155',
                background: '#FFFFFF'
            }
        },
        {
            id: 'scheme-corporate',
            name: 'Corporate Gray',
            colors: {
                primary: '#475569',
                secondary: '#1e293b',
                text: '#334155',
                background: '#f8fafc'
            }
        },
        {
            id: 'scheme-creative',
            name: 'Creative Purple',
            colors: {
                primary: '#8b5cf6',
                secondary: '#6366f1',
                text: '#1e293b',
                background: '#FFFFFF'
            }
        },
        {
            id: 'scheme-modern',
            name: 'Modern Teal',
            colors: {
                primary: '#14b8a6',
                secondary: '#0891b2',
                text: '#0f172a',
                background: '#FFFFFF'
            }
        },
        {
            id: 'scheme-elegant',
            name: 'Elegant Black',
            colors: {
                primary: '#1e293b',
                secondary: '#334155',
                text: '#475569',
                background: '#FFFFFF'
            }
        }
    ]
};

export default function BlocksLibrary({ onApplyBlock, onApplyColorScheme }) {
    const [activeTab, setActiveTab] = useState('headers');

    const renderBlocks = () => {
        const blocks = STYLED_BLOCKS[activeTab];

        return (
            <div className="space-y-2">
                {blocks.map((block) => (
                    <button
                        key={block.id}
                        onClick={() => {
                            if (activeTab === 'colorSchemes') {
                                onApplyColorScheme(block.colors);
                            } else {
                                onApplyBlock(block.config, activeTab === 'headers' ? 'header' : 'section');
                            }
                        }}
                        className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium">{block.preview || block.name}</div>
                                <div className="text-xs text-gray-500">{block.name}</div>
                            </div>
                            {activeTab === 'colorSchemes' ? (
                                <div className="flex gap-1">
                                    {Object.values(block.colors).map((color, i) => (
                                        <div
                                            key={i}
                                            className="w-4 h-4 rounded-full border border-gray-300"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div
                                    className="w-12 h-12 rounded border border-gray-300 shadow-sm"
                                    style={{
                                        background: block.config.backgroundGradient || block.config.backgroundColor,
                                        borderColor: block.config.showBorder ? block.config.borderColor : 'transparent',
                                        borderWidth: block.config.showBorder ? `${block.config.borderWidth}px` : '0',
                                        boxShadow: block.config.boxShadow || 'none'
                                    }}
                                />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <h3 className="text-base font-semibold">Design Blocks</h3>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                <button
                    onClick={() => setActiveTab('headers')}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                        activeTab === 'headers'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    Headers
                </button>
                <button
                    onClick={() => setActiveTab('sections')}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                        activeTab === 'sections'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    Sections
                </button>
                <button
                    onClick={() => setActiveTab('colorSchemes')}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                        activeTab === 'colorSchemes'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    Colors
                </button>
            </div>

            {/* Blocks Grid */}
            <div>
                {renderBlocks()}
            </div>

            <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-xs text-purple-800">
                ✨ Select section, then click to apply
            </div>
        </div>
    );
}
