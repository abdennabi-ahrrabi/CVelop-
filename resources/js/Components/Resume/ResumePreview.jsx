import { useState, useEffect, useRef } from 'react';

export default function ResumePreview({ resume, customization, templateSlug = 'executive', zoom = 100 }) {
    const previewRef = useRef(null);

    console.log('ResumePreview - Template:', templateSlug, 'Resume:', resume);

    if (!resume || !customization) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-900">
                <p className="text-gray-500">Loading preview...</p>
            </div>
        );
    }

    const styles = {
        fontFamily: customization.font_family || 'DejaVu Serif',
        fontSize: `${customization.font_size || 10}pt`,
        color: customization.text_color || '#2C3E50',
        lineHeight: customization.line_height || 1.5,
    };

    // Render template based on slug
    const renderTemplate = () => {
        console.log('Rendering template:', templateSlug);

        switch (templateSlug) {
            case 'executive':
                return <ExecutivePreview resume={resume} customization={customization} />;
            case 'modern':
                return <ModernPreview resume={resume} customization={customization} />;
            case 'classic':
                return <ClassicPreview resume={resume} customization={customization} />;
            case 'creative':
                return <CreativePreview resume={resume} customization={customization} />;
            case 'minimal':
                return <MinimalPreview resume={resume} customization={customization} />;
            default:
                console.warn('Unknown template:', templateSlug, '- Using Executive as fallback');
                return <ExecutivePreview resume={resume} customization={customization} />;
        }
    };

    return (
        <div
            ref={previewRef}
            className="bg-white shadow-2xl mx-auto overflow-auto"
            style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
                width: '210mm',
                minHeight: '297mm',
                maxWidth: '100%',
                transition: 'transform 0.2s ease',
                ...styles
            }}
        >
            {renderTemplate()}
        </div>
    );
}

