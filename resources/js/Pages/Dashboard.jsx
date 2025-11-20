import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { templateApi } from '@/utils/api';

export default function Dashboard() {
    const [templates, setTemplates] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const response = await templateApi.getAll();
            setTemplates(response.data.data);
        } catch (err) {
            console.error('Error fetching templates:', err);
        }
    };

    const handlePreview = (template) => {
        setSelectedTemplate(template);
        setShowPreview(true);
    };

    const closePreview = () => {
        setShowPreview(false);
        setSelectedTemplate(null);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                            Dashboard
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Welcome back! Manage your resumes and build your professional CV
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Welcome to CV Builder Pro!</h1>
                                <p className="text-indigo-100 text-lg">
                                    Create professional resumes in minutes with our powerful editor
                                </p>
                            </div>
                            <div className="hidden lg:block">
                                <svg className="w-32 h-32 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Create Resume */}
                            <Link href="/resumes/create" className="group">
                                <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-200">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Create New Resume</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Start building a professional resume from scratch
                                    </p>
                                </div>
                            </Link>

                            {/* My Resumes */}
                            <Link href="/resumes" className="group">
                                <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-200">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">My Resumes</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        View and manage all your created resumes
                                    </p>
                                </div>
                            </Link>

                            {/* Profile Settings */}
                            <Link href="/profile" className="group">
                                <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl hover:border-pink-500 dark:hover:border-pink-500 transition-all duration-200">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Profile Settings</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Update your account information and preferences
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Features Overview */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">5 Templates</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Choose from professional CV templates
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">PDF Export</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Download your CV as professional PDF
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Easy Editor</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Intuitive interface with real-time preview
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">ATS Friendly</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Optimized for applicant tracking systems
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Templates Showcase */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Available Templates</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Choose from {templates.length} professional CV templates</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {templates.map((template) => (
                                <div
                                    key={template.id}
                                    className="group bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                                                {template.name}
                                            </h4>
                                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 capitalize">
                                                {template.category}
                                            </span>
                                        </div>
                                        {template.is_premium && (
                                            <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                                                Premium
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                        {template.description}
                                    </p>

                                    {/* Color Preview */}
                                    <div className="mb-4">
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Color Palette</div>
                                        <div className="flex gap-2">
                                            {template.colors && (
                                                <>
                                                    <div
                                                        className="w-10 h-10 rounded-lg border-2 border-white dark:border-gray-700 shadow-md transition-transform group-hover:scale-110"
                                                        style={{ backgroundColor: template.colors.primary }}
                                                        title="Primary Color"
                                                    ></div>
                                                    <div
                                                        className="w-10 h-10 rounded-lg border-2 border-white dark:border-gray-700 shadow-md transition-transform group-hover:scale-110"
                                                        style={{ backgroundColor: template.colors.secondary }}
                                                        title="Secondary Color"
                                                    ></div>
                                                    <div
                                                        className="w-10 h-10 rounded-lg border-2 border-white dark:border-gray-700 shadow-md transition-transform group-hover:scale-110"
                                                        style={{ backgroundColor: template.colors.accent }}
                                                        title="Accent Color"
                                                    ></div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Call to Action */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handlePreview(template)}
                                            className="flex-1 px-4 py-2 border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 text-sm font-semibold rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all duration-200 flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Preview
                                        </button>
                                        <Link
                                            href="/resumes/create"
                                            className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                        >
                                            Use Template
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Getting Started Guide */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Getting Started</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Create Your Resume</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Click "Create New Resume" and give your CV a title</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Add Your Information</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Fill in personal details, work experience, education, and skills</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Choose a Template</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Select from 5 professional templates that match your style</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Download & Apply</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Export as PDF and start applying to your dream jobs!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            {showPreview && selectedTemplate && (
                <div className="fixed inset-0 z-50 overflow-y-auto" onClick={closePreview}>
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" aria-hidden="true"></div>

                        {/* Center modal */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div
                            className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-2xl rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-600 to-purple-600">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            {selectedTemplate.name} Preview
                                        </h3>
                                        <p className="text-sm text-indigo-100">Sample resume with demo data</p>
                                    </div>
                                </div>
                                <button
                                    onClick={closePreview}
                                    className="w-10 h-10 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center group"
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Body - PDF Preview */}
                            <div className="relative bg-gray-100 dark:bg-gray-900" style={{ height: '80vh' }}>
                                <iframe
                                    src={`/templates/${selectedTemplate.slug}/preview`}
                                    className="w-full h-full border-0"
                                    title={`${selectedTemplate.name} Preview`}
                                />
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        This is a sample preview with demo data
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={closePreview}
                                        className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200"
                                    >
                                        Close
                                    </button>
                                    <Link
                                        href="/resumes/create"
                                        className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                    >
                                        Use This Template
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
