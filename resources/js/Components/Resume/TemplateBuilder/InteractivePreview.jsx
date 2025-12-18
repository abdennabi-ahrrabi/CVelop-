import React, { useState, useRef } from 'react';

export default function InteractivePreview({
    sections,
    onSectionClick,
    onSectionUpdate,
    onSectionReorder,
    onSectionDrop,
    onRemoveSection,
    onDuplicateSection,
    selectedSection,
    layoutMode,
}) {
    const [draggedSection, setDraggedSection] = useState(null);
    const [resizingSection, setResizingSection] = useState(null);
    const [resizeStart, setResizeStart] = useState(null);
    const [zoom, setZoom] = useState(0.85); // Start at 85% for better fit
    const previewRef = useRef(null);
    const containerRef = useRef(null);

    const handleSectionDragStart = (e, section, index) => {
        e.stopPropagation();
        setDraggedSection({ section, index });
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleSectionDrop = (e, targetIndex, targetColumn) => {
        e.preventDefault();
        e.stopPropagation();

        if (draggedSection) {
            // Reordering existing section
            onSectionReorder(draggedSection.index, targetIndex, draggedSection.section.column, targetColumn);
            setDraggedSection(null);
        } else {
            // New section from library
            onSectionDrop(e, targetColumn);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleResizeStart = (e, section) => {
        e.preventDefault();
        e.stopPropagation();
        setResizingSection(section);
        setResizeStart({ x: e.clientX, y: e.clientY, originalPadding: section.config?.padding || 20 });
    };

    const handleResizeMove = (e) => {
        if (!resizingSection || !resizeStart) return;

        const deltaY = e.clientY - resizeStart.y;
        const newPadding = Math.max(0, Math.min(100, resizeStart.originalPadding + Math.floor(deltaY / 2)));

        onSectionUpdate({
            ...resizingSection,
            config: {
                ...resizingSection.config,
                padding: newPadding,
            },
        });
    };

    const handleResizeEnd = () => {
        setResizingSection(null);
        setResizeStart(null);
    };

    const handleFontSizeChange = (section, change) => {
        const currentSize = section.config?.fontSize || 10;
        const newSize = Math.max(8, Math.min(24, currentSize + change));
        onSectionUpdate({
            ...section,
            config: {
                ...section.config,
                fontSize: newSize,
            },
        });
    };

    const handleMarginChange = (section, change) => {
        const currentMargin = section.config?.marginBottom || 20;
        const newMargin = Math.max(0, Math.min(50, currentMargin + change));
        onSectionUpdate({
            ...section,
            config: {
                ...section.config,
                marginBottom: newMargin,
            },
        });
    };

    const handleAutoFit = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            const containerWidth = container.clientWidth - 64; // Account for padding
            const containerHeight = container.clientHeight - 64;

            // A4 dimensions in pixels (assuming 96 DPI)
            const a4Width = 210 * 3.7795275591; // 210mm to pixels
            const a4Height = 297 * 3.7795275591; // 297mm to pixels

            // Calculate zoom to fit
            const zoomWidth = containerWidth / a4Width;
            const zoomHeight = containerHeight / a4Height;
            const optimalZoom = Math.min(zoomWidth, zoomHeight, 1.5);

            setZoom(Math.max(0.5, optimalZoom));
        }
    };

    React.useEffect(() => {
        if (resizingSection) {
            document.addEventListener('mousemove', handleResizeMove);
            document.addEventListener('mouseup', handleResizeEnd);
            return () => {
                document.removeEventListener('mousemove', handleResizeMove);
                document.removeEventListener('mouseup', handleResizeEnd);
            };
        }
    }, [resizingSection, resizeStart]);

    // Keyboard shortcuts for zoom
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            // Zoom in: Ctrl + =
            if (e.ctrlKey && (e.key === '=' || e.key === '+')) {
                e.preventDefault();
                setZoom(Math.min(1.5, zoom + 0.1));
            }
            // Zoom out: Ctrl + -
            if (e.ctrlKey && e.key === '-') {
                e.preventDefault();
                setZoom(Math.max(0.5, zoom - 0.1));
            }
            // Reset zoom: Ctrl + 0
            if (e.ctrlKey && e.key === '0') {
                e.preventDefault();
                handleAutoFit();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [zoom]);

    const renderQuickToolbar = (section, index) => {
        if (selectedSection?.id !== section.id) return null;

        return (
            <div className="absolute -top-10 left-0 right-0 flex justify-center z-20">
                <div className="flex items-center gap-1 bg-blue-600 text-white rounded-lg px-2 py-1 shadow-lg text-xs">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleFontSizeChange(section, -1); }}
                        className="px-2 py-1 hover:bg-blue-700 rounded"
                        title="Decrease font size"
                    >
                        A-
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleFontSizeChange(section, 1); }}
                        className="px-2 py-1 hover:bg-blue-700 rounded"
                        title="Increase font size"
                    >
                        A+
                    </button>
                    <div className="w-px h-4 bg-blue-400 mx-1"></div>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleMarginChange(section, -5); }}
                        className="px-2 py-1 hover:bg-blue-700 rounded"
                        title="Decrease spacing"
                    >
                        ↕-
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleMarginChange(section, 5); }}
                        className="px-2 py-1 hover:bg-blue-700 rounded"
                        title="Increase spacing"
                    >
                        ↕+
                    </button>
                    <div className="w-px h-4 bg-blue-400 mx-1"></div>
                    <span className="px-2 text-blue-100">{section.config?.fontSize || 10}pt</span>
                </div>
            </div>
        );
    };

    const renderSection = (section, index, column = null) => {
        const config = section.config || {};
        const isSelected = selectedSection?.id === section.id;
        const isDragging = draggedSection?.section.id === section.id;

        // Build gradient background
        let background = config.backgroundColor || '#FFFFFF';
        if (config.useGradient) {
            const start = config.gradientStart || '#3b82f6';
            const end = config.gradientEnd || '#8b5cf6';
            const direction = config.gradientDirection || '135deg';
            background = `linear-gradient(${direction}, ${start}, ${end})`;
        }

        // Build box shadow
        let boxShadow = 'none';
        if (config.useBoxShadow) {
            const x = config.shadowX || 0;
            const y = config.shadowY || 4;
            const blur = config.shadowBlur || 6;
            const spread = config.shadowSpread || 0;
            const color = config.shadowColor || '#000000';
            const opacity = (config.shadowOpacity || 10) / 100;
            boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
        }

        const style = {
            background: background,
            color: config.textColor || '#000000',
            fontFamily: config.fontFamily || 'DejaVu Sans',
            fontSize: `${config.fontSize || 10}pt`,
            lineHeight: config.lineHeight || 1.5,
            padding: `${config.padding || 20}px`,
            marginBottom: `${config.marginBottom || 20}px`,
            border: config.showBorder
                ? `${config.borderWidth || 1}px ${config.borderStyle || 'solid'} ${config.borderColor || '#CCCCCC'}`
                : 'none',
            borderRadius: config.showBorder ? `${config.borderRadius || 0}px` : '0',
            textAlign: config.textAlign || 'left',
            opacity: (config.opacity || 100) / 100,
            boxShadow: boxShadow,
            cursor: 'move',
            position: 'relative',
        };

        if (isDragging) {
            style.opacity = 0.5;
        }

        const getSampleContent = () => {
            switch (section.type) {
                case 'header':
                    return (
                        <>
                            <div style={{ fontSize: '16pt', fontWeight: 'bold', marginBottom: '5px' }}>John Doe</div>
                            <div style={{ fontSize: '9pt' }}>john.doe@email.com | (555) 123-4567 | New York, NY</div>
                        </>
                    );
                case 'summary':
                    return <p>Experienced professional with a proven track record of success in delivering high-quality results.</p>;
                case 'experience':
                    return (
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Senior Developer</div>
                            <div style={{ fontSize: '9pt', color: '#666' }}>Tech Company | 2020 - Present</div>
                            <div style={{ fontSize: '9pt', marginTop: '5px' }}>Led development of multiple projects.</div>
                        </div>
                    );
                case 'education':
                    return (
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Bachelor of Science in Computer Science</div>
                            <div style={{ fontSize: '9pt', color: '#666' }}>University Name | 2016 - 2020</div>
                        </div>
                    );
                case 'skills':
                    return <div style={{ fontSize: '9pt' }}>JavaScript, React, Node.js, Python, SQL, Git</div>;
                case 'certifications':
                    return (
                        <div>
                            <div style={{ fontWeight: 'bold' }}>AWS Certified Solutions Architect</div>
                            <div style={{ fontSize: '9pt', color: '#666' }}>Amazon Web Services | 2022</div>
                        </div>
                    );
                case 'projects':
                    return (
                        <div>
                            <div style={{ fontWeight: 'bold' }}>E-commerce Platform</div>
                            <div style={{ fontSize: '9pt', marginTop: '5px' }}>Built a full-stack e-commerce solution</div>
                        </div>
                    );
                case 'languages':
                    return <div style={{ fontSize: '9pt' }}>English (Native), Spanish (Intermediate)</div>;
                case 'awards':
                    return (
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Employee of the Year</div>
                            <div style={{ fontSize: '9pt', color: '#666' }}>Tech Company | 2022</div>
                        </div>
                    );
                case 'publications':
                    return (
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Modern Web Development</div>
                            <div style={{ fontSize: '9pt', color: '#666' }}>Tech Journal | 2023</div>
                        </div>
                    );
                case 'volunteering':
                    return (
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Code Mentor</div>
                            <div style={{ fontSize: '9pt', color: '#666' }}>Coding Bootcamp | 2021 - Present</div>
                        </div>
                    );
                case 'hobbies':
                    return <div style={{ fontSize: '9pt' }}>Photography, Hiking, Playing Guitar</div>;
                case 'references':
                    return <div style={{ fontSize: '9pt', fontWeight: 'bold' }}>Available upon request</div>;
                case 'custom':
                    return <div style={{ fontSize: '9pt', fontStyle: 'italic', color: '#999' }}>Your custom content...</div>;
                case 'spacer':
                    return <div style={{ height: '20px', background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, #e5e7eb 10px, #e5e7eb 11px)' }}></div>;
                case 'divider':
                    return <hr style={{ border: 'none', borderTop: '2px solid #ccc', margin: '0' }} />;
                default:
                    return <div style={{ fontSize: '9pt', color: '#999' }}>Section content</div>;
            }
        };

        return (
            <div
                key={section.id}
                draggable
                onDragStart={(e) => handleSectionDragStart(e, section, index)}
                onDrop={(e) => handleSectionDrop(e, index, column)}
                onDragOver={handleDragOver}
                onClick={(e) => {
                    e.stopPropagation();
                    onSectionClick(section);
                }}
                className={`relative transition-all ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-blue-300'}`}
                style={style}
            >
                {/* Quick Toolbar */}
                {renderQuickToolbar(section, index)}

                {/* Section Content */}
                {section.type !== 'spacer' && section.type !== 'divider' && (
                    <h3 style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '12pt' }}>
                        {config.customTitle || section.label}
                    </h3>
                )}
                <div style={{ fontSize: '9pt' }}>
                    {getSampleContent()}
                </div>

                {/* Action Buttons */}
                {isSelected && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDuplicateSection(section);
                            }}
                            className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors shadow-lg"
                            title="Duplicate Section (Ctrl+D)"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (section.type === 'header') {
                                    if (confirm('Are you sure you want to delete the header section?')) {
                                        onRemoveSection(section.id);
                                    }
                                } else {
                                    onRemoveSection(section.id);
                                }
                            }}
                            className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded transition-colors shadow-lg"
                            title="Delete Section (Del)"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Resize Handle */}
                {isSelected && (
                    <div
                        onMouseDown={(e) => handleResizeStart(e, section)}
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-16 h-2 bg-blue-500 rounded-full cursor-ns-resize hover:bg-blue-600 shadow-lg flex items-center justify-center"
                        title="Drag to resize padding"
                    >
                        <div className="w-8 h-0.5 bg-white rounded"></div>
                    </div>
                )}

                {/* Size Indicator */}
                {isSelected && (
                    <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded pointer-events-none">
                        {config.padding || 20}px padding
                    </div>
                )}
            </div>
        );
    };

    const getSectionsByColumn = (column) => {
        if (layoutMode === 'single') {
            return column === 'main' ? sections : [];
        }
        return sections.filter(s => (s.column || 'right') === column);
    };

    const renderSingleColumn = () => {
        const mainSections = getSectionsByColumn('main');

        return (
            <div
                onDrop={(e) => handleSectionDrop(e, mainSections.length, 'main')}
                onDragOver={handleDragOver}
                style={{ padding: '40px', minHeight: '100%', backgroundColor: '#fff' }}
            >
                {sections.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400 py-20">
                        <div className="text-center">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <p className="text-lg font-medium">Drop sections here</p>
                            <p className="text-sm">Drag components from the library or canvas</p>
                        </div>
                    </div>
                ) : (
                    mainSections.map((section, index) => renderSection(section, index, 'main'))
                )}
            </div>
        );
    };

    const renderTwoColumn = () => {
        const leftSections = getSectionsByColumn('left');
        const rightSections = getSectionsByColumn('right');

        return (
            <div style={{ display: 'flex', minHeight: '100%' }}>
                {/* Left Sidebar */}
                <div
                    onDrop={(e) => handleSectionDrop(e, leftSections.length, 'left')}
                    onDragOver={handleDragOver}
                    style={{ width: '33.333%', padding: '40px 20px', backgroundColor: '#f9fafb', borderRight: '1px solid #e5e7eb' }}
                >
                    {leftSections.length === 0 ? (
                        <div className="text-center text-gray-400 py-12">
                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <p className="text-sm font-medium">Left Sidebar</p>
                            <p className="text-xs">Drop sections here</p>
                        </div>
                    ) : (
                        leftSections.map((section, index) => renderSection(section, index, 'left'))
                    )}
                </div>

                {/* Main Content */}
                <div
                    onDrop={(e) => handleSectionDrop(e, rightSections.length, 'right')}
                    onDragOver={handleDragOver}
                    style={{ flex: 1, padding: '40px', backgroundColor: '#fff' }}
                >
                    {rightSections.length === 0 ? (
                        <div className="text-center text-gray-400 py-12">
                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <p className="text-sm font-medium">Main Content</p>
                            <p className="text-xs">Drop sections here</p>
                        </div>
                    ) : (
                        rightSections.map((section, index) => renderSection(section, index, 'right'))
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="relative w-full h-full flex flex-col">
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2">
                <button
                    onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                    title="Zoom Out"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                    </svg>
                </button>
                <span className="text-xs font-medium text-gray-600 min-w-[3rem] text-center">
                    {Math.round(zoom * 100)}%
                </span>
                <button
                    onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                    title="Zoom In"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                </button>
                <div className="w-px h-5 bg-gray-300 mx-1"></div>
                <button
                    onClick={handleAutoFit}
                    className="px-2 py-1 text-xs font-medium rounded hover:bg-gray-100 transition-colors"
                    title="Auto Fit (Ctrl+0)"
                >
                    Fit
                </button>
            </div>

            {/* Status Bar */}
            <div className="absolute top-4 left-4 z-30 bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2 flex items-center gap-3">
                <span className="text-xs font-medium text-green-600">
                    ✨ Interactive
                </span>
                <div className="w-px h-4 bg-gray-300"></div>
                <span className="text-xs text-gray-600">
                    {sections.length} section{sections.length !== 1 ? 's' : ''}
                </span>
                <div className="w-px h-4 bg-gray-300"></div>
                <span className="text-xs text-gray-600">
                    {layoutMode === 'single' ? '1 Column' : '2 Columns'}
                </span>
            </div>

            {/* Paper Preview */}
            <div ref={containerRef} className="flex-1 overflow-auto">
                <div className="min-h-full flex items-start justify-center p-8">
                    <div
                        ref={previewRef}
                        className="bg-white shadow-2xl transition-transform duration-200"
                        style={{
                            width: '210mm', // A4 width
                            minHeight: '297mm', // A4 height
                            transform: `scale(${zoom})`,
                            transformOrigin: 'top center',
                        }}
                    >
                        {layoutMode === 'single' ? renderSingleColumn() : renderTwoColumn()}
                    </div>
                </div>
            </div>

            {/* Help Tooltip */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 bg-blue-600 text-white rounded-lg shadow-lg px-4 py-2 max-w-3xl">
                <p className="text-xs text-center">
                    💡 Drag to reorder • Click to select • Use toolbar for edits • Resize handle for padding • Ctrl+/- to zoom • Ctrl+0 to fit
                </p>
            </div>
        </div>
    );
}
