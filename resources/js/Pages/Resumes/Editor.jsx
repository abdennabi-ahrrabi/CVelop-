import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { resumeApi, templateApi } from '@/utils/api';
import PersonalInfoForm from '@/Components/Resume/PersonalInfoForm';
import WorkExperienceForm from '@/Components/Resume/WorkExperienceForm';
import EducationForm from '@/Components/Resume/EducationForm';
import SkillsForm from '@/Components/Resume/SkillsForm';
import TemplateCustomizer from '@/Components/Resume/TemplateCustomizer';

export default function Editor({ resumeId = null }) {
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('personal');
    const [isNew, setIsNew] = useState(!resumeId);
    const [currentResumeId, setCurrentResumeId] = useState(resumeId);
    const [templates, setTemplates] = useState([]);
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [selectedTemplateSlug, setSelectedTemplateSlug] = useState(null);

    const { data, setData, errors, setError } = useForm({
        title: '',
    });

    // Get template slug from URL query parameter
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const templateSlug = urlParams.get('template');
        if (templateSlug) {
            setSelectedTemplateSlug(templateSlug);
        }
    }, []);

    useEffect(() => {
        if (currentResumeId) {
            fetchResume();
        } else {
            setLoading(false);
        }
        fetchTemplates();
    }, [currentResumeId]);

    const fetchTemplates = async () => {
        try {
            const response = await templateApi.getAll();
            setTemplates(response.data.data);
        } catch (err) {
            console.error('Error fetching templates:', err);
        }
    };

    const fetchResume = async () => {
        try {
            setLoading(true);
            const response = await resumeApi.get(currentResumeId);
            console.log('Editor fetchResume - Full response:', response.data.data);
            console.log('Editor fetchResume - Template:', response.data.data?.template);
            setResume(response.data.data);
            setData('title', response.data.data.title);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateResume = async (e) => {
        e.preventDefault();
        try {
            // Find template ID from slug if a template was selected
            let templateId = null;
            if (selectedTemplateSlug && templates.length > 0) {
                const selectedTemplate = templates.find(t => t.slug === selectedTemplateSlug);
                if (selectedTemplate) {
                    templateId = selectedTemplate.id;
                }
            }

            const createData = { title: data.title };
            if (templateId) {
                createData.template_id = templateId;
            }

            const response = await resumeApi.create(createData);
            setResume(response.data.data);
            setCurrentResumeId(response.data.data.id);
            setIsNew(false);
            window.history.pushState({}, '', `/resumes/${response.data.data.id}/edit`);

            // Fetch resume again to get the full template data
            if (templateId) {
                const fullResume = await resumeApi.get(response.data.data.id);
                setResume(fullResume.data.data);
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setError(error.response.data.errors);
            }
        }
    };

    const handleUpdateResume = async (updates) => {
        try {
            const response = await resumeApi.update(resume.id, updates);
            const updatedResume = response.data.data;
            console.log('Editor handleUpdateResume - Response template:', updatedResume?.template);

            // Preserve the existing template if the API response doesn't include it
            setResume(prev => ({
                ...updatedResume,
                template: updatedResume.template || prev?.template
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleTemplateSelect = async (templateId) => {
        try {
            await handleUpdateResume({ template_id: templateId });
            setShowTemplateSelector(false);
        } catch (error) {
            console.error('Error selecting template:', error);
        }
    };

    const tabs = [
        {
            id: 'personal',
            label: 'Personal Info',
            shortLabel: 'Details',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
        {
            id: 'experience',
            label: 'Experience',
            shortLabel: 'Work',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            id: 'education',
            label: 'Education',
            shortLabel: 'Education',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
        },
        {
            id: 'skills',
            label: 'Skills',
            shortLabel: 'Skills',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
        },
    ];

    const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);
    const isFirstTab = currentTabIndex === 0;
    const isLastTab = currentTabIndex === tabs.length - 1;

    const goToNextTab = () => {
        if (!isLastTab) {
            setActiveTab(tabs[currentTabIndex + 1].id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPreviousTab = () => {
        if (!isFirstTab) {
            setActiveTab(tabs[currentTabIndex - 1].id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const completionPercentage = Math.round(
        (resume?.personal_info ? 25 : 0) +
        ((resume?.work_experiences?.length || 0) > 0 ? 25 : 0) +
        ((resume?.educations?.length || 0) > 0 ? 25 : 0) +
        ((resume?.skills?.length || 0) > 0 ? 25 : 0)
    );

    if (loading) {
        return (
            <AuthenticatedLayout>
                <Head title="Loading..." />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="text-center">
                                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-violet-500 border-r-transparent"></div>
                                <p className="mt-4 text-gray-400">Loading resume...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    if (isNew) {
        return (
            <AuthenticatedLayout>
                <Head title="Create Resume" />
                <div className="py-12">
                    <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/10 to-indigo-600/10 border border-violet-500/20 p-8">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 mb-4 shadow-lg shadow-violet-500/25">
                                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Create New Resume</h2>
                                    <p className="text-gray-400">Give your resume a title to get started</p>
                                </div>

                                <form onSubmit={handleCreateResume} className="space-y-6">
                                    {/* Show selected template */}
                                    {selectedTemplateSlug && templates.length > 0 && (
                                        <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-emerald-400">Template Selected</p>
                                                <p className="text-xs text-gray-400">
                                                    {templates.find(t => t.slug === selectedTemplateSlug)?.name || selectedTemplateSlug}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Resume Title</label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                            placeholder="e.g., Software Engineer Resume"
                                            required
                                            autoFocus
                                        />
                                        {errors.title && <p className="mt-2 text-sm text-red-400">{errors.title}</p>}
                                        <p className="mt-2 text-xs text-gray-500">Choose a descriptive title to organize multiple resumes</p>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Link
                                            href={route('resumes.index')}
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 font-semibold hover:bg-white/10 transition-all"
                                        >
                                            Cancel
                                        </Link>
                                        <button
                                            type="submit"
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/25"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                            Create Resume
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title={`Edit ${resume?.title}`} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">{resume?.title}</h1>
                                <div className="flex items-center gap-3 mt-1">
                                    <p className="text-sm text-gray-400 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Updated {new Date(resume?.updated_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                    </p>
                                    {resume?.template && (
                                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-violet-500/20 text-violet-300 text-xs font-medium rounded-lg">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                            </svg>
                                            {resume.template.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <a
                                href={`/resumes/${resume?.id}/pdf/download`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold rounded-xl transition-all shadow-lg"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download PDF
                            </a>
                            <Link
                                href={route('resumes.index')}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back
                            </Link>
                        </div>
                    </div>

                    {/* Progress Card */}
                    <div className="mb-6 rounded-2xl bg-white/5 border border-white/10 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-white">Resume Completion</h3>
                            <span className={`text-sm font-bold ${completionPercentage === 100 ? 'text-emerald-400' : 'text-violet-400'}`}>
                                {completionPercentage}%
                            </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                            <div
                                className={`h-2 rounded-full transition-all duration-500 ${completionPercentage === 100 ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-gradient-to-r from-violet-500 to-indigo-500'}`}
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { label: 'Personal Info', complete: !!resume?.personal_info, color: 'violet' },
                                { label: 'Experience', complete: (resume?.work_experiences?.length || 0) > 0, color: 'blue' },
                                { label: 'Education', complete: (resume?.educations?.length || 0) > 0, color: 'emerald' },
                                { label: 'Skills', complete: (resume?.skills?.length || 0) > 0, color: 'amber' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.complete ? 'bg-emerald-500' : 'bg-white/10'}`}>
                                        {item.complete && (
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className={`text-xs ${item.complete ? 'text-white' : 'text-gray-500'}`}>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Template Section */}
                    <div className="mb-6 rounded-2xl bg-white/5 border border-white/10 p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h3 className="text-sm font-semibold text-white mb-1">Template</h3>
                                <p className="text-sm text-gray-400">
                                    Current: <span className={`font-medium ${resume?.template ? 'text-violet-400' : 'text-amber-400'}`}>
                                        {resume?.template?.name || 'None selected (using Modern default)'}
                                    </span>
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => {
                                        console.log('Customize clicked - resume:', resume);
                                        console.log('Customize clicked - resume.template:', resume?.template);
                                        setShowCustomizer(true);
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                    Customize
                                </button>
                                <button
                                    onClick={() => setShowTemplateSelector(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5z" />
                                    </svg>
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="mb-6">
                        <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                        activeTab === tab.id
                                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {tab.icon}
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                        {activeTab === 'personal' && resume && (
                            <PersonalInfoForm
                                resume={resume}
                                onUpdate={handleUpdateResume}
                                onNext={goToNextTab}
                                showNextButton={!isLastTab}
                            />
                        )}

                        {activeTab === 'experience' && resume?.id && (
                            <WorkExperienceForm
                                resumeId={resume.id}
                                experiences={resume?.work_experiences || []}
                                onUpdate={fetchResume}
                                onNext={goToNextTab}
                                showNextButton={true}
                            />
                        )}

                        {activeTab === 'education' && resume?.id && (
                            <EducationForm
                                resumeId={resume.id}
                                educations={resume?.educations || []}
                                onUpdate={fetchResume}
                                onNext={goToNextTab}
                                showNextButton={true}
                            />
                        )}

                        {activeTab === 'skills' && resume?.id && (
                            <SkillsForm
                                resumeId={resume.id}
                                skills={resume?.skills || []}
                                onUpdate={fetchResume}
                                isLastStep={true}
                                onFinish={() => window.open(`/resumes/${resume?.id}/pdf/preview`, '_blank')}
                            />
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-6">
                        <div className="flex items-center justify-between">
                            {/* Previous Button */}
                            <div>
                                {!isFirstTab && (
                                    <button
                                        onClick={goToPreviousTab}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Previous: {tabs[currentTabIndex - 1]?.label}
                                    </button>
                                )}
                            </div>

                            {/* Step Indicator */}
                            <div className="hidden sm:flex items-center gap-2">
                                {tabs.map((tab, idx) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-3 h-3 rounded-full transition-all ${
                                            idx === currentTabIndex
                                                ? 'bg-violet-500 w-8'
                                                : idx < currentTabIndex
                                                    ? 'bg-emerald-500'
                                                    : 'bg-white/20'
                                        }`}
                                        title={tab.label}
                                    />
                                ))}
                            </div>

                            {/* Next / Finish Button */}
                            <div>
                                {isLastTab ? (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowCustomizer(true)}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                            </svg>
                                            Customize
                                        </button>
                                        <a
                                            href={`/resumes/${resume?.id}/pdf/preview`}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Preview
                                        </a>
                                        <a
                                            href={`/resumes/${resume?.id}/pdf/download`}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold rounded-xl transition-all shadow-lg"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Download PDF
                                        </a>
                                    </div>
                                ) : (
                                    <button
                                        onClick={goToNextTab}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/25"
                                    >
                                        Next: {tabs[currentTabIndex + 1]?.label}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Progress hint */}
                        <div className="mt-4 pt-4 border-t border-white/10 text-center">
                            <p className="text-sm text-gray-500">
                                {isLastTab ? (
                                    completionPercentage === 100 ? (
                                        <span className="text-emerald-400">Your resume is complete! Download or preview it above.</span>
                                    ) : (
                                        <span>Fill in all sections to complete your resume ({completionPercentage}% done)</span>
                                    )
                                ) : (
                                    <span>Step {currentTabIndex + 1} of {tabs.length} - {tabs[currentTabIndex]?.label}</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Template Customizer Modal */}
            {showCustomizer && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCustomizer(false)}></div>
                    <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
                        <TemplateCustomizer
                            resumeId={resume?.id}
                            resume={resume}
                            onClose={() => setShowCustomizer(false)}
                            onUpdate={fetchResume}
                        />
                    </div>
                </div>
            )}

            {/* Template Selector Modal */}
            {showTemplateSelector && (
                <div className="fixed inset-0 z-50 overflow-y-auto" onClick={() => setShowTemplateSelector(false)}>
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm"></div>
                        <div className="relative bg-[#12121a] border border-white/10 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            {/* Header */}
                            <div className="sticky top-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border-b border-white/10 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-white">Choose Template</h2>
                                    <button onClick={() => setShowTemplateSelector(false)} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Templates Grid */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {templates.map((template) => (
                                        <button
                                            key={template.id}
                                            onClick={() => handleTemplateSelect(template.id)}
                                            className={`text-left rounded-xl p-5 transition-all ${
                                                resume?.template_id === template.id
                                                    ? 'bg-violet-500/20 border-2 border-violet-500'
                                                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/50'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="font-bold text-white">{template.name}</h3>
                                                <div className="flex gap-2">
                                                    {resume?.template_id === template.id && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-violet-500 text-white text-xs font-bold rounded-full">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            Active
                                                        </span>
                                                    )}
                                                    {template.is_premium && (
                                                        <span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">PRO</span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{template.description}</p>
                                            <div className="flex items-center gap-3">
                                                {template.colors && (
                                                    <div className="flex gap-1">
                                                        <div className="w-6 h-6 rounded-full border-2 border-white/20" style={{ backgroundColor: template.colors.primary }}></div>
                                                        <div className="w-6 h-6 rounded-full border-2 border-white/20" style={{ backgroundColor: template.colors.secondary }}></div>
                                                        <div className="w-6 h-6 rounded-full border-2 border-white/20" style={{ backgroundColor: template.colors.accent }}></div>
                                                    </div>
                                                )}
                                                <span className="text-xs text-gray-500 capitalize">{template.category}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
