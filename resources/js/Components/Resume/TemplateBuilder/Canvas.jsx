import React from 'react';

export default function Canvas({
    sections,
    onDrop,
    onDragOver,
    onSectionClick,
    selectedSection,
    onRemoveSection,
    onReorder,
    layoutMode
}) {
    const handleDragStart = (e, index, column = null) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('reorderIndex', index);
        if (column) {
            e.dataTransfer.setData('fromColumn', column);
        }
    };

    const handleDrop = (e, dropIndex, targetColumn = null) => {
        e.preventDefault();
        const reorderIndex = e.dataTransfer.getData('reorderIndex');
        const fromColumn = e.dataTransfer.getData('fromColumn');

        if (reorderIndex !== '') {
            onReorder(parseInt(reorderIndex), dropIndex, fromColumn, targetColumn);
        } else {
            onDrop(e, targetColumn);
        }
    };

    const getSectionsByColumn = (column) => {
        if (layoutMode === 'single') {
            return column === 'main' ? sections : [];
        }
        return sections.filter(s => (s.column || 'main') === column);
    };

    const renderSection = (section, index, column = null) => (
        <div
            key={section.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index, column)}
            onDrop={(e) => handleDrop(e, index, column)}
            onDragOver={onDragOver}
            onClick={() => onSectionClick(section)}
            className={`p-4 bg-white border-2 rounded-lg cursor-pointer transition-all ${
                selectedSection?.id === section.id
                    ? 'border-blue-500 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                    <div>
                        <div className="font-medium">{section.label}</div>
                        <div className="text-xs text-gray-500">
                            {section.config?.width || 'Full'} width
                            {section.column && ` • ${section.column} column`}
                        </div>
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemoveSection(section.id);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );

    const renderColumn = (columnName, columnSections) => (
        <div
            onDrop={(e) => handleDrop(e, columnSections.length, columnName)}
            onDragOver={onDragOver}
            className="min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50"
        >
            {columnSections.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-sm">Drop sections here</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {columnSections.map((section, index) => renderSection(section, index, columnName))}
                </div>
            )}
        </div>
    );

    if (layoutMode === 'single') {
        const mainSections = getSectionsByColumn('main');
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Canvas</h3>
                    <span className="text-sm text-gray-500">{sections.length} sections</span>
                </div>

                <div
                    onDrop={(e) => handleDrop(e, mainSections.length, 'main')}
                    onDragOver={onDragOver}
                    className="min-h-[500px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50"
                >
                    {sections.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
                            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-lg font-medium">Empty Canvas</p>
                            <p className="text-sm">Drag components from the library to start building</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {mainSections.map((section, index) => renderSection(section, index, 'main'))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Two-column layout
    const leftSections = getSectionsByColumn('left');
    const rightSections = getSectionsByColumn('right');

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Canvas - Two Column Layout</h3>
                <span className="text-sm text-gray-500">{sections.length} sections</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {/* Left Column (Sidebar) */}
                <div>
                    <div className="text-xs font-semibold text-gray-600 mb-2 px-2">LEFT SIDEBAR</div>
                    {renderColumn('left', leftSections)}
                </div>

                {/* Right Column (Main) */}
                <div className="col-span-2">
                    <div className="text-xs font-semibold text-gray-600 mb-2 px-2">MAIN CONTENT</div>
                    {renderColumn('right', rightSections)}
                </div>
            </div>

            {sections.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium">Empty Canvas</p>
                    <p className="text-sm">Drag components to either column to start building</p>
                </div>
            )}
        </div>
    );
}
