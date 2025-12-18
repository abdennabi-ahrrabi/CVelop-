import React from 'react';

export default function RulersAndGuides({
    showRulers = true,
    showGrid = false,
    zoom = 100,
    alignmentGuides = [],
    containerWidth,
    containerHeight
}) {
    const rulerSize = 20;
    const gridSize = 20;

    const renderHorizontalRuler = () => {
        const marks = [];
        const width = containerWidth || 800;
        const step = 50;

        for (let i = 0; i <= width; i += step) {
            const isMajor = i % 100 === 0;
            marks.push(
                <div
                    key={`h-${i}`}
                    className="absolute"
                    style={{
                        left: `${i}px`,
                        top: 0,
                        height: isMajor ? '12px' : '6px',
                        width: '1px',
                        backgroundColor: '#94a3b8'
                    }}
                >
                    {isMajor && (
                        <span className="absolute top-0 left-1 text-xs text-gray-500" style={{ fontSize: '9px' }}>
                            {i}
                        </span>
                    )}
                </div>
            );
        }
        return marks;
    };

    const renderVerticalRuler = () => {
        const marks = [];
        const height = containerHeight || 1000;
        const step = 50;

        for (let i = 0; i <= height; i += step) {
            const isMajor = i % 100 === 0;
            marks.push(
                <div
                    key={`v-${i}`}
                    className="absolute"
                    style={{
                        top: `${i}px`,
                        left: 0,
                        width: isMajor ? '12px' : '6px',
                        height: '1px',
                        backgroundColor: '#94a3b8'
                    }}
                >
                    {isMajor && (
                        <span
                            className="absolute left-0 text-xs text-gray-500"
                            style={{
                                fontSize: '9px',
                                transform: 'rotate(-90deg)',
                                transformOrigin: 'left top',
                                whiteSpace: 'nowrap',
                                top: '12px'
                            }}
                        >
                            {i}
                        </span>
                    )}
                </div>
            );
        }
        return marks;
    };

    const renderGrid = () => {
        if (!showGrid) return null;

        return (
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
                    `,
                    backgroundSize: `${gridSize}px ${gridSize}px`,
                    opacity: 0.5
                }}
            />
        );
    };

    const renderAlignmentGuides = () => {
        return alignmentGuides.map((guide, index) => (
            <div
                key={`guide-${index}`}
                className="absolute pointer-events-none z-50"
                style={{
                    ...(guide.type === 'vertical' ? {
                        left: `${guide.position}px`,
                        top: 0,
                        bottom: 0,
                        width: '1px',
                    } : {
                        top: `${guide.position}px`,
                        left: 0,
                        right: 0,
                        height: '1px',
                    }),
                    backgroundColor: '#3b82f6',
                    boxShadow: '0 0 4px rgba(59, 130, 246, 0.5)'
                }}
            />
        ));
    };

    return (
        <>
            {/* Grid Overlay */}
            {renderGrid()}

            {/* Horizontal Ruler */}
            {showRulers && (
                <div
                    className="absolute top-0 left-0 right-0 bg-gray-100 border-b border-gray-300"
                    style={{
                        height: `${rulerSize}px`,
                        zIndex: 100
                    }}
                >
                    {renderHorizontalRuler()}
                </div>
            )}

            {/* Vertical Ruler */}
            {showRulers && (
                <div
                    className="absolute top-0 left-0 bottom-0 bg-gray-100 border-r border-gray-300"
                    style={{
                        width: `${rulerSize}px`,
                        zIndex: 100
                    }}
                >
                    {renderVerticalRuler()}
                </div>
            )}

            {/* Ruler Corner */}
            {showRulers && (
                <div
                    className="absolute top-0 left-0 bg-gray-200 border-r border-b border-gray-300 flex items-center justify-center"
                    style={{
                        width: `${rulerSize}px`,
                        height: `${rulerSize}px`,
                        zIndex: 101
                    }}
                >
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </div>
            )}

            {/* Alignment Guides */}
            {renderAlignmentGuides()}
        </>
    );
}
