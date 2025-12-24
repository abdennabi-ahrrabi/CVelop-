import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { resumeApi, templateApi } from '@/utils/api';
import ResumePreview from '@/Components/Resume/ResumePreview';

// Sample resume data for template preview
const sampleResumeData = {
    personal_info: {
        full_name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        address: 'San Francisco, CA',
        summary: 'Experienced software engineer with 8+ years of expertise in building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers. Proven track record of delivering high-impact projects on time.',
    },
    work_experiences: [
        {
            position: 'Senior Software Engineer',
            company: 'Tech Solutions Inc.',
            start_date: '2020',
            end_date: null,
            is_current: true,
            description: 'Lead development of microservices architecture serving 2M+ users. Mentored team of 5 junior developers and improved deployment frequency by 40%.',
        },
        {
            position: 'Software Engineer',
            company: 'Digital Innovations Co.',
            start_date: '2017',
            end_date: '2020',
            is_current: false,
            description: 'Built and maintained RESTful APIs and React-based frontends. Implemented CI/CD pipelines reducing release time by 60%.',
        },
    ],
    educations: [
        {
            degree: 'Master of Science',
            field: 'Computer Science',
            institution: 'Stanford University',
            start_date: '2015',
            end_date: '2017',
            is_current: false,
            description: 'Specialized in distributed systems and machine learning.',
        },
        {
            degree: 'Bachelor of Science',
            field: 'Computer Engineering',
            institution: 'UC Berkeley',
            start_date: '2011',
            end_date: '2015',
            is_current: false,
            description: '',
        },
    ],
    skills: [
        { name: 'JavaScript/TypeScript', proficiency_level: 'expert' },
        { name: 'React & Node.js', proficiency_level: 'expert' },
        { name: 'Python', proficiency_level: 'advanced' },
        { name: 'AWS & Cloud Services', proficiency_level: 'advanced' },
        { name: 'System Design', proficiency_level: 'advanced' },
        { name: 'Team Leadership', proficiency_level: 'intermediate' },
    ],
};

// Default customization for template preview
const defaultCustomization = {
    font_family: 'DejaVu Serif',
    font_size: 10,
    text_color: '#2C3E50',
    line_height: 1.5,
    page_padding: 30,
    section_spacing: 25,
    item_spacing: 15,
    border_width: 2,
    border_radius: 4,
    show_photo: false,
    show_contact: true,
    show_summary: true,
    show_skills: true,
    show_experience: true,
    show_education: true,
};

