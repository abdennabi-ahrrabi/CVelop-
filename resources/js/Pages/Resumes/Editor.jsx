import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { resumeApi, templateApi } from '@/utils/api';
import PersonalInfoForm from '@/Components/Resume/PersonalInfoForm';
import WorkExperienceForm from '@/Components/Resume/WorkExperienceForm';
import EducationForm from '@/Components/Resume/EducationForm';
import SkillsForm from '@/Components/Resume/SkillsForm';
import TemplateCustomizer from '@/Components/Resume/TemplateCustomizer';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Editor({ resumeId = null }) {
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('personal');
    const [isNew, setIsNew] = useState(!resumeId);
    const [currentResumeId, setCurrentResumeId] = useState(resumeId);
    const [templates, setTemplates] = useState([]);
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);
    const [showCustomizer, setShowCustomizer] = useState(false);

    const { data, setData, errors, setError } = useForm({
        title: '',
    });

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
            const response = await resumeApi.create({ title: data.title });
            setResume(response.data.data);
            setCurrentResumeId(response.data.data.id);
            setIsNew(false);
            window.history.pushState({}, '', `/resumes/${response.data.data.id}/edit`);
        } catch (error) {
            if (error.response?.data?.errors) {
                setError(error.response.data.errors);
            }
        }
    };

    const handleUpdateResume = async (updates) => {
        try {
            const response = await resumeApi.update(resume.id, updates);
            setResume(response.data.data);
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
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            description: 'Your basic information'
        },
        {
            id: 'experience',
            label: 'Work Experience',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            description: 'Your work history'
        },
        {
            id: 'education',
            label: 'Education',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            description: 'Your education background'
        },
        {
            id: 'skills',
            label: 'Skills',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            description: 'Your technical and soft skills'
        },
    ];

    if (loading) {
        return (
            <AuthenticatedLayout>
                <Head title="Loading..." />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="text-center">
                                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading resume...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    if (isNew) {
        return (
            <AuthenticatedLayout
                header={
                    <div>
                        <h2 className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                            Create New Resume
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Start building your professional resume
                        </p>
                    </div>
                }
            >
                <Head title="Create Resume" />
                <div className="py-8">
                    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="p-8">
                                <div className="mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
                                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                        Let's create your resume
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Give your resume a title to get started. You can always change this later.
                                    </p>
                                </div>

                                <form onSubmit={handleCreateResume} className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="title" value="Resume Title" />
                                        <TextInput
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="mt-2 block w-full"
                                            placeholder="e.g., Software Engineer Resume, Marketing Manager CV"
                                            required
                                            autoFocus
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            Choose a descriptive title to help you organize multiple resumes
                                        </p>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Link
                                            href={route('resumes.index')}
                                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                        >
                                            Cancel
                                        </Link>
                                        <PrimaryButton className="flex-1 inline-flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                            Create Resume
                                        </PrimaryButton>
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
        <AuthenticatedLayout
            header={
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                                    {resume?.title}
                                </h2>
                                <p className="mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Last updated {new Date(resume?.updated_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href={`/resumes/${resume?.id}/pdf/download`}
                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 hover:from-indigo-700 hover:to-purple-700"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download PDF
                        </a>
                        <Link
                            href={route('resumes.index')}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Edit ${resume?.title}`} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Progress Indicator */}
                    <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Resume Completion</h3>
                            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                {Math.round((
                                    (resume?.personal_info ? 25 : 0) +
                                    ((resume?.work_experiences?.length || 0) > 0 ? 25 : 0) +
                                    ((resume?.educations?.length || 0) > 0 ? 25 : 0) +
                                    ((resume?.skills?.length || 0) > 0 ? 25 : 0)
                                ))}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${
                                    (resume?.personal_info ? 25 : 0) +
                                    ((resume?.work_experiences?.length || 0) > 0 ? 25 : 0) +
                                    ((resume?.educations?.length || 0) > 0 ? 25 : 0) +
                                    ((resume?.skills?.length || 0) > 0 ? 25 : 0)
                                }%` }}
                            ></div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { label: 'Personal Info', complete: !!resume?.personal_info },
                                { label: 'Experience', complete: (resume?.work_experiences?.length || 0) > 0 },
                                { label: 'Education', complete: (resume?.educations?.length || 0) > 0 },
                                { label: 'Skills', complete: (resume?.skills?.length || 0) > 0 }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs">
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.complete ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                        {item.complete && (
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className={item.complete ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Template Selector */}
                    <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">CV Template</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Current: <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                        {resume?.template?.name || 'Modern Professional (Default)'}
                                    </span>
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowCustomizer(true)}
                                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                    Customize Template
                                </button>
                                <button
                                    onClick={() => setShowTemplateSelector(true)}
                                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                                    </svg>
                                    Change Template
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Template Customizer Modal */}
                    {showCustomizer && (
                        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowCustomizer(false)}></div>
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
                                <div className="fixed inset-0 bg-black opacity-50"></div>
                                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                                    <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-t-2xl">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-2xl font-bold text-white">Choose Your Template</h2>
                                            <button onClick={() => setShowTemplateSelector(false)} className="text-white hover:text-gray-200">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {templates.map((template) => (
                                            <button
                                                key={template.id}
                                                onClick={() => handleTemplateSelect(template.id)}
                                                className={`text-left border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-xl ${
                                                    resume?.template_id === template.id
                                                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{template.name}</h3>
                                                    {resume?.template_id === template.id && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            Active
                                                        </span>
                                                    )}
                                                    {template.is_premium && (
                                                        <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">Premium</span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex gap-1">
                                                        {template.colors && (
                                                            <>
                                                                <div className="w-6 h-6 rounded-full border-2 border-white shadow" style={{ backgroundColor: template.colors.primary }}></div>
                                                                <div className="w-6 h-6 rounded-full border-2 border-white shadow" style={{ backgroundColor: template.colors.secondary }}></div>
                                                                <div className="w-6 h-6 rounded-full border-2 border-white shadow" style={{ backgroundColor: template.colors.accent }}></div>
                                                            </>
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{template.category}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab Navigation */}
                    <div className="mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                            <nav className="flex space-x-0 overflow-x-auto" aria-label="Tabs">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            group inline-flex flex-1 flex-col items-center justify-center gap-2 whitespace-nowrap px-4 py-4 text-sm font-semibold transition-all duration-200 border-b-4
                                            ${activeTab === tab.id
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-600 dark:border-indigo-400 dark:bg-indigo-900/20 dark:text-indigo-400'
                                                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                                            }
                                        `}
                                    >
                                        <span className={activeTab === tab.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500'}>
                                            {tab.icon}
                                        </span>
                                        <span className="text-center">{tab.label}</span>
                                        <span className="hidden md:block text-xs font-normal opacity-75">{tab.description}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                        {activeTab === 'personal' && resume && (
                            <PersonalInfoForm
                                resume={resume}
                                onUpdate={handleUpdateResume}
                            />
                        )}

                        {activeTab === 'experience' && resume?.id && (
                            <WorkExperienceForm
                                resumeId={resume.id}
                                experiences={resume?.work_experiences || []}
                                onUpdate={fetchResume}
                            />
                        )}

                        {activeTab === 'education' && resume?.id && (
                            <EducationForm
                                resumeId={resume.id}
                                educations={resume?.educations || []}
                                onUpdate={fetchResume}
                            />
                        )}

                        {activeTab === 'skills' && resume?.id && (
                            <SkillsForm
                                resumeId={resume.id}
                                skills={resume?.skills || []}
                                onUpdate={fetchResume}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
