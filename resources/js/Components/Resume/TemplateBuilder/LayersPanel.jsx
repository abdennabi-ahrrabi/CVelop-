import React, { useState } from 'react';

export default function LayersPanel({
    sections,
    selectedSection,
    onSectionClick,
    onSectionReorder,
    onSectionToggleVisibility,
    onSectionToggleLock,
    onSectionRename
}) {
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');

    const handleStartRename = (section, e) => {
        e.stopPropagation();
        setEditingId(section.id);
        setEditingName(section.config?.customTitle || section.label);
    };

    const handleFinishRename = (section) => {
        if (editingName.trim()) {
            onSectionRename(section, editingName);
        }
        setEditingId(null);
    };

    const handleDragStart = (e, index) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('layerIndex', index);
    };

    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        const sourceIndex = parseInt(e.dataTransfer.getData('layerIndex'));
        if (sourceIndex !== targetIndex) {
            onSectionReorder(sourceIndex, targetIndex);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const getIconForType = (type) => {
        const icons = {
            header: '👤',
            summary: '📝',
            experience: '💼',
            education: '🎓',
            skills: '⚡',
            certifications: '📜',
            projects: '🚀',
            languages: '🌍',
            awards: '🏆',
            publications: '📚',
            volunteering: '🤝',
            hobbies: '🎨',
            references: '👥',
            custom: '✨',
            spacer: '➖',
            divider: '—'
        };
        return icons[type] || '📄';
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">Layers</h3>
                <span className="text-xs text-gray-500">{sections.length} sections</span>
            </div>

            <div className="space-y-1">
                {sections.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5z" />
                        </svg>
                        <p className="text-sm">No layers yet</p>
                    </div>
                ) : (
                    sections.map((section, index) => (
                        <div
                            key={section.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragOver={handleDragOver}
                            onClick={() => onSectionClick(section)}
                            className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                                selectedSection?.id === section.id
                                    ? 'bg-blue-50 border-2 border-blue-500'
                                    : 'hover:bg-gray-50 border-2 border-transparent'
                            } ${section.hidden ? 'opacity-40' : ''} ${section.locked ? 'cursor-not-allowed' : ''}`}
                        >
                            {/* Drag Handle */}
                            <div className="text-gray-400 cursor-move">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                </svg>
                            </div>

                            {/* Icon */}
                            <span className="text-lg">{getIconForType(section.type)}</span>

                            {/* Name */}
                            {editingId === section.id ? (
                                <input
                                    type="text"
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                    onBlur={() => handleFinishRename(section)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleFinishRename(section);
                                        if (e.key === 'Escape') setEditingId(null);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    autoFocus
                                    className="flex-1 px-2 py-1 text-sm border border-blue-500 rounded focus:outline-none"
                                />
                            ) : (
                                <div
                                    className="flex-1 text-sm font-medium truncate"
                                    onDoubleClick={(e) => handleStartRename(section, e)}
                                >
                                    {section.config?.customTitle || section.label}
                                </div>
                            )}

                            {/* Column Badge */}
                            {section.column && section.column !== 'main' && (
                                <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded">
                                    {section.column === 'left' ? 'L' : 'R'}
                                </span>
                            )}

                            {/* Controls */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {/* Visibility Toggle */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSectionToggleVisibility(section);
                                    }}
                                    className="p-1 hover:bg-gray-200 rounded"
                                    title={section.hidden ? 'Show' : 'Hide'}
                                >
                                    {section.hidden ? (
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>

                                {/* Lock Toggle */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSectionToggleLock(section);
                                    }}
                                    className="p-1 hover:bg-gray-200 rounded"
                                    title={section.locked ? 'Unlock' : 'Lock'}
                                >
                                    {section.locked ? (
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
                💡 Double-click to rename • Drag to reorder
            </div>
        </div>
    );
}
