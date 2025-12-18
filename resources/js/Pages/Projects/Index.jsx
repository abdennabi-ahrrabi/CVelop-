import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ projects }) {
    const [deletingId, setDeletingId] = useState(null);
    const [reordering, setReordering] = useState(false);

    const handleDelete = (project) => {
        if (confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`)) {
            setDeletingId(project.id);
            router.delete(route('projects.destroy', project.id), {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    const handleToggleVisibility = (project) => {
        router.put(route('projects.update', project.id), {
            ...project,
            is_visible: !project.is_visible,
        }, {
            preserveScroll: true,
        });
    };

    const handleToggleFeatured = (project) => {
        router.put(route('projects.update', project.id), {
            ...project,
            is_featured: !project.is_featured,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Projects" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Projects</h1>
                            <p className="text-gray-400 mt-1">Showcase your work and portfolio</p>
                        </div>
                        <Link
                            href={route('projects.create')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/25"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Project
                        </Link>
                    </div>

                    {/* Projects Grid */}
                    {projects.length === 0 ? (
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-12 text-center">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
                            <p className="text-gray-400 mb-6 max-w-md mx-auto">
                                Add your first project to showcase your work on your public profile. Highlight your best work with featured projects.
                            </p>
                            <Link
                                href={route('projects.create')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Your First Project
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className={`group rounded-2xl bg-white/5 border overflow-hidden transition-all ${
                                        project.is_featured
                                            ? 'border-violet-500/50 ring-1 ring-violet-500/20'
                                            : 'border-white/10 hover:border-violet-500/50'
                                    } ${!project.is_visible ? 'opacity-60' : ''}`}
                                >
                                    {/* Project Image */}
                                    <div className="aspect-video bg-white/5 relative overflow-hidden">
                                        {project.image ? (
                                            <img
                                                src={`/storage/${project.image}`}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Badges */}
                                        <div className="absolute top-2 left-2 flex gap-2">
                                            {project.is_featured && (
                                                <span className="px-2 py-1 bg-violet-500/90 text-white text-xs font-bold rounded-full">
                                                    FEATURED
                                                </span>
                                            )}
                                            {!project.is_visible && (
                                                <span className="px-2 py-1 bg-gray-500/90 text-white text-xs font-bold rounded-full">
                                                    HIDDEN
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Project Content */}
                                    <div className="p-5">
                                        <div className="mb-3">
                                            <h3 className="font-bold text-white text-lg truncate">{project.title}</h3>
                                            {project.category && (
                                                <span className="text-xs text-violet-400 font-medium">{project.category}</span>
                                            )}
                                        </div>

                                        {project.description && (
                                            <p className="text-sm text-gray-400 line-clamp-2 mb-3">{project.description}</p>
                                        )}

                                        {/* Technologies */}
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {project.technologies.slice(0, 3).map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-0.5 text-xs bg-white/10 text-gray-300 rounded-full"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 3 && (
                                                    <span className="px-2 py-0.5 text-xs bg-white/10 text-gray-400 rounded-full">
                                                        +{project.technologies.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Quick Actions */}
                                        <div className="flex gap-2 mb-3">
                                            <button
                                                onClick={() => handleToggleFeatured(project)}
                                                className={`p-2 rounded-lg transition-all ${
                                                    project.is_featured
                                                        ? 'bg-violet-500/20 text-violet-400'
                                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                                }`}
                                                title={project.is_featured ? 'Remove from featured' : 'Mark as featured'}
                                            >
                                                <svg className="w-5 h-5" fill={project.is_featured ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleToggleVisibility(project)}
                                                className={`p-2 rounded-lg transition-all ${
                                                    project.is_visible
                                                        ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                                                        : 'bg-gray-500/20 text-gray-400'
                                                }`}
                                                title={project.is_visible ? 'Hide project' : 'Show project'}
                                            >
                                                {project.is_visible ? (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('projects.edit', project.id)}
                                                className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-all text-center"
                                            >
                                                Edit
                                            </Link>
                                            {project.url && (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="py-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                                                    title="View Live"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="py-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                                                    title="GitHub"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                    </svg>
                                                </a>
                                            )}
                                            <button
                                                onClick={() => handleDelete(project)}
                                                disabled={deletingId === project.id}
                                                className="py-2 px-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all disabled:opacity-50"
                                                title="Delete"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
