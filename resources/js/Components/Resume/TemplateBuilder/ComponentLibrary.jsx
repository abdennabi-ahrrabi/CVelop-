import React, { useState } from 'react';

const AVAILABLE_SECTIONS = {
    essential: [
        { type: 'header', label: 'Header', icon: '👤', description: 'Name and contact information' },
        { type: 'summary', label: 'Summary', icon: '📝', description: 'Professional summary or objective' },
        { type: 'experience', label: 'Work Experience', icon: '💼', description: 'Employment history' },
        { type: 'education', label: 'Education', icon: '🎓', description: 'Academic background' },
        { type: 'skills', label: 'Skills', icon: '⚡', description: 'Technical and soft skills' },
    ],
    additional: [
        { type: 'certifications', label: 'Certifications', icon: '📜', description: 'Professional certifications' },
        { type: 'projects', label: 'Projects', icon: '🚀', description: 'Portfolio projects' },
        { type: 'languages', label: 'Languages', icon: '🌍', description: 'Language proficiencies' },
        { type: 'awards', label: 'Awards', icon: '🏆', description: 'Achievements and recognitions' },
        { type: 'publications', label: 'Publications', icon: '📚', description: 'Articles and papers' },
        { type: 'volunteering', label: 'Volunteering', icon: '🤝', description: 'Community service' },
        { type: 'hobbies', label: 'Hobbies & Interests', icon: '🎨', description: 'Personal interests' },
        { type: 'references', label: 'References', icon: '👥', description: 'Professional references' },
    ],
    custom: [
        { type: 'custom', label: 'Custom Section', icon: '✨', description: 'Create your own section' },
        { type: 'spacer', label: 'Spacer', icon: '➖', description: 'Add vertical spacing' },
        { type: 'divider', label: 'Divider Line', icon: '—', description: 'Horizontal divider line' },
    ]
};

export default function ComponentLibrary({ onDragStart, onLayoutPresetSelect }) {
    const [activeCategory, setActiveCategory] = useState('essential');

    const layoutPresets = [
        { id: 'classic', name: 'Classic', icon: '📄', description: 'Single column layout' },
        { id: 'modern', name: 'Modern', icon: '📱', description: 'Two columns with sidebar' },
        { id: 'creative', name: 'Creative', icon: '🎨', description: 'Asymmetric layout' },
    ];

    return (
        <div className="space-y-6">
            {/* Layout Presets */}
            <div>
                <h3 className="text-base font-semibold mb-3">Layout Presets</h3>
                <div className="grid grid-cols-1 gap-2">
                    {layoutPresets.map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => onLayoutPresetSelect(preset.id)}
                            className="p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{preset.icon}</span>
                                <div>
                                    <div className="font-medium text-sm">{preset.name}</div>
                                    <div className="text-xs text-gray-500">{preset.description}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Section Components */}
            <div>
                <h3 className="text-base font-semibold mb-3">Components</h3>

                {/* Category Tabs */}
                <div className="flex gap-2 mb-3">
                    <button
                        onClick={() => setActiveCategory('essential')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            activeCategory === 'essential'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Essential
                    </button>
                    <button
                        onClick={() => setActiveCategory('additional')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            activeCategory === 'additional'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Additional
                    </button>
                    <button
                        onClick={() => setActiveCategory('custom')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            activeCategory === 'custom'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Custom
                    </button>
                </div>

                {/* Sections List */}
                <div className="space-y-2">
                    {AVAILABLE_SECTIONS[activeCategory].map((section) => (
                        <div
                            key={section.type}
                            draggable
                            onDragStart={(e) => onDragStart(e, section)}
                            className="p-2.5 border border-gray-200 rounded-lg cursor-move hover:border-blue-400 hover:bg-blue-50 transition-colors"
                        >
                            <div className="flex items-center gap-2.5">
                                <span className="text-xl">{section.icon}</span>
                                <div>
                                    <div className="font-medium text-sm">{section.label}</div>
                                    <div className="text-xs text-gray-500">{section.description}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                    💡 Drag to preview area
                </p>
            </div>
        </div>
    );
}