// Executive Template Preview
function ExecutivePreview({ resume, customization }) {
    const c = customization;
    const showPhoto = c.show_photo ?? true;
    const showContact = c.show_contact ?? true;
    const showSummary = c.show_summary ?? true;
    const showSkills = c.show_skills ?? true;
    const showExperience = c.show_experience ?? true;
    const showEducation = c.show_education ?? true;

    return (
        <div style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
            {/* Sidebar */}
            <div style={{
                width: `${c.sidebar_width || 35}%`,
                display: 'table-cell',
                verticalAlign: 'top',
                backgroundColor: c.sidebar_bg_color || c.accent_color || '#1A2332',
                color: 'white',
                padding: `${c.page_padding || 30}px ${(c.page_padding || 30) - 5}px`,
                borderRight: `${c.border_width || 4}px solid ${c.primary_color || '#3498DB'}`,
            }}>
                {/* Header */}
                <div style={{ marginBottom: `${c.section_spacing || 25}px`, paddingBottom: `${c.item_spacing || 20}px`, borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#3498DB'}80`, textAlign: 'center' }}>
                    {showPhoto && resume.personal_info?.photo && (
                        <img
                            src={resume.personal_info.photo}
                            alt="Profile"
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                border: `${c.border_width || 4}px solid ${c.primary_color || '#3498DB'}`,
                                margin: `0 auto ${c.item_spacing || 15}px`,
                                objectFit: 'cover'
                            }}
                        />
                    )}
                    <div style={{ fontSize: '18pt', fontWeight: 'bold', marginBottom: '8px', color: '#FFFFFF', letterSpacing: '0.5px' }}>
                        {resume.personal_info?.full_name || 'Your Name'}
                    </div>
                    <div style={{ fontSize: '9pt', color: c.primary_color || '#3498DB', fontStyle: 'italic', fontWeight: '600' }}>
                        Executive Professional
                    </div>
                </div>

                {/* Contact */}
                {showContact && (
                    <div style={{ marginBottom: `${c.section_spacing || 25}px`, backgroundColor: 'rgba(255,255,255,0.03)', padding: `${c.item_spacing || 15}px`, borderRadius: `${c.border_radius || 4}px` }}>
                        <div style={{ fontSize: '10pt', fontWeight: 'bold', color: c.primary_color || '#3498DB', textTransform: 'uppercase', letterSpacing: '1.8px', marginBottom: `${c.item_spacing || 12}px`, paddingBottom: '8px', borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#3498DB'}50` }}>
                            Contact
                        </div>
                        {resume.personal_info?.email && (
                            <div style={{ fontSize: '9pt', marginBottom: '8px', color: '#ECF0F1' }}>{resume.personal_info.email}</div>
                        )}
                        {resume.personal_info?.phone && (
                            <div style={{ fontSize: '9pt', marginBottom: '8px', color: '#ECF0F1' }}>{resume.personal_info.phone}</div>
                        )}
                        {resume.personal_info?.address && (
                            <div style={{ fontSize: '9pt', marginBottom: '8px', color: '#ECF0F1' }}>{resume.personal_info.address}</div>
                        )}
                    </div>
                )}

                {/* Skills */}
                {showSkills && resume.skills && resume.skills.length > 0 && (
                    <div style={{ marginBottom: `${c.section_spacing || 25}px`, backgroundColor: 'rgba(255,255,255,0.03)', padding: `${c.item_spacing || 15}px`, borderRadius: `${c.border_radius || 4}px` }}>
                        <div style={{ fontSize: '10pt', fontWeight: 'bold', color: c.primary_color || '#3498DB', textTransform: 'uppercase', letterSpacing: '1.8px', marginBottom: `${c.item_spacing || 12}px`, paddingBottom: '8px', borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#3498DB'}50` }}>
                            Expertise
                        </div>
                        {resume.skills.map((skill, idx) => (
                            <div key={idx} style={{ marginBottom: '12px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '3px' }}>
                                <div style={{ fontSize: '9pt', color: '#FFFFFF', fontWeight: '600', marginBottom: '5px' }}>{skill.name}</div>
                                <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', height: '6px', borderRadius: `${c.border_radius || 3}px`, overflow: 'hidden' }}>
                                    <div style={{
                                        backgroundColor: c.primary_color || '#3498DB',
                                        height: '100%',
                                        borderRadius: `${c.border_radius || 3}px`,
                                        width: skill.proficiency_level === 'expert' ? '100%' : skill.proficiency_level === 'advanced' ? '75%' : skill.proficiency_level === 'intermediate' ? '50%' : '25%'
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div style={{
                width: `${100 - (c.sidebar_width || 35)}%`,
                display: 'table-cell',
                verticalAlign: 'top',
                padding: `${c.page_padding || 30}px ${(c.page_padding || 30) + 5}px`,
                backgroundColor: c.background_color || '#FFFFFF',
            }}>
                {/* Summary */}
                {showSummary && resume.personal_info?.summary && (
                    <div style={{ marginBottom: `${c.section_spacing || 25}px` }}>
                        <div style={{ fontSize: '14pt', fontWeight: 'bold', color: c.secondary_color || '#1A2332', marginBottom: `${c.item_spacing || 15}px`, paddingBottom: '8px', paddingLeft: '12px', borderLeft: `5px solid ${c.primary_color || '#3498DB'}`, borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#3498DB'}20`, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Executive Summary
                        </div>
                        <div style={{ fontSize: '10pt', lineHeight: '1.7', textAlign: 'justify', color: c.text_color || '#2C3E50', fontStyle: 'italic', backgroundColor: `${c.primary_color || '#3498DB'}08`, padding: `${c.item_spacing || 15}px`, borderLeft: `${c.border_width || 4}px solid ${c.primary_color || '#3498DB'}`, borderRadius: `0 ${c.border_radius || 4}px ${c.border_radius || 4}px 0` }}>
                            {resume.personal_info.summary}
                        </div>
                    </div>
                )}

                {/* Experience */}
                {showExperience && resume.work_experiences && resume.work_experiences.length > 0 && (
                    <div style={{ marginBottom: `${c.section_spacing || 25}px` }}>
                        <div style={{ fontSize: '14pt', fontWeight: 'bold', color: c.secondary_color || '#1A2332', marginBottom: `${c.item_spacing || 15}px`, paddingBottom: '8px', paddingLeft: '12px', borderLeft: `5px solid ${c.primary_color || '#3498DB'}`, borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#3498DB'}20`, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Professional Experience
                        </div>
                        {resume.work_experiences.map((exp, idx) => (
                            <div key={idx} style={{ marginBottom: `${c.item_spacing || 18}px`, padding: `${c.item_spacing || 12}px`, backgroundColor: `${c.primary_color || '#3498DB'}05`, borderLeft: `${c.border_width || 3}px solid ${c.primary_color || '#3498DB'}`, borderRadius: `0 ${c.border_radius || 4}px ${c.border_radius || 4}px 0` }}>
                                <div style={{ fontSize: '12pt', fontWeight: 'bold', color: c.secondary_color || '#1A2332', marginBottom: '3px' }}>{exp.position}</div>
                                <div style={{ fontSize: '10pt', color: c.primary_color || '#3498DB', fontWeight: '600', marginBottom: '4px' }}>{exp.company}</div>
                                <div style={{ fontSize: '9pt', color: '#7F8C8D', fontStyle: 'italic', marginBottom: '8px', backgroundColor: `${c.primary_color || '#3498DB'}15`, padding: '2px 8px', borderRadius: `${c.border_radius || 3}px`, display: 'inline-block' }}>
                                    {exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}
                                </div>
                                {exp.description && (
                                    <div style={{ fontSize: '9pt', lineHeight: '1.7', color: '#34495E', textAlign: 'justify' }}>{exp.description}</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {showEducation && resume.educations && resume.educations.length > 0 && (
                    <div style={{ marginBottom: `${c.section_spacing || 25}px` }}>
                        <div style={{ fontSize: '14pt', fontWeight: 'bold', color: c.secondary_color || '#1A2332', marginBottom: `${c.item_spacing || 15}px`, paddingBottom: '8px', paddingLeft: '12px', borderLeft: `5px solid ${c.primary_color || '#3498DB'}`, borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#3498DB'}20`, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Education & Qualifications
                        </div>
                        {resume.educations.map((edu, idx) => (
                            <div key={idx} style={{ marginBottom: `${c.item_spacing || 18}px`, padding: `${c.item_spacing || 12}px`, backgroundColor: `${c.primary_color || '#3498DB'}05`, borderLeft: `${c.border_width || 3}px solid ${c.primary_color || '#3498DB'}`, borderRadius: `0 ${c.border_radius || 4}px ${c.border_radius || 4}px 0` }}>
                                <div style={{ fontSize: '12pt', fontWeight: 'bold', color: c.secondary_color || '#1A2332', marginBottom: '3px' }}>
                                    {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                                </div>
                                <div style={{ fontSize: '10pt', color: c.primary_color || '#3498DB', fontWeight: '600', marginBottom: '4px' }}>{edu.institution}</div>
                                <div style={{ fontSize: '9pt', color: '#7F8C8D', fontStyle: 'italic', marginBottom: '8px', backgroundColor: `${c.primary_color || '#3498DB'}15`, padding: '2px 8px', borderRadius: `${c.border_radius || 3}px`, display: 'inline-block' }}>
                                    {edu.start_date} - {edu.is_current ? 'Present' : edu.end_date}
                                </div>
                                {edu.description && (
                                    <div style={{ fontSize: '9pt', lineHeight: '1.7', color: '#34495E', textAlign: 'justify' }}>{edu.description}</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div style={{ marginTop: `${c.section_spacing || 30}px`, padding: '12px 20px', backgroundColor: `${c.primary_color || '#3498DB'}08`, borderTop: `${c.border_width || 3}px solid ${c.primary_color || '#3498DB'}`, textAlign: 'center', fontSize: '8pt', color: '#7F8C8D', fontWeight: '600', letterSpacing: '1px' }}>
                    Executive Curriculum Vitae
                </div>
            </div>
        </div>
    );
}

// Modern Template Preview (simplified version)
function ModernPreview({ resume, customization }) {
    const c = customization;
    return (
        <div style={{ padding: 0 }}>
            <div style={{ backgroundColor: c.primary_color || '#4F46E5', padding: `${c.page_padding || 25}px ${(c.page_padding || 25) + 10}px`, borderBottom: `${c.border_width || 5}px solid ${c.secondary_color || '#7C3AED'}` }}>
                <div style={{ color: 'white', fontSize: '26pt', fontWeight: 'bold' }}>{resume.personal_info?.full_name || 'Your Name'}</div>
                {c.show_contact && (
                    <div style={{ color: 'white', fontSize: '9pt', marginTop: '8px' }}>
                        {resume.personal_info?.email} • {resume.personal_info?.phone}
                    </div>
                )}
            </div>
            <div style={{ padding: `${c.page_padding || 30}px ${(c.page_padding || 30) + 5}px` }}>
                <div style={{ fontSize: '10pt', color: c.text_color }}>Modern template preview...</div>
            </div>
        </div>
    );
}

// Classic Template Preview (simplified version)
function ClassicPreview({ resume, customization }) {
    const c = customization;
    return (
        <div style={{ padding: `${c.page_padding || 35}px`, border: `${c.border_width || 6}px solid ${c.primary_color || '#1F2937'}`, margin: '15px' }}>
            <div style={{ textAlign: 'center', paddingBottom: '18px', marginBottom: `${c.section_spacing || 25}px`, borderBottom: `${c.border_width || 3}px double ${c.primary_color || '#1F2937'}` }}>
                <div style={{ fontSize: '24pt', fontWeight: 'bold', textTransform: 'uppercase' }}>{resume.personal_info?.full_name || 'Your Name'}</div>
                {c.show_contact && (
                    <div style={{ fontSize: '9pt', color: '#4B5563', marginTop: '10px' }}>
                        {resume.personal_info?.email} • {resume.personal_info?.phone}
                    </div>
                )}
            </div>
            <div style={{ fontSize: '10pt', color: c.text_color }}>Classic template preview...</div>
        </div>
    );
}

// Creative & Minimal (placeholder)
function CreativePreview({ resume, customization }) {
    return <div style={{ padding: '30px' }}>Creative template preview...</div>;
}

function MinimalPreview({ resume, customization }) {
    return <div style={{ padding: '30px' }}>Minimal template preview...</div>;
}
