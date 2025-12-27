import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function ProjectEditor({ project = null }) {
    const isEditing = !!project;
    const imageInputRef = useRef(null);
    const [techInput, setTechInput] = useState('');

    const { data, setData, post, put, processing, errors } = useForm({
        title: project?.title || '',
        description: project?.description || '',
        url: project?.url || '',
        github_url: project?.github_url || '',
        technologies: project?.technologies || [],
        category: project?.category || '',
        start_date: project?.start_date?.split('T')[0] || '',
        end_date: project?.end_date?.split('T')[0] || '',
        is_featured: project?.is_featured || false,
        is_visible: project?.is_visible ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('portfolio.projects.update', project.id));
        } else {
            post(route('portfolio.projects.store'));
        }
    };

    const addTechnology = () => {
        if (techInput.trim() && !data.technologies.includes(techInput.trim())) {
            setData('technologies', [...data.technologies, techInput.trim()]);
            setTechInput('');
        }
    };

    const removeTechnology = (tech) => {
        setData('technologies', data.technologies.filter(t => t !== tech));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTechnology();
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            await router.post(route('portfolio.projects.image', project.id), formData, {
                forceFormData: true,
                preserveScroll: true,
            });
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const categories = [
        'Web Application',
        'Mobile App',
        'API / Backend',
        'CLI Tool',
        'Library / Package',
        'Design / UI',
        'Data Science',
        'Machine Learning',
        'Game',
        'Other',
    ];

    return (
        <AuthenticatedLayout>
            <Head title={isEditing ? `Edit ${project.title}` : 'Add Project'} />

            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href={route('portfolio.index')}
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Portfolio
                        </Link>
                        <h1 className="text-2xl font-bold text-white">
                            {isEditing ? 'Edit Project' : 'Add New Project'}
                        </h1>
                        <p className="text-gray-400 mt-1">
                            {isEditing ? 'Update your project details' : 'Showcase your work on your public profile'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Project Image (only for editing) */}
                        {isEditing && (
                            <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">Project Image</h2>
                                <div className="flex items-center gap-6">
                                    <div className="w-48 aspect-video bg-white/5 rounded-xl overflow-hidden flex-shrink-0">
                                        {project.image ? (
                                            <img
                                                src={`/storage/${project.image}`}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            ref={imageInputRef}
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => imageInputRef.current?.click()}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                                        >
                                            {project.image ? 'Change Image' : 'Upload Image'}
                                        </button>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Recommended: 16:9 aspect ratio, max 5MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Basic Info */}
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Project Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                        placeholder="My Awesome Project"
                                        required
                                    />
                                    {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                                        placeholder="Describe what this project does and why it's interesting..."
                                    />
                                    {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Category
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">Links</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Live URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.url}
                                        onChange={(e) => setData('url', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                        placeholder="https://myproject.com"
                                    />
                                    {errors.url && <p className="text-red-400 text-sm mt-1">{errors.url}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        GitHub URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.github_url}
                                        onChange={(e) => setData('github_url', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                        placeholder="https://github.com/username/project"
                                    />
                                    {errors.github_url && <p className="text-red-400 text-sm mt-1">{errors.github_url}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">Technologies Used</h2>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    placeholder="e.g., React, Node.js, PostgreSQL"
                                />
                                <button
                                    type="button"
                                    onClick={addTechnology}
                                    className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all"
                                >
                                    Add
                                </button>
                            </div>
                            {data.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {data.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-violet-500/20 text-violet-400 rounded-full"
                                        >
                                            {tech}
                                            <button
                                                type="button"
                                                onClick={() => removeTechnology(tech)}
                                                className="hover:text-white transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Dates */}
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">Timeline</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Visibility Settings */}
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">Visibility</h2>
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_visible}
                                        onChange={(e) => setData('is_visible', e.target.checked)}
                                        className="w-5 h-5 rounded bg-white/5 border-white/20 text-violet-500 focus:ring-violet-500 focus:ring-offset-0"
                                    />
                                    <div>
                                        <span className="text-white font-medium">Show on public profile</span>
                                        <p className="text-sm text-gray-400">When enabled, this project will appear on your public profile</p>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                        className="w-5 h-5 rounded bg-white/5 border-white/20 text-violet-500 focus:ring-violet-500 focus:ring-offset-0"
                                    />
                                    <div>
                                        <span className="text-white font-medium">Featured project</span>
                                        <p className="text-sm text-gray-400">Featured projects are highlighted on your profile</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all"
                            >
                                {processing ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
                            </button>
                            <Link
                                href={route('portfolio.index')}
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
