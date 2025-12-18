import React from 'react';

export default function PreviewPanel({ sections, templateName, colors, layoutMode }) {
    const renderSection = (section) => {
        const config = section.config || {};
        const style = {
            backgroundColor: config.backgroundColor || '#FFFFFF',
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
        };

        const title = config.customTitle || section.label;

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
                            <div style={{ fontSize: '9pt', marginTop: '5px' }}>Built a full-stack e-commerce solution with React and Node.js</div>
                        </div>
                    );
                case 'languages':
                    return <div style={{ fontSize: '9pt' }}>English (Native), Spanish (Intermediate), French (Basic)</div>;
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
                            <div style={{ fontWeight: 'bold' }}>Modern Web Development Best Practices</div>
                            <div style={{ fontSize: '9pt', color: '#666' }}>Tech Journal | 2023</div>
                        </div>
                    );
                case 'volunteering':
                    return (
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Code Mentor</div>
                            <div style={{ fontSize: '9pt', color: '#666' }}>Local Coding Bootcamp | 2021 - Present</div>
                        </div>
                    );
                case 'hobbies':
                    return <div style={{ fontSize: '9pt' }}>Photography, Hiking, Playing Guitar, Reading Tech Blogs</div>;
                case 'references':
                    return (
                        <div style={{ fontSize: '9pt' }}>
                            <div style={{ fontWeight: 'bold' }}>Available upon request</div>
                        </div>
                    );
                case 'custom':
                    return <div style={{ fontSize: '9pt', fontStyle: 'italic', color: '#999' }}>Your custom content here...</div>;
                case 'spacer':
                    return <div style={{ height: '20px' }}></div>;
                case 'divider':
                    return <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '10px 0' }} />;
                default:
                    return <div style={{ fontSize: '9pt', color: '#999' }}>Section content</div>;
            }
        };

        return (
            <div key={section.id} style={style}>
                {section.type !== 'spacer' && section.type !== 'divider' && (
                    <h3 style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '12pt' }}>
                        {title}
                    </h3>
                )}
                <div style={{ fontSize: '9pt' }}>
                    {getSampleContent()}
                </div>
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
        return (
            <div style={{ padding: '40px', minHeight: '100%' }}>
                {sections.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <p>Preview will appear here</p>
                        </div>
                    </div>
                ) : (
                    sections.map((section) => renderSection(section))
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
                <div style={{ width: '33.333%', padding: '40px 20px', backgroundColor: '#f9fafb', borderRight: '1px solid #e5e7eb' }}>
                    {leftSections.length > 0 ? (
                        leftSections.map((section) => renderSection(section))
                    ) : (
                        <div className="text-center text-gray-400 text-xs py-8">
                            <p>Left sidebar</p>
                            <p>Drop sections here</p>
                        </div>
                    )}
                </div>
                {/* Main Content */}
                <div style={{ flex: 1, padding: '40px' }}>
                    {rightSections.length > 0 ? (
                        rightSections.map((section) => renderSection(section))
                    ) : (
                        <div className="text-center text-gray-400 text-xs py-8">
                            <p>Main content area</p>
                            <p>Drop sections here</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Live Preview</h3>
                <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        Live
                    </span>
                    <span className="text-xs text-gray-500">
                        {layoutMode === 'single' ? '1 Column' : '2 Columns'}
                    </span>
                </div>
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                <div className="aspect-[8.5/11] overflow-auto" style={{ maxHeight: '600px' }}>
                    {layoutMode === 'single' ? renderSingleColumn() : renderTwoColumn()}
                </div>
            </div>

            <div className="mt-3 text-xs text-gray-500 text-center">
                {sections.length} section{sections.length !== 1 ? 's' : ''} • Sample data shown
            </div>
        </div>
    );
}