// Template preview component with visual styling
const TemplatePreview = ({ template }) => {
    const previewStyles = {
        modern: {
            headerBg: 'bg-gradient-to-r from-blue-600 to-blue-800',
            accent: 'bg-blue-500',
            layout: 'modern',
        },
        classic: {
            headerBg: 'bg-gradient-to-r from-gray-700 to-gray-900',
            accent: 'bg-amber-600',
            layout: 'classic',
        },
        creative: {
            headerBg: 'bg-gradient-to-r from-purple-600 to-pink-600',
            accent: 'bg-pink-500',
            layout: 'creative',
        },
        minimal: {
            headerBg: 'bg-white',
            accent: 'bg-gray-800',
            layout: 'minimal',
        },
        executive: {
            headerBg: 'bg-gradient-to-r from-slate-800 to-slate-900',
            accent: 'bg-amber-500',
            layout: 'executive',
        },
    };

    const style = previewStyles[template.slug] || previewStyles.modern;

    return (
        <div className="relative w-full aspect-[8.5/11] bg-white rounded-lg shadow-lg overflow-hidden transform scale-100 group-hover:scale-[1.02] transition-transform">
            {/* Header */}
            <div className={`${style.headerBg} h-1/4 p-3`}>
                <div className={`w-8 h-8 rounded-full ${style.layout === 'minimal' ? 'bg-gray-200' : 'bg-white/30'}`}></div>
                <div className={`mt-2 h-2 w-16 ${style.layout === 'minimal' ? 'bg-gray-300' : 'bg-white/40'} rounded`}></div>
                <div className={`mt-1 h-1.5 w-12 ${style.layout === 'minimal' ? 'bg-gray-200' : 'bg-white/30'} rounded`}></div>
            </div>

            {/* Content */}
            <div className="p-3 space-y-2">
                {/* Section 1 */}
                <div>
                    <div className={`h-1.5 w-10 ${style.accent} rounded mb-1.5`}></div>
                    <div className="space-y-1">
                        <div className="h-1 w-full bg-gray-200 rounded"></div>
                        <div className="h-1 w-4/5 bg-gray-200 rounded"></div>
                        <div className="h-1 w-3/4 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* Section 2 */}
                <div>
                    <div className={`h-1.5 w-8 ${style.accent} rounded mb-1.5`}></div>
                    <div className="space-y-1">
                        <div className="h-1 w-full bg-gray-200 rounded"></div>
                        <div className="h-1 w-5/6 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* Section 3 - Skills */}
                <div>
                    <div className={`h-1.5 w-6 ${style.accent} rounded mb-1.5`}></div>
                    <div className="flex flex-wrap gap-1">
                        <div className="h-2 w-6 bg-gray-100 rounded"></div>
                        <div className="h-2 w-8 bg-gray-100 rounded"></div>
                        <div className="h-2 w-5 bg-gray-100 rounded"></div>
                        <div className="h-2 w-7 bg-gray-100 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Dashboard() {
    const [resumes, setResumes] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('resumes');
    const [previewResume, setPreviewResume] = useState(null);
    const [previewTemplate, setPreviewTemplate] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    // Handle Escape key to close preview modals
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                if (previewResume) setPreviewResume(null);
                if (previewTemplate) setPreviewTemplate(null);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [previewResume, previewTemplate]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [resumesRes, templatesRes] = await Promise.all([
                resumeApi.getAll(),
                templateApi.getAll()
            ]);
            setResumes(resumesRes.data.data);
            setTemplates(templatesRes.data.data || []);
        } catch (err) {
            setError('Failed to load data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this resume?')) return;

        try {
            await resumeApi.delete(id);
            setResumes(resumes.filter(resume => resume.id !== id));
        } catch (err) {
            alert('Failed to delete resume');
            console.error(err);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Resumes" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Resumes</h1>
                            <p className="mt-1 text-gray-400">Create and manage your professional resumes</p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href={route('resumes.wizard')}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/25"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                AI Wizard
                            </Link>
                            <Link
                                href={route('resumes.create')}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create Manual
                            </Link>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-8 w-fit">
                        <button
                            onClick={() => setActiveTab('resumes')}
                            className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                                activeTab === 'resumes'
                                    ? 'bg-white/10 text-white shadow-sm'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            My Resumes
                            {resumes.length > 0 && (
                                <span className="ml-2 px-2 py-0.5 bg-violet-500/20 text-violet-400 text-xs rounded-full">
                                    {resumes.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('templates')}
                            className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                                activeTab === 'templates'
                                    ? 'bg-white/10 text-white shadow-sm'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            Templates
                            {templates.length > 0 && (
                                <span className="ml-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                                    {templates.length}
                                </span>
                            )}
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="text-center">
                                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-violet-500 border-r-transparent"></div>
                                <p className="mt-4 text-gray-400">Loading resumes...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <p className="text-red-400 font-medium">{error}</p>
                        </div>
                    ) : activeTab === 'templates' ? (
                        /* Templates Grid */
                        <div>
                            <div className="mb-6">
                                <p className="text-sm text-gray-400">
                                    Choose a template to start creating your resume. Each template is professionally designed and ATS-friendly.
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {templates.map((template) => (
                                    <div
                                        key={template.id}
                                        className="group relative"
                                    >
                                        <div className="rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-all p-4">
                                            {/* Preview Thumbnail */}
                                            <div className="mb-4 cursor-pointer" onClick={() => setPreviewTemplate(template)}>
                                                <TemplatePreview template={template} />
                                            </div>

                                            {/* Info */}
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors">
                                                        {template.name}
                                                    </h3>
                                                    {template.is_premium && (
                                                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">
                                                            Pro
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                                                    {template.description}
                                                </p>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setPreviewTemplate(template)}
                                                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg transition-all border border-white/10"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    Preview
                                                </button>
                                                <Link
                                                    href={`/resumes/create?template=${template.slug}`}
                                                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-lg transition-all"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    Use
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Create Custom Template Card */}
                                <Link
                                    href={route('templates.builder')}
                                    className="group flex flex-col items-center justify-center min-h-[400px] rounded-2xl border-2 border-dashed border-white/10 hover:border-violet-500/50 hover:bg-white/5 transition-all"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-violet-500/20 flex items-center justify-center mb-4 transition-all">
                                        <svg className="w-8 h-8 text-gray-500 group-hover:text-violet-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-500 group-hover:text-white font-medium transition-colors">Create Custom Template</span>
                                    <span className="text-xs text-gray-600 mt-1">Design your own layout</span>
                                </Link>
                            </div>
                        </div>
                    ) : resumes.length === 0 ? (
                        /* Empty State */
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/10 to-indigo-600/10 border border-violet-500/20 p-12 text-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 mb-6 shadow-lg shadow-violet-500/25">
                                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Create Your First Resume</h3>
                                <p className="text-gray-400 max-w-md mx-auto mb-8">
                                    Get started by creating a professional resume. Add your experience, education, and skills to stand out.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('resumes.wizard')}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Start with AI Wizard
                                    </Link>
                                    <Link
                                        href={route('resumes.create')}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl transition-all border border-white/10"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Create Manually
                                    </Link>
                                </div>
                                <p className="mt-6 text-sm text-gray-500">
                                    AI Wizard guides you step-by-step with smart suggestions
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Resume Count */}
                            <div className="mb-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-400">
                                    {resumes.length} {resumes.length === 1 ? 'resume' : 'resumes'} found
                                </p>
                                <p className="text-xs text-gray-500">Click on a resume to edit</p>
                            </div>

                            {/* Resume Grid */}
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {resumes.map((resume) => (
                                    <div
                                        key={resume.id}
                                        className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/50 transition-all duration-300"
                                    >
                                        {/* Gradient Top Bar */}
                                        <div className="h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500"></div>

                                        <div className="p-6">
                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-violet-300 transition-colors">
                                                {resume.title}
                                            </h3>

                                            {/* Stats */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <div className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 text-xs font-semibold text-blue-400">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    {resume.work_experiences_count || 0} Jobs
                                                </div>
                                                <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                    {resume.educations_count || 0} Edu
                                                </div>
                                                <div className="inline-flex items-center gap-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 text-xs font-semibold text-violet-400">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                    {resume.skills_count || 0} Skills
                                                </div>
                                            </div>

                                            {/* Last Updated */}
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-5">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Updated {new Date(resume.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>

                                            {/* Actions */}
                                            <div className="space-y-2">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={route('resumes.edit', resume.id)}
                                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-all"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => setPreviewResume(resume)}
                                                        className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-4 py-2.5 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/20 transition-all"
                                                        title="Preview Resume"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(resume.id)}
                                                        className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/20 transition-all"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <a
                                                    href={`/resumes/${resume.id}/pdf/download`}
                                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 px-4 py-2.5 text-sm font-semibold text-white transition-all"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    Download PDF
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Create New Card */}
                                <Link
                                    href={route('resumes.create')}
                                    className="group flex flex-col items-center justify-center min-h-[300px] rounded-2xl border-2 border-dashed border-white/10 hover:border-violet-500/50 hover:bg-white/5 transition-all"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-violet-500/20 flex items-center justify-center mb-4 transition-all">
                                        <svg className="w-8 h-8 text-gray-500 group-hover:text-violet-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-500 group-hover:text-white font-medium transition-colors">Create New Resume</span>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Preview Modal */}
            {previewResume && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && setPreviewResume(null)}
                >
                    <div className="relative w-full max-w-5xl h-[90vh] bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10">
                            <div>
                                <h3 className="text-lg font-bold text-white">{previewResume.title}</h3>
                                <p className="text-sm text-gray-400">Resume Preview</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <a
                                    href={`/resumes/${previewResume.id}/pdf/download`}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-sm font-semibold rounded-xl transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download
                                </a>
                                <Link
                                    href={route('resumes.edit', previewResume.id)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </Link>
                                <button
                                    onClick={() => setPreviewResume(null)}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* PDF Preview */}
                        <div className="flex-1 bg-gray-100">
                            <iframe
                                src={`/resumes/${previewResume.id}/pdf/preview`}
                                className="w-full h-full"
                                title={`Preview of ${previewResume.title}`}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Template Preview Modal */}
            {previewTemplate && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && setPreviewTemplate(null)}
                >
                    <div className="relative w-full max-w-6xl h-[90vh] bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10">
                            <div>
                                <h3 className="text-lg font-bold text-white">{previewTemplate.name} Template</h3>
                                <p className="text-sm text-gray-400">Preview with sample data</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/resumes/create?template=${previewTemplate.slug}`}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Use This Template
                                </Link>
                                <button
                                    onClick={() => setPreviewTemplate(null)}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Template Preview with Sample Data */}
                        <div className="flex-1 overflow-auto bg-gray-200 p-8">
                            <div className="max-w-4xl mx-auto">
                                <ResumePreview
                                    resume={sampleResumeData}
                                    customization={defaultCustomization}
                                    templateSlug={previewTemplate.slug}
                                    zoom={100}
                                />
                            </div>
                        </div>

                        {/* Footer Note */}
                        <div className="px-6 py-3 bg-white/5 border-t border-white/10 text-center">
                            <p className="text-xs text-gray-500">
                                This preview shows sample data. Your actual resume content will replace this when you create your resume.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
