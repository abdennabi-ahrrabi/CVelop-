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

// Modern Template Preview
function ModernPreview({ resume, customization }) {
    const c = customization;
    const showPhoto = c.show_photo ?? true;
    const showContact = c.show_contact ?? true;
    const showSummary = c.show_summary ?? true;
    const showSkills = c.show_skills ?? true;
    const showExperience = c.show_experience ?? true;
    const showEducation = c.show_education ?? true;

    return (
        <div style={{ padding: 0 }}>
            {/* Modern Header with Solid Background */}
            <div style={{
                backgroundColor: c.primary_color || '#4F46E5',
                padding: `${c.page_padding || 25}px ${(c.page_padding || 25) + 10}px`,
                borderBottom: `${c.border_width || 5}px solid ${c.secondary_color || '#7C3AED'}`,
                display: 'table',
                width: '100%'
            }}>
                {showPhoto && resume.personal_info?.photo && (
                    <div style={{ display: 'table-cell', width: '90px', verticalAlign: 'middle', paddingRight: '20px' }}>
                        <img
                            src={resume.personal_info.photo}
                            alt="Profile"
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                border: `${c.border_width || 3}px solid white`,
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                )}
                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                    <div style={{ fontSize: '26pt', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '-0.5px', color: 'white' }}>
                        {resume.personal_info?.full_name || 'Your Name'}
                    </div>
                    {showContact && (
                        <div style={{ fontSize: '9pt', fontWeight: '300', color: 'white' }}>
                            {resume.personal_info?.email && (
                                <span style={{ display: 'inline-block', marginRight: '18px', color: 'white' }}>
                                    {resume.personal_info.email}
                                </span>
                            )}
                            {resume.personal_info?.phone && (
                                <span style={{ display: 'inline-block', marginRight: '18px', color: 'white' }}>
                                    • {resume.personal_info.phone}
                                </span>
                            )}
                            {resume.personal_info?.address && (
                                <span style={{ display: 'inline-block', color: 'white' }}>
                                    • {resume.personal_info.address}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div style={{ padding: `${c.page_padding || 30}px ${(c.page_padding || 30) + 5}px` }}>
                {/* Professional Summary */}
                {showSummary && resume.personal_info?.summary && (
                    <div style={{ marginBottom: `${c.section_spacing || 22}px` }}>
                        <div style={{
                            fontSize: '14pt',
                            fontWeight: '700',
                            color: c.primary_color || '#4F46E5',
                            borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#4F46E5'}20`,
                            paddingBottom: '6px',
                            marginBottom: `${c.item_spacing || 12}px`,
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Professional Summary
                        </div>
                        <div style={{
                            fontSize: '10pt',
                            lineHeight: '1.7',
                            textAlign: 'justify',
                            color: c.text_color || '#4B5563',
                            backgroundColor: `${c.primary_color || '#4F46E5'}08`,
                            padding: `${c.item_spacing || 14}px`,
                            borderLeft: `${c.border_width || 4}px solid ${c.primary_color || '#4F46E5'}`,
                            borderRadius: `0 ${c.border_radius || 4}px ${c.border_radius || 4}px 0`
                        }}>
                            {resume.personal_info.summary}
                        </div>
                    </div>
                )}

                {/* Work Experience */}
                {showExperience && resume.work_experiences && resume.work_experiences.length > 0 && (
                    <div style={{ marginBottom: `${c.section_spacing || 22}px` }}>
                        <div style={{
                            fontSize: '14pt',
                            fontWeight: '700',
                            color: c.primary_color || '#4F46E5',
                            borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#4F46E5'}20`,
                            paddingBottom: '6px',
                            marginBottom: `${c.item_spacing || 12}px`,
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Work Experience
                        </div>
                        {resume.work_experiences.map((exp, idx) => (
                            <div key={idx} style={{
                                marginBottom: `${c.item_spacing || 16}px`,
                                paddingLeft: '18px',
                                borderLeft: `${c.border_width || 2}px solid ${c.primary_color || '#4F46E5'}20`,
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    left: '-5px',
                                    top: '5px',
                                    width: '8px',
                                    height: '8px',
                                    background: c.primary_color || '#4F46E5',
                                    borderRadius: '50%',
                                    border: `${c.border_width || 2}px solid white`
                                }}></div>
                                <div style={{ fontSize: '12pt', fontWeight: '700', color: c.secondary_color || '#1F2937', marginBottom: '2px' }}>
                                    {exp.position}
                                </div>
                                <div style={{ fontSize: '10pt', color: c.primary_color || '#6B7280', fontWeight: '600', marginBottom: '3px' }}>
                                    {exp.company}
                                </div>
                                <div style={{
                                    fontSize: '8pt',
                                    color: '#9CA3AF',
                                    fontStyle: 'italic',
                                    marginBottom: '6px',
                                    backgroundColor: `${c.primary_color || '#4F46E5'}10`,
                                    display: 'inline-block',
                                    padding: '2px 8px',
                                    borderRadius: `${c.border_radius || 8}px`
                                }}>
                                    {exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}
                                </div>
                                {exp.description && (
                                    <div style={{ fontSize: '9pt', lineHeight: '1.6', color: '#4B5563', textAlign: 'justify' }}>
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {showEducation && resume.educations && resume.educations.length > 0 && (
                    <div style={{ marginBottom: `${c.section_spacing || 22}px` }}>
                        <div style={{
                            fontSize: '14pt',
                            fontWeight: '700',
                            color: c.primary_color || '#4F46E5',
                            borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#4F46E5'}20`,
                            paddingBottom: '6px',
                            marginBottom: `${c.item_spacing || 12}px`,
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Education
                        </div>
                        {resume.educations.map((edu, idx) => (
                            <div key={idx} style={{
                                marginBottom: `${c.item_spacing || 16}px`,
                                paddingLeft: '18px',
                                borderLeft: `${c.border_width || 2}px solid ${c.primary_color || '#4F46E5'}20`,
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    left: '-5px',
                                    top: '5px',
                                    width: '8px',
                                    height: '8px',
                                    background: c.primary_color || '#4F46E5',
                                    borderRadius: '50%',
                                    border: `${c.border_width || 2}px solid white`
                                }}></div>
                                <div style={{ fontSize: '12pt', fontWeight: '700', color: c.secondary_color || '#1F2937', marginBottom: '2px' }}>
                                    {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                                </div>
                                <div style={{ fontSize: '10pt', color: c.primary_color || '#6B7280', fontWeight: '600', marginBottom: '3px' }}>
                                    {edu.institution}
                                </div>
                                <div style={{
                                    fontSize: '8pt',
                                    color: '#9CA3AF',
                                    fontStyle: 'italic',
                                    marginBottom: '6px',
                                    backgroundColor: `${c.primary_color || '#4F46E5'}10`,
                                    display: 'inline-block',
                                    padding: '2px 8px',
                                    borderRadius: `${c.border_radius || 8}px`
                                }}>
                                    {edu.start_date} - {edu.is_current ? 'Present' : edu.end_date}
                                </div>
                                {edu.description && (
                                    <div style={{ fontSize: '9pt', lineHeight: '1.6', color: '#4B5563', textAlign: 'justify' }}>
                                        {edu.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills Grid with Progress Bars */}
                {showSkills && resume.skills && resume.skills.length > 0 && (
                    <div style={{ marginBottom: `${c.section_spacing || 22}px` }}>
                        <div style={{
                            fontSize: '14pt',
                            fontWeight: '700',
                            color: c.primary_color || '#4F46E5',
                            borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#4F46E5'}20`,
                            paddingBottom: '6px',
                            marginBottom: `${c.item_spacing || 12}px`,
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Skills & Expertise
                        </div>
                        <div style={{ display: 'table', width: '100%', borderSpacing: '0 4px' }}>
                            {resume.skills.map((skill, idx) => (
                                <div key={idx} style={{ display: 'table-row' }}>
                                    <div style={{
                                        display: 'table-cell',
                                        fontWeight: '600',
                                        color: '#374151',
                                        padding: '6px 15px 6px 0',
                                        width: '40%',
                                        fontSize: '9pt'
                                    }}>
                                        {skill.name}
                                    </div>
                                    <div style={{
                                        display: 'table-cell',
                                        padding: '6px 0',
                                        verticalAlign: 'middle'
                                    }}>
                                        <div style={{
                                            backgroundColor: `${c.primary_color || '#4F46E5'}15`,
                                            height: '8px',
                                            borderRadius: `${c.border_radius || 4}px`,
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                backgroundColor: c.primary_color || '#4F46E5',
                                                height: '100%',
                                                borderRadius: `${c.border_radius || 4}px`,
                                                width: skill.proficiency_level === 'beginner' ? '25%' :
                                                       skill.proficiency_level === 'intermediate' ? '50%' :
                                                       skill.proficiency_level === 'advanced' ? '75%' : '100%'
                                            }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

// Classic Template Preview
function ClassicPreview({ resume, customization }) {
    const c = customization;
    const showPhoto = c.show_photo ?? true;
    const showContact = c.show_contact ?? true;
    const showSummary = c.show_summary ?? true;
    const showSkills = c.show_skills ?? true;
    const showExperience = c.show_experience ?? true;
    const showEducation = c.show_education ?? true;

    return (
        <div style={{ padding: `${c.page_padding || 35}px`, border: `${c.border_width || 6}px solid ${c.primary_color || '#1F2937'}`, margin: '15px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', paddingBottom: '18px', marginBottom: `${c.section_spacing || 25}px`, borderBottom: `${c.border_width || 3}px double ${c.primary_color || '#1F2937'}` }}>
                {showPhoto && resume.personal_info?.photo && (
                    <img
                        src={resume.personal_info.photo}
                        alt="Profile"
                        style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            border: `${c.border_width || 3}px solid ${c.primary_color || '#1F2937'}`,
                            margin: '0 auto 15px',
                            objectFit: 'cover'
                        }}
                    />
                )}
                <div style={{ fontSize: '24pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: c.primary_color || '#1F2937' }}>
                    {resume.personal_info?.full_name || 'Your Name'}
                </div>
                {showContact && (
                    <div style={{ fontSize: '9pt', color: c.text_color || '#4B5563', marginTop: '10px' }}>
                        {resume.personal_info?.email} {resume.personal_info?.phone && `• ${resume.personal_info.phone}`} {resume.personal_info?.address && `• ${resume.personal_info.address}`}
                    </div>
                )}
            </div>

            {/* Summary */}
            {showSummary && resume.personal_info?.summary && (
                <div style={{ marginBottom: `${c.section_spacing || 25}px` }}>
                    <div style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', color: c.primary_color || '#1F2937', marginBottom: `${c.item_spacing || 12}px`, letterSpacing: '2px', borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#1F2937'}`, paddingBottom: '8px' }}>
                        Professional Summary
                    </div>
                    <div style={{ fontSize: '10pt', lineHeight: '1.7', color: c.text_color || '#374151', textAlign: 'justify', fontStyle: 'italic' }}>
                        {resume.personal_info.summary}
                    </div>
                </div>
            )}

            {/* Experience */}
            {showExperience && resume.work_experiences && resume.work_experiences.length > 0 && (
                <div style={{ marginBottom: `${c.section_spacing || 25}px` }}>
                    <div style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', color: c.primary_color || '#1F2937', marginBottom: `${c.item_spacing || 15}px`, letterSpacing: '2px', borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#1F2937'}`, paddingBottom: '8px' }}>
                        Professional Experience
                    </div>
                    {resume.work_experiences.map((exp, idx) => (
                        <div key={idx} style={{ marginBottom: `${c.item_spacing || 18}px` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                                <div style={{ fontSize: '11pt', fontWeight: 'bold', color: c.secondary_color || '#374151' }}>{exp.position}</div>
                                <div style={{ fontSize: '9pt', color: '#6B7280', fontStyle: 'italic' }}>
                                    {exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}
                                </div>
                            </div>
                            <div style={{ fontSize: '10pt', color: c.primary_color || '#1F2937', fontWeight: '600', marginBottom: '6px' }}>
                                {exp.company}
                            </div>
                            {exp.description && (
                                <div style={{ fontSize: '9pt', lineHeight: '1.6', color: c.text_color || '#4B5563', textAlign: 'justify', paddingLeft: '15px' }}>
                                    {exp.description}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {showEducation && resume.educations && resume.educations.length > 0 && (
                <div style={{ marginBottom: `${c.section_spacing || 25}px` }}>
                    <div style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', color: c.primary_color || '#1F2937', marginBottom: `${c.item_spacing || 15}px`, letterSpacing: '2px', borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#1F2937'}`, paddingBottom: '8px' }}>
                        Education
                    </div>
                    {resume.educations.map((edu, idx) => (
                        <div key={idx} style={{ marginBottom: `${c.item_spacing || 15}px` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                                <div style={{ fontSize: '11pt', fontWeight: 'bold', color: c.secondary_color || '#374151' }}>
                                    {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                                </div>
                                <div style={{ fontSize: '9pt', color: '#6B7280', fontStyle: 'italic' }}>
                                    {edu.start_date} - {edu.is_current ? 'Present' : edu.end_date}
                                </div>
                            </div>
                            <div style={{ fontSize: '10pt', color: c.primary_color || '#1F2937', fontWeight: '600', marginBottom: '6px' }}>
                                {edu.institution}
                            </div>
                            {edu.description && (
                                <div style={{ fontSize: '9pt', lineHeight: '1.6', color: c.text_color || '#4B5563', paddingLeft: '15px' }}>
                                    {edu.description}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Skills */}
            {showSkills && resume.skills && resume.skills.length > 0 && (
                <div>
                    <div style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', color: c.primary_color || '#1F2937', marginBottom: `${c.item_spacing || 15}px`, letterSpacing: '2px', borderBottom: `${c.border_width || 2}px solid ${c.primary_color || '#1F2937'}`, paddingBottom: '8px' }}>
                        Skills & Competencies
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                        {resume.skills.map((skill, idx) => (
                            <div key={idx} style={{ fontSize: '9pt', color: c.text_color || '#374151', padding: '6px', borderBottom: `1px solid ${c.primary_color || '#1F2937'}30` }}>
                                • {skill.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Creative Template Preview
function CreativePreview({ resume, customization }) {
    const c = customization;
    const showPhoto = c.show_photo ?? true;
    const showContact = c.show_contact ?? true;
    const showSummary = c.show_summary ?? true;
    const showSkills = c.show_skills ?? true;
    const showExperience = c.show_experience ?? true;
    const showEducation = c.show_education ?? true;

    return (
        <div style={{ padding: 0 }}>
            {/* Creative Header with Solid Background */}
            <div style={{
                backgroundColor: c.primary_color || '#FF1B6B',
                color: 'white',
                padding: `${c.page_padding || 25}px ${(c.page_padding || 25) + 10}px`,
                borderBottom: `${c.border_width || 5}px solid ${c.secondary_color || '#FF6B1B'}`,
                display: 'table',
                width: '100%'
            }}>
                {showPhoto && resume.personal_info?.photo && (
                    <div style={{ display: 'table-cell', width: '90px', verticalAlign: 'middle', paddingRight: '20px' }}>
                        <img
                            src={resume.personal_info.photo}
                            alt="Profile"
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: `${c.border_radius || 50}%`,
                                border: `${c.border_width || 3}px solid white`,
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                )}
                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                    <div style={{ fontSize: '24pt', fontWeight: 'bold', marginBottom: '5px', letterSpacing: '0.5px', color: 'white' }}>
                        {resume.personal_info?.full_name || 'Your Name'}
                    </div>
                    <div style={{ fontSize: '10pt', marginBottom: '10px', fontWeight: '300', color: 'white' }}>
                        Creative Professional
                    </div>
                    {showContact && (
                        <div style={{ fontSize: '9pt', color: 'white' }}>
                            {resume.personal_info?.email && (
                                <span style={{ display: 'inline-block', marginRight: '12px', backgroundColor: 'rgba(255,255,255,0.25)', padding: '3px 10px', borderRadius: `${c.border_radius || 12}px` }}>
                                    {resume.personal_info.email}
                                </span>
                            )}
                            {resume.personal_info?.phone && (
                                <span style={{ display: 'inline-block', marginRight: '12px', backgroundColor: 'rgba(255,255,255,0.25)', padding: '3px 10px', borderRadius: `${c.border_radius || 12}px` }}>
                                    {resume.personal_info.phone}
                                </span>
                            )}
                            {resume.personal_info?.address && (
                                <span style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.25)', padding: '3px 10px', borderRadius: `${c.border_radius || 12}px` }}>
                                    {resume.personal_info.address}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Content with Creative Accents */}
            <div style={{ padding: `${c.section_spacing || 28}px ${(c.page_padding || 25) + 10}px`, backgroundColor: c.background_color || '#FFFFFF' }}>
                {/* Summary */}
                {showSummary && resume.personal_info?.summary && (
                    <div style={{ marginBottom: `${c.section_spacing || 20}px` }}>
                        <div style={{
                            fontSize: '14pt',
                            fontWeight: '700',
                            color: c.primary_color || '#FF1B6B',
                            marginBottom: `${c.item_spacing || 12}px`,
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            paddingBottom: '6px',
                            borderBottom: `${c.border_width || 3}px solid ${c.secondary_color || '#FF6B1B'}`
                        }}>
                            About Me
                        </div>
                        <div style={{
                            fontSize: '10pt',
                            lineHeight: '1.6',
                            textAlign: 'justify',
                            color: c.text_color || '#4A5568',
                            backgroundColor: `${c.accent_color || '#FFF9E6'}20`,
                            padding: `${c.item_spacing || 12}px`,
                            borderRadius: `${c.border_radius || 8}px`,
                            borderLeft: `${c.border_width || 4}px solid ${c.secondary_color || '#FF6B1B'}`
                        }}>
                            {resume.personal_info.summary}
                        </div>
                    </div>
                )}

                {/* Work Experience */}
                {showExperience && resume.work_experiences && resume.work_experiences.length > 0 && (
                    <div style={{ marginBottom: `${c.section_spacing || 20}px` }}>
                        <div style={{
                            fontSize: '14pt',
                            fontWeight: '700',
                            color: c.primary_color || '#FF1B6B',
                            marginBottom: `${c.item_spacing || 12}px`,
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            paddingBottom: '6px',
                            borderBottom: `${c.border_width || 3}px solid ${c.secondary_color || '#FF6B1B'}`
                        }}>
                            Work Experience
                        </div>
                        {resume.work_experiences.map((exp, idx) => (
                            <div key={idx} style={{
                                marginBottom: `${c.item_spacing || 16}px`,
                                padding: `${c.item_spacing || 12}px`,
                                backgroundColor: `${c.primary_color || '#FF1B6B'}08`,
                                borderRadius: `${c.border_radius || 8}px`,
                                borderLeft: `${c.border_width || 4}px solid ${c.primary_color || '#FF1B6B'}`
                            }}>
                                <div style={{ fontSize: '11pt', fontWeight: '700', color: c.text_color || '#1A202C', marginBottom: '3px' }}>
                                    {exp.position}
                                </div>
                                <div style={{ fontSize: '10pt', color: c.secondary_color || '#FF6B1B', fontWeight: '600', marginBottom: '4px' }}>
                                    {exp.company}
                                </div>
                                <div style={{
                                    fontSize: '8pt',
                                    color: c.text_color || '#718096',
                                    backgroundColor: `${c.accent_color || '#FFF4E5'}40`,
                                    padding: '2px 10px',
                                    borderRadius: `${c.border_radius || 10}px`,
                                    display: 'inline-block',
                                    marginBottom: '6px',
                                    fontWeight: '600'
                                }}>
                                    {exp.start_date} → {exp.is_current ? 'Present' : exp.end_date}
                                </div>
                                {exp.description && (
                                    <div style={{ fontSize: '9pt', lineHeight: '1.5', color: c.text_color || '#4A5568', marginTop: '6px' }}>
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {showEducation && resume.educations && resume.educations.length > 0 && (
                    <div style={{ marginBottom: `${c.section_spacing || 20}px` }}>
                        <div style={{
                            fontSize: '14pt',
                            fontWeight: '700',
                            color: c.primary_color || '#FF1B6B',
                            marginBottom: `${c.item_spacing || 12}px`,
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            paddingBottom: '6px',
                            borderBottom: `${c.border_width || 3}px solid ${c.secondary_color || '#FF6B1B'}`
                        }}>
                            Education
                        </div>
                        {resume.educations.map((edu, idx) => (
                            <div key={idx} style={{
                                marginBottom: `${c.item_spacing || 16}px`,
                                padding: `${c.item_spacing || 12}px`,
                                backgroundColor: `${c.primary_color || '#FF1B6B'}08`,
                                borderRadius: `${c.border_radius || 8}px`,
                                borderLeft: `${c.border_width || 4}px solid ${c.secondary_color || '#FFAF1B'}`
                            }}>
                                <div style={{ fontSize: '11pt', fontWeight: '700', color: c.text_color || '#1A202C', marginBottom: '3px' }}>
                                    {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                                </div>
                                <div style={{ fontSize: '10pt', color: c.secondary_color || '#FF6B1B', fontWeight: '600', marginBottom: '4px' }}>
                                    {edu.institution}
                                </div>
                                <div style={{
                                    fontSize: '8pt',
                                    color: c.text_color || '#718096',
                                    backgroundColor: `${c.accent_color || '#FFF4E5'}40`,
                                    padding: '2px 10px',
                                    borderRadius: `${c.border_radius || 10}px`,
                                    display: 'inline-block',
                                    marginBottom: '6px',
                                    fontWeight: '600'
                                }}>
                                    {edu.start_date} → {edu.is_current ? 'Present' : edu.end_date}
                                </div>
                                {edu.description && (
                                    <div style={{ fontSize: '9pt', lineHeight: '1.5', color: c.text_color || '#4A5568', marginTop: '6px' }}>
                                        {edu.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills */}
                {showSkills && resume.skills && resume.skills.length > 0 && (
                    <div style={{ marginBottom: `${c.section_spacing || 20}px` }}>
                        <div style={{
                            fontSize: '14pt',
                            fontWeight: '700',
                            color: c.primary_color || '#FF1B6B',
                            marginBottom: `${c.item_spacing || 12}px`,
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            paddingBottom: '6px',
                            borderBottom: `${c.border_width || 3}px solid ${c.secondary_color || '#FF6B1B'}`
                        }}>
                            Skills & Talents
                        </div>
                        <div style={{ display: 'block' }}>
                            {resume.skills.map((skill, idx) => (
                                <div key={idx} style={{
                                    display: 'inline-block',
                                    backgroundColor: c.primary_color || '#FF1B6B',
                                    color: 'white',
                                    padding: '6px 14px',
                                    margin: '4px 6px 4px 0',
                                    borderRadius: `${c.border_radius || 15}px`,
                                    fontSize: '9pt',
                                    fontWeight: '600'
                                }}>
                                    {skill.name}
                                    <span style={{
                                        backgroundColor: 'rgba(255,255,255,0.35)',
                                        padding: '2px 6px',
                                        borderRadius: `${c.border_radius || 8}px`,
                                        marginLeft: '5px',
                                        fontSize: '7pt',
                                        fontWeight: '700',
                                        textTransform: 'uppercase'
                                    }}>
                                        {skill.proficiency_level}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div style={{
                    marginTop: `${c.section_spacing || 25}px`,
                    padding: `12px ${(c.page_padding || 25) + 10}px`,
                    backgroundColor: `${c.accent_color || '#FFF9E6'}30`,
                    textAlign: 'center',
                    fontSize: '8pt',
                    color: c.text_color || '#A0AEC0',
                    fontWeight: '600',
                    letterSpacing: '1px'
                }}>
                    Created with Creativity & Passion
                </div>
            </div>
        </div>
    );
}

// Minimal Template Preview
function MinimalPreview({ resume, customization }) {
    const c = customization;
    const showPhoto = c.show_photo ?? true;
    const showContact = c.show_contact ?? true;
    const showSummary = c.show_summary ?? true;
    const showSkills = c.show_skills ?? true;
    const showExperience = c.show_experience ?? true;
    const showEducation = c.show_education ?? true;

    return (
        <div style={{ padding: `${c.page_padding || 40}px`, maxWidth: '800px', backgroundColor: c.background_color || '#FFFFFF' }}>
            {/* Header - Ultra Minimal */}
            <div style={{ marginBottom: '35px', display: 'table', width: '100%' }}>
                {showPhoto && resume.personal_info?.photo && (
                    <div style={{ display: 'table-cell', width: '70px', verticalAlign: 'top', paddingRight: '20px' }}>
                        <img
                            src={resume.personal_info.photo}
                            alt="Profile"
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                border: '1px solid #ccc',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                )}
                <div style={{ display: 'table-cell', verticalAlign: 'top' }}>
                    <div style={{ fontSize: '26pt', fontWeight: '300', letterSpacing: '-0.5px', color: '#000', marginBottom: '6px' }}>
                        {resume.personal_info?.full_name || 'Your Name'}
                    </div>
                    {showContact && (
                        <div style={{ fontSize: '9pt', color: '#666', fontWeight: '300' }}>
                            {resume.personal_info?.email && (
                                <span style={{ display: 'inline-block', marginRight: '14px' }}>
                                    {resume.personal_info.email}
                                </span>
                            )}
                            {resume.personal_info?.phone && (
                                <span style={{ display: 'inline-block', marginRight: '14px' }}>
                                    {resume.personal_info.phone}
                                </span>
                            )}
                            {resume.personal_info?.address && (
                                <span style={{ display: 'inline-block' }}>
                                    {resume.personal_info.address}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Professional Summary */}
            {showSummary && resume.personal_info?.summary && (
                <div style={{ marginBottom: '28px' }}>
                    <div style={{ fontSize: '10pt', fontWeight: '600', color: '#000', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '14px' }}>
                        About
                    </div>
                    <div style={{ fontSize: '10pt', lineHeight: '1.6', color: '#333', fontWeight: '300' }}>
                        {resume.personal_info.summary}
                    </div>
                </div>
            )}

            {/* Work Experience */}
            {showExperience && resume.work_experiences && resume.work_experiences.length > 0 && (
                <div style={{ marginBottom: '28px' }}>
                    <div style={{ fontSize: '10pt', fontWeight: '600', color: '#000', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '14px' }}>
                        Experience
                    </div>
                    {resume.work_experiences.map((exp, idx) => (
                        <div key={idx} style={{ marginBottom: '20px' }}>
                            <div style={{ fontSize: '11pt', fontWeight: '600', color: '#000', marginBottom: '2px' }}>
                                {exp.position}
                            </div>
                            <div style={{ fontSize: '10pt', color: '#666', fontWeight: '400', marginBottom: '2px' }}>
                                {exp.company}
                            </div>
                            <div style={{ fontSize: '9pt', color: '#999', fontWeight: '300', marginBottom: '6px' }}>
                                {exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}
                            </div>
                            {exp.description && (
                                <div style={{ fontSize: '9pt', lineHeight: '1.6', color: '#444', fontWeight: '300' }}>
                                    {exp.description}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {showEducation && resume.educations && resume.educations.length > 0 && (
                <div style={{ marginBottom: '28px' }}>
                    <div style={{ fontSize: '10pt', fontWeight: '600', color: '#000', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '14px' }}>
                        Education
                    </div>
                    {resume.educations.map((edu, idx) => (
                        <div key={idx} style={{ marginBottom: '20px' }}>
                            <div style={{ fontSize: '11pt', fontWeight: '600', color: '#000', marginBottom: '2px' }}>
                                {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                            </div>
                            <div style={{ fontSize: '10pt', color: '#666', fontWeight: '400', marginBottom: '2px' }}>
                                {edu.institution}
                            </div>
                            <div style={{ fontSize: '9pt', color: '#999', fontWeight: '300', marginBottom: '6px' }}>
                                {edu.start_date} — {edu.is_current ? 'Present' : edu.end_date}
                            </div>
                            {edu.description && (
                                <div style={{ fontSize: '9pt', lineHeight: '1.6', color: '#444', fontWeight: '300' }}>
                                    {edu.description}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Skills - Simple Table Layout */}
            {showSkills && resume.skills && resume.skills.length > 0 && (
                <div style={{ marginBottom: '28px' }}>
                    <div style={{ fontSize: '10pt', fontWeight: '600', color: '#000', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '14px' }}>
                        Skills
                    </div>
                    <div style={{ display: 'table', width: '100%' }}>
                        {resume.skills.map((skill, idx) => (
                            <div key={idx} style={{ display: 'table-row' }}>
                                <div style={{ display: 'table-cell', fontSize: '10pt', color: '#333', fontWeight: '400', padding: '5px 20px 5px 0', width: '50%' }}>
                                    {skill.name}
                                </div>
                                <div style={{ display: 'table-cell', fontSize: '9pt', color: '#999', fontWeight: '300', padding: '5px 0' }}>
                                    {skill.proficiency_level.charAt(0).toUpperCase() + skill.proficiency_level.slice(1)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer */}
            <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '8pt', color: '#ccc', fontWeight: '300' }}>
                —
            </div>
        </div>
    );
}
