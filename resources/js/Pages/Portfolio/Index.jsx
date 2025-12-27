import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';
import ImageInput from '@/Components/ImageInput';

// Reusable Section Card component
const SectionCard = ({ title, subtitle, icon, iconBg, count, children, actions }) => (
    <section className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center`}>
                    {icon}
                </div>
                <div>
                    <h2 className="text-lg font-bold text-white">{title}</h2>
                    <p className="text-xs text-gray-400">{subtitle}</p>
                </div>
            </div>
            {actions}
        </div>
        {children}
    </section>
);

// Empty state component
const EmptyState = ({ message, actionLabel, onAction }) => (
    <div className="text-center py-6">
        <p className="text-gray-400 mb-3">{message}</p>
        {actionLabel && (
            <button onClick={onAction} className="text-sm text-violet-400 hover:text-violet-300">
                {actionLabel}
            </button>
        )}
    </div>
);

// Simple Modal component
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <div className="relative bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default function Index({
    resumes, businessCards, projects, portfolioTemplates, settings, publicUrl, branding = {},
    testimonials = [], services = [], certifications = [], awards = [], clientLogos = [], languages = []
}) {
    const [deletingProjectId, setDeletingProjectId] = useState(null);
    const [showResumeSelector, setShowResumeSelector] = useState(false);
    const [showCardSelector, setShowCardSelector] = useState(false);
    const [copiedUrl, setCopiedUrl] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // Modal states
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [showTestimonialModal, setShowTestimonialModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [showCertificationModal, setShowCertificationModal] = useState(false);
    const [showAwardModal, setShowAwardModal] = useState(false);
    const [showClientLogoModal, setShowClientLogoModal] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const { data, setData, put, processing } = useForm({
        featured_resume_id: settings.featured_resume_id,
        featured_business_card_id: settings.featured_business_card_id,
        portfolio_template: settings.portfolio_template,
        availability_status: settings.availability_status || '',
        availability_text: settings.availability_text || '',
        years_of_experience: settings.years_of_experience || '',
        projects_completed: settings.projects_completed || '',
        clients_served: settings.clients_served || '',
        video_intro_url: settings.video_intro_url || '',
        skills_with_levels: settings.skills_with_levels || [],
        show_testimonials: settings.show_testimonials ?? true,
        show_services: settings.show_services ?? true,
        show_certifications: settings.show_certifications ?? true,
        show_awards: settings.show_awards ?? true,
        show_clients: settings.show_clients ?? true,
        show_languages: settings.show_languages ?? true,
        show_stats: settings.show_stats ?? true,
        show_availability: settings.show_availability ?? true,
    });

    // Form states for new items
    const [projectForm, setProjectForm] = useState({
        title: '', description: '', category: '', url: '', github_url: '', technologies: [], is_visible: true, is_featured: false
    });
    const [testimonialForm, setTestimonialForm] = useState({
        client_name: '', client_title: '', client_company: '', content: '', rating: 5, project_name: '', is_visible: true
    });
    const [serviceForm, setServiceForm] = useState({
        title: '', description: '', icon: '', price_from: '', price_to: '', price_unit: '', features: [], is_visible: true, is_featured: false
    });
    const [certificationForm, setCertificationForm] = useState({
        name: '', issuer: '', credential_id: '', credential_url: '', issue_date: '', expiry_date: '', does_not_expire: false, is_visible: true
    });
    const [awardForm, setAwardForm] = useState({
        title: '', issuer: '', description: '', date: '', url: '', is_visible: true
    });
    const [languageForm, setLanguageForm] = useState({
        language: '', proficiency: 'intermediate', is_visible: true
    });
    const [clientLogoForm, setClientLogoForm] = useState({
        name: '', logo: null, logo_url: '', url: '', is_visible: true
    });
    const clientLogoFileRef = useRef(null);

    // Branding state
    const [brandingState, setBrandingState] = useState({
        logo: branding.logo,
        logo_url: branding.logo_url,
        avatar: branding.avatar,
        avatar_url: branding.avatar_url,
        cover_image: branding.cover_image,
        cover_image_url: branding.cover_image_url,
    });
    const [uploadingBranding, setUploadingBranding] = useState(null);

    const selectedResume = resumes.find(r => r.id === data.featured_resume_id);
    const selectedCard = businessCards.find(c => c.id === data.featured_business_card_id);

    const saveSettings = (updates = {}) => {
        router.put(route('portfolio.settings.update'), { ...data, ...updates }, { preserveScroll: true });
    };

    const selectResume = (resumeId) => {
        setData('featured_resume_id', resumeId);
        setShowResumeSelector(false);
        saveSettings({ featured_resume_id: resumeId });
    };

    const selectCard = (cardId) => {
        setData('featured_business_card_id', cardId);
        setShowCardSelector(false);
        saveSettings({ featured_business_card_id: cardId });
    };

    const selectTemplate = (templateId) => {
        setData('portfolio_template', templateId);
        saveSettings({ portfolio_template: templateId });
    };

    const handleDeleteProject = (project) => {
        if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
            setDeletingProjectId(project.id);
            router.delete(route('portfolio.projects.destroy', project.id), {
                onFinish: () => setDeletingProjectId(null),
            });
        }
    };

    const copyPublicUrl = async () => {
        try {
            await navigator.clipboard.writeText(publicUrl);
            setCopiedUrl(true);
            setTimeout(() => setCopiedUrl(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // CRUD handlers for projects
    const handleSaveProject = () => {
        const endpoint = editingItem
            ? route('portfolio.projects.update', editingItem.id)
            : route('portfolio.projects.store');
        const method = editingItem ? 'put' : 'post';

        router[method](endpoint, projectForm, {
            preserveScroll: true,
            onSuccess: () => {
                setShowProjectModal(false);
                setEditingItem(null);
                setProjectForm({ title: '', description: '', category: '', url: '', github_url: '', technologies: [], is_visible: true, is_featured: false });
            }
        });
    };

    const handleDeleteProject2 = (item) => {
        if (confirm('Delete this project?')) {
            router.delete(route('portfolio.projects.destroy', item.id), { preserveScroll: true });
        }
    };

    // CRUD handlers for testimonials
    const handleSaveTestimonial = () => {
        const endpoint = editingItem
            ? route('portfolio.testimonials.update', editingItem.id)
            : route('portfolio.testimonials.store');
        const method = editingItem ? 'put' : 'post';

        router[method](endpoint, testimonialForm, {
            preserveScroll: true,
            onSuccess: () => {
                setShowTestimonialModal(false);
                setEditingItem(null);
                setTestimonialForm({ client_name: '', client_title: '', client_company: '', content: '', rating: 5, project_name: '', is_visible: true });
            }
        });
    };

    const handleDeleteTestimonial = (item) => {
        if (confirm('Delete this testimonial?')) {
            router.delete(route('portfolio.testimonials.destroy', item.id), { preserveScroll: true });
        }
    };

    // CRUD handlers for services
    const handleSaveService = () => {
        const endpoint = editingItem
            ? route('portfolio.services.update', editingItem.id)
            : route('portfolio.services.store');
        const method = editingItem ? 'put' : 'post';

        router[method](endpoint, serviceForm, {
            preserveScroll: true,
            onSuccess: () => {
                setShowServiceModal(false);
                setEditingItem(null);
                setServiceForm({ title: '', description: '', icon: '', price_from: '', price_to: '', price_unit: '', features: [], is_visible: true, is_featured: false });
            }
        });
    };

    const handleDeleteService = (item) => {
        if (confirm('Delete this service?')) {
            router.delete(route('portfolio.services.destroy', item.id), { preserveScroll: true });
        }
    };

    // CRUD handlers for certifications
    const handleSaveCertification = () => {
        const endpoint = editingItem
            ? route('portfolio.certifications.update', editingItem.id)
            : route('portfolio.certifications.store');
        const method = editingItem ? 'put' : 'post';

        router[method](endpoint, certificationForm, {
            preserveScroll: true,
            onSuccess: () => {
                setShowCertificationModal(false);
                setEditingItem(null);
                setCertificationForm({ name: '', issuer: '', credential_id: '', credential_url: '', issue_date: '', expiry_date: '', does_not_expire: false, is_visible: true });
            }
        });
    };

    const handleDeleteCertification = (item) => {
        if (confirm('Delete this certification?')) {
            router.delete(route('portfolio.certifications.destroy', item.id), { preserveScroll: true });
        }
    };

    // CRUD handlers for awards
    const handleSaveAward = () => {
        const endpoint = editingItem
            ? route('portfolio.awards.update', editingItem.id)
            : route('portfolio.awards.store');
        const method = editingItem ? 'put' : 'post';

        router[method](endpoint, awardForm, {
            preserveScroll: true,
            onSuccess: () => {
                setShowAwardModal(false);
                setEditingItem(null);
                setAwardForm({ title: '', issuer: '', description: '', date: '', url: '', is_visible: true });
            }
        });
    };

    const handleDeleteAward = (item) => {
        if (confirm('Delete this award?')) {
            router.delete(route('portfolio.awards.destroy', item.id), { preserveScroll: true });
        }
    };

    // CRUD handlers for languages
    const handleSaveLanguage = () => {
        const endpoint = editingItem
            ? route('portfolio.languages.update', editingItem.id)
            : route('portfolio.languages.store');
        const method = editingItem ? 'put' : 'post';

        router[method](endpoint, languageForm, {
            preserveScroll: true,
            onSuccess: () => {
                setShowLanguageModal(false);
                setEditingItem(null);
                setLanguageForm({ language: '', proficiency: 'intermediate', is_visible: true });
            }
        });
    };

    const handleDeleteLanguage = (item) => {
        if (confirm('Delete this language?')) {
            router.delete(route('portfolio.languages.destroy', item.id), { preserveScroll: true });
        }
    };

    // Handler for branding image upload/URL
    const handleBrandingUpload = async (type, file) => {
        setUploadingBranding(type);
        const formData = new FormData();
        formData.append('type', type);
        formData.append('image', file);

        router.post(route('portfolio.branding.update'), formData, {
            preserveScroll: true,
            onSuccess: () => {
                setUploadingBranding(null);
            },
            onError: () => {
                setUploadingBranding(null);
            }
        });
    };

    const handleBrandingUrl = (type, url) => {
        setUploadingBranding(type);
        router.post(route('portfolio.branding.update'), {
            type: type,
            image_url: url,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setUploadingBranding(null);
            },
            onError: () => {
                setUploadingBranding(null);
            }
        });
    };

    const handleBrandingRemove = (type) => {
        if (confirm('Remove this image?')) {
            router.delete(route('portfolio.branding.remove'), {
                data: { type },
                preserveScroll: true,
            });
        }
    };

    // Handler for client logo save
    const handleSaveClientLogo = () => {
        const formData = new FormData();
        formData.append('name', clientLogoForm.name);
        if (clientLogoForm.url) formData.append('url', clientLogoForm.url);
        formData.append('is_visible', clientLogoForm.is_visible ? '1' : '0');

        // Either file or URL
        if (clientLogoForm.logo) {
            formData.append('logo', clientLogoForm.logo);
        } else if (clientLogoForm.logo_url) {
            formData.append('logo_url', clientLogoForm.logo_url);
        }

        router.post(route('portfolio.client-logos.store'), formData, {
            preserveScroll: true,
            onSuccess: () => {
                setShowClientLogoModal(false);
                setClientLogoForm({ name: '', logo: null, logo_url: '', url: '', is_visible: true });
                if (clientLogoFileRef.current) clientLogoFileRef.current.value = '';
            }
        });
    };

    const availabilityOptions = [
        { value: '', label: 'Not set' },
        { value: 'available', label: 'Available' },
        { value: 'open_to_work', label: 'Open to Work' },
        { value: 'freelance', label: 'Available for Freelance' },
        { value: 'employed', label: 'Currently Employed' },
        { value: 'not_available', label: 'Not Available' },
    ];

    const proficiencyOptions = [
        { value: 'native', label: 'Native' },
        { value: 'fluent', label: 'Fluent' },
        { value: 'advanced', label: 'Advanced' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'basic', label: 'Basic' },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'projects', label: 'Projects', count: projects.length },
        { id: 'services', label: 'Services', count: services.length },
        { id: 'certifications', label: 'Certifications', count: certifications.length },
        { id: 'testimonials', label: 'Testimonials', count: testimonials.length },
        { id: 'awards', label: 'Awards', count: awards.length },
        { id: 'clients', label: 'Clients', count: clientLogos.length },
        { id: 'languages', label: 'Languages', count: languages.length },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Portfolio" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-white">My Portfolio</h1>
                            <p className="text-gray-400 mt-1">Customize your public portfolio page</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={copyPublicUrl}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                                    copiedUrl ? 'bg-green-500/20 text-green-400' : 'bg-white/10 hover:bg-white/20 text-white'
                                }`}
                            >
                                {copiedUrl ? (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                        </svg>
                                        Copy Link
                                    </>
                                )}
                            </button>
                            <a
                                href={publicUrl}
                                target="_blank"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View Portfolio
                            </a>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-white/10 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'bg-violet-600 text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {tab.label}
                                {tab.count !== undefined && (
                                    <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-white/20">{tab.count}</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <>
                            {/* Profile Branding - Logo & Images */}
                            <section className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Profile Branding</h2>
                                        <p className="text-sm text-gray-400">Your logo and profile images</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Logo */}
                                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                        <h3 className="text-sm font-semibold text-white mb-3">Logo</h3>
                                        <p className="text-xs text-gray-400 mb-4">Your personal or business logo</p>

                                        {branding.logo_display_url ? (
                                            <div className="space-y-3">
                                                <div className="w-24 h-24 mx-auto bg-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                                                    <img src={branding.logo_display_url} alt="Logo" className="max-w-full max-h-full object-contain" />
                                                </div>
                                                <div className="flex justify-center gap-2">
                                                    <label className="text-xs text-violet-400 hover:text-violet-300 cursor-pointer">
                                                        Change
                                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleBrandingUpload('logo', e.target.files[0])} />
                                                    </label>
                                                    <button onClick={() => handleBrandingRemove('logo')} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <ImageInput
                                                uploadValue={branding.logo}
                                                urlValue={branding.logo_url}
                                                onUpload={(file) => handleBrandingUpload('logo', file)}
                                                onUrlChange={(url) => handleBrandingUrl('logo', url)}
                                                onClear={() => handleBrandingRemove('logo')}
                                                maxSize={2}
                                                previewClassName="w-20 h-20"
                                                aspectRatio="1:1"
                                            />
                                        )}
                                        {uploadingBranding === 'logo' && <p className="text-xs text-violet-400 text-center mt-2">Uploading...</p>}
                                    </div>

                                    {/* Profile Image / Avatar */}
                                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                        <h3 className="text-sm font-semibold text-white mb-3">Profile Image</h3>
                                        <p className="text-xs text-gray-400 mb-4">Your photo or avatar</p>

                                        {branding.avatar_display_url ? (
                                            <div className="space-y-3">
                                                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                                                    <img src={branding.avatar_display_url} alt="Avatar" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex justify-center gap-2">
                                                    <label className="text-xs text-violet-400 hover:text-violet-300 cursor-pointer">
                                                        Change
                                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleBrandingUpload('avatar', e.target.files[0])} />
                                                    </label>
                                                    <button onClick={() => handleBrandingRemove('avatar')} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <ImageInput
                                                uploadValue={branding.avatar}
                                                urlValue={branding.avatar_url}
                                                onUpload={(file) => handleBrandingUpload('avatar', file)}
                                                onUrlChange={(url) => handleBrandingUrl('avatar', url)}
                                                onClear={() => handleBrandingRemove('avatar')}
                                                maxSize={2}
                                                previewClassName="w-20 h-20 rounded-full"
                                                aspectRatio="1:1"
                                            />
                                        )}
                                        {uploadingBranding === 'avatar' && <p className="text-xs text-violet-400 text-center mt-2">Uploading...</p>}
                                    </div>

                                    {/* Cover Image */}
                                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                                        <h3 className="text-sm font-semibold text-white mb-3">Cover Image</h3>
                                        <p className="text-xs text-gray-400 mb-4">Banner for your portfolio</p>

                                        {branding.cover_display_url ? (
                                            <div className="space-y-3">
                                                <div className="w-full aspect-[3/1] bg-white/10 rounded-xl overflow-hidden">
                                                    <img src={branding.cover_display_url} alt="Cover" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex justify-center gap-2">
                                                    <label className="text-xs text-violet-400 hover:text-violet-300 cursor-pointer">
                                                        Change
                                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleBrandingUpload('cover_image', e.target.files[0])} />
                                                    </label>
                                                    <button onClick={() => handleBrandingRemove('cover_image')} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <ImageInput
                                                uploadValue={branding.cover_image}
                                                urlValue={branding.cover_image_url}
                                                onUpload={(file) => handleBrandingUpload('cover_image', file)}
                                                onUrlChange={(url) => handleBrandingUrl('cover_image', url)}
                                                onClear={() => handleBrandingRemove('cover_image')}
                                                maxSize={5}
                                                previewClassName="w-full aspect-[3/1]"
                                                aspectRatio="3:1"
                                            />
                                        )}
                                        {uploadingBranding === 'cover_image' && <p className="text-xs text-violet-400 text-center mt-2">Uploading...</p>}
                                    </div>
                                </div>
                            </section>

                            {/* Availability & Stats */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Availability Status */}
                                <SectionCard
                                    title="Availability Status"
                                    subtitle="Let visitors know if you're available"
                                    iconBg="from-green-500 to-emerald-600"
                                    icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                >
                                    <div className="space-y-4">
                                        <select
                                            value={data.availability_status}
                                            onChange={(e) => { setData('availability_status', e.target.value); saveSettings({ availability_status: e.target.value }); }}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-violet-500"
                                        >
                                            {availabilityOptions.map(opt => (
                                                <option key={opt.value} value={opt.value} className="bg-gray-900">{opt.label}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Custom availability text (optional)"
                                            value={data.availability_text}
                                            onChange={(e) => setData('availability_text', e.target.value)}
                                            onBlur={() => saveSettings()}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-violet-500"
                                        />
                                    </div>
                                </SectionCard>

                                {/* Stats */}
                                <SectionCard
                                    title="Statistics"
                                    subtitle="Showcase your experience"
                                    iconBg="from-blue-500 to-cyan-600"
                                    icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                                >
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Years Exp.</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={data.years_of_experience}
                                                onChange={(e) => setData('years_of_experience', e.target.value)}
                                                onBlur={() => saveSettings()}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-violet-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Projects</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={data.projects_completed}
                                                onChange={(e) => setData('projects_completed', e.target.value)}
                                                onBlur={() => saveSettings()}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-violet-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Clients</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={data.clients_served}
                                                onChange={(e) => setData('clients_served', e.target.value)}
                                                onBlur={() => saveSettings()}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-violet-500"
                                            />
                                        </div>
                                    </div>
                                </SectionCard>
                            </div>

                            {/* Portfolio Template Selection */}
                            <section className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Portfolio Design</h2>
                                        <p className="text-sm text-gray-400">Choose how your portfolio looks</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                    {portfolioTemplates.map((template) => (
                                        <button
                                            key={template.id}
                                            onClick={() => selectTemplate(template.id)}
                                            className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                                                data.portfolio_template === template.id
                                                    ? 'border-violet-500 ring-2 ring-violet-500/50'
                                                    : 'border-white/10 hover:border-white/30'
                                            }`}
                                        >
                                            <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                                <span className="text-2xl font-bold text-gray-600">{template.name.charAt(0)}</span>
                                            </div>
                                            <div className="p-2 bg-black/50">
                                                <p className="text-sm font-medium text-white">{template.name}</p>
                                            </div>
                                            {data.portfolio_template === template.id && (
                                                <div className="absolute top-2 right-2 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Featured Resume & Business Card */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Featured Resume */}
                                <SectionCard
                                    title="Featured Resume"
                                    subtitle="Displayed on your portfolio"
                                    iconBg="from-emerald-500 to-teal-600"
                                    icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                                    actions={
                                        <button onClick={() => setShowResumeSelector(!showResumeSelector)} className="text-sm text-violet-400 hover:text-violet-300">
                                            {showResumeSelector ? 'Cancel' : 'Change'}
                                        </button>
                                    }
                                >
                                    {showResumeSelector ? (
                                        <div className="space-y-2">
                                            {resumes.length === 0 ? (
                                                <EmptyState message="No resumes yet" actionLabel="Create your first resume" onAction={() => router.visit(route('resumes.create'))} />
                                            ) : (
                                                resumes.map((resume) => (
                                                    <button
                                                        key={resume.id}
                                                        onClick={() => selectResume(resume.id)}
                                                        className={`w-full p-3 rounded-xl text-left transition-all ${
                                                            data.featured_resume_id === resume.id
                                                                ? 'bg-emerald-500/20 border border-emerald-500/50'
                                                                : 'bg-white/5 border border-transparent hover:bg-white/10'
                                                        }`}
                                                    >
                                                        <div className="font-medium text-white">{resume.title}</div>
                                                        <div className="text-xs text-gray-400">{resume.work_experiences_count} jobs, {resume.skills_count} skills</div>
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    ) : selectedResume ? (
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                            <div>
                                                <p className="font-medium text-white">{selectedResume.title}</p>
                                                <p className="text-xs text-gray-400">{selectedResume.work_experiences_count} jobs, {selectedResume.educations_count} education, {selectedResume.skills_count} skills</p>
                                            </div>
                                            <Link href={route('resumes.edit', selectedResume.id)} className="text-sm text-violet-400 hover:text-violet-300">Edit</Link>
                                        </div>
                                    ) : (
                                        <EmptyState message="No resume selected" actionLabel={resumes.length > 0 ? "Select a resume" : null} onAction={() => setShowResumeSelector(true)} />
                                    )}
                                </SectionCard>

                                {/* Featured Business Card */}
                                <SectionCard
                                    title="Featured Card"
                                    subtitle="Contact info on your portfolio"
                                    iconBg="from-amber-500 to-orange-600"
                                    icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>}
                                    actions={
                                        <button onClick={() => setShowCardSelector(!showCardSelector)} className="text-sm text-violet-400 hover:text-violet-300">
                                            {showCardSelector ? 'Cancel' : 'Change'}
                                        </button>
                                    }
                                >
                                    {showCardSelector ? (
                                        <div className="space-y-2">
                                            {businessCards.length === 0 ? (
                                                <EmptyState message="No business cards yet" actionLabel="Create your first card" onAction={() => router.visit(route('business-cards.create'))} />
                                            ) : (
                                                businessCards.map((card) => (
                                                    <button
                                                        key={card.id}
                                                        onClick={() => selectCard(card.id)}
                                                        className={`w-full p-3 rounded-xl text-left transition-all ${
                                                            data.featured_business_card_id === card.id
                                                                ? 'bg-amber-500/20 border border-amber-500/50'
                                                                : 'bg-white/5 border border-transparent hover:bg-white/10'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {card.avatar ? (
                                                                <img src={`/storage/${card.avatar}`} alt="" className="w-10 h-10 rounded-full object-cover" />
                                                            ) : (
                                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
                                                                    {card.display_name?.charAt(0)?.toUpperCase() || 'C'}
                                                                </div>
                                                            )}
                                                            <div>
                                                                <div className="font-medium text-white">{card.display_name}</div>
                                                                <div className="text-xs text-gray-400">{card.title}</div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    ) : selectedCard ? (
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                            <div className="flex items-center gap-3">
                                                {selectedCard.avatar ? (
                                                    <img src={`/storage/${selectedCard.avatar}`} alt="" className="w-12 h-12 rounded-full object-cover" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                                                        {selectedCard.display_name?.charAt(0)?.toUpperCase() || 'C'}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-white">{selectedCard.display_name}</p>
                                                    <p className="text-xs text-gray-400">{selectedCard.title}</p>
                                                </div>
                                            </div>
                                            <Link href={route('business-cards.edit', selectedCard.id)} className="text-sm text-violet-400 hover:text-violet-300">Edit</Link>
                                        </div>
                                    ) : (
                                        <EmptyState message="No business card selected" actionLabel={businessCards.length > 0 ? "Select a card" : null} onAction={() => setShowCardSelector(true)} />
                                    )}
                                </SectionCard>
                            </div>

                        </>
                    )}

                    {/* Projects Tab */}
                    {activeTab === 'projects' && (
                        <SectionCard
                            title="Projects"
                            subtitle="Showcase your work and portfolio pieces"
                            iconBg="from-violet-500 to-indigo-600"
                            icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                            actions={
                                <button
                                    onClick={() => { setEditingItem(null); setProjectForm({ title: '', description: '', category: '', url: '', github_url: '', technologies: [], is_visible: true, is_featured: false }); setShowProjectModal(true); }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    Add
                                </button>
                            }
                        >
                            {projects.length === 0 ? (
                                <EmptyState message="No projects yet. Add your work to showcase your portfolio." />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {projects.map((item) => (
                                        <div key={item.id} className={`p-4 rounded-xl bg-white/5 border ${item.is_featured ? 'border-violet-500/50' : 'border-white/10'} ${!item.is_visible ? 'opacity-60' : ''}`}>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-semibold text-white">{item.title}</p>
                                                        {item.is_featured && <span className="px-1.5 py-0.5 bg-violet-500/20 text-violet-400 text-xs rounded">Featured</span>}
                                                    </div>
                                                    {item.category && <p className="text-sm text-violet-400">{item.category}</p>}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => { setEditingItem(item); setProjectForm({ ...item, technologies: item.technologies || [] }); setShowProjectModal(true); }} className="text-violet-400 hover:text-violet-300">Edit</button>
                                                    <button onClick={() => handleDeleteProject2(item)} className="text-red-400 hover:text-red-300">Delete</button>
                                                </div>
                                            </div>
                                            {item.description && <p className="text-gray-400 text-sm mb-2 line-clamp-2">{item.description}</p>}
                                            {item.technologies?.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {item.technologies.slice(0, 4).map((tech, i) => (
                                                        <span key={i} className="px-2 py-0.5 text-xs bg-white/10 text-gray-300 rounded-full">{tech}</span>
                                                    ))}
                                                    {item.technologies.length > 4 && (
                                                        <span className="px-2 py-0.5 text-xs text-gray-500">+{item.technologies.length - 4}</span>
                                                    )}
                                                </div>
                                            )}
                                            <div className="flex gap-3 text-sm">
                                                {item.url && <a href={item.url} target="_blank" className="text-blue-400 hover:text-blue-300">Live</a>}
                                                {item.github_url && <a href={item.github_url} target="_blank" className="text-gray-400 hover:text-white">Source</a>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </SectionCard>
                    )}

                    {/* Testimonials Tab */}
                    {activeTab === 'testimonials' && (
                        <SectionCard
                            title="Testimonials"
                            subtitle="Reviews from clients and colleagues"
                            iconBg="from-yellow-500 to-orange-600"
                            icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
                            actions={
                                <button
                                    onClick={() => { setEditingItem(null); setTestimonialForm({ client_name: '', client_title: '', client_company: '', content: '', rating: 5, project_name: '', is_visible: true }); setShowTestimonialModal(true); }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    Add
                                </button>
                            }
                        >
                            {testimonials.length === 0 ? (
                                <EmptyState message="No testimonials yet. Add reviews from your clients." />
                            ) : (
                                <div className="space-y-4">
                                    {testimonials.map((item) => (
                                        <div key={item.id} className={`p-4 rounded-xl bg-white/5 border border-white/10 ${!item.is_visible ? 'opacity-60' : ''}`}>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-white">{item.client_name}</p>
                                                    <p className="text-sm text-gray-400">{item.client_title}{item.client_company && ` at ${item.client_company}`}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => { setEditingItem(item); setTestimonialForm(item); setShowTestimonialModal(true); }} className="text-violet-400 hover:text-violet-300">Edit</button>
                                                    <button onClick={() => handleDeleteTestimonial(item)} className="text-red-400 hover:text-red-300">Delete</button>
                                                </div>
                                            </div>
                                            <p className="text-gray-300 mt-2 text-sm">{item.content}</p>
                                            {item.rating && (
                                                <div className="flex gap-1 mt-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className={`w-4 h-4 ${i < item.rating ? 'text-yellow-500' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </SectionCard>
                    )}

                    {/* Services Tab */}
                    {activeTab === 'services' && (
                        <SectionCard
                            title="Services"
                            subtitle="What you offer to clients"
                            iconBg="from-purple-500 to-pink-600"
                            icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                            actions={
                                <button
                                    onClick={() => { setEditingItem(null); setServiceForm({ title: '', description: '', icon: '', price_from: '', price_to: '', price_unit: '', features: [], is_visible: true, is_featured: false }); setShowServiceModal(true); }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    Add
                                </button>
                            }
                        >
                            {services.length === 0 ? (
                                <EmptyState message="No services yet. List what you offer to clients." />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {services.map((item) => (
                                        <div key={item.id} className={`p-4 rounded-xl bg-white/5 border border-white/10 ${!item.is_visible ? 'opacity-60' : ''}`}>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-white">{item.title}</p>
                                                    {item.price_from && <p className="text-sm text-green-400">${item.price_from}{item.price_to && ` - $${item.price_to}`}{item.price_unit && `/${item.price_unit}`}</p>}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => { setEditingItem(item); setServiceForm(item); setShowServiceModal(true); }} className="text-violet-400 hover:text-violet-300">Edit</button>
                                                    <button onClick={() => handleDeleteService(item)} className="text-red-400 hover:text-red-300">Delete</button>
                                                </div>
                                            </div>
                                            {item.description && <p className="text-gray-400 mt-2 text-sm">{item.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </SectionCard>
                    )}

                    {/* Certifications Tab */}
                    {activeTab === 'certifications' && (
                        <SectionCard
                            title="Certifications"
                            subtitle="Professional certifications and credentials"
                            iconBg="from-cyan-500 to-blue-600"
                            icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
                            actions={
                                <button
                                    onClick={() => { setEditingItem(null); setCertificationForm({ name: '', issuer: '', credential_id: '', credential_url: '', issue_date: '', expiry_date: '', does_not_expire: false, is_visible: true }); setShowCertificationModal(true); }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    Add
                                </button>
                            }
                        >
                            {certifications.length === 0 ? (
                                <EmptyState message="No certifications yet. Add your professional credentials." />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {certifications.map((item) => (
                                        <div key={item.id} className={`p-4 rounded-xl bg-white/5 border border-white/10 ${!item.is_visible ? 'opacity-60' : ''}`}>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-white">{item.name}</p>
                                                    <p className="text-sm text-gray-400">{item.issuer}</p>
                                                    {item.issue_date && <p className="text-xs text-gray-500">Issued: {item.issue_date}</p>}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => { setEditingItem(item); setCertificationForm(item); setShowCertificationModal(true); }} className="text-violet-400 hover:text-violet-300">Edit</button>
                                                    <button onClick={() => handleDeleteCertification(item)} className="text-red-400 hover:text-red-300">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </SectionCard>
                    )}

                    {/* Awards Tab */}
                    {activeTab === 'awards' && (
                        <SectionCard
                            title="Awards & Achievements"
                            subtitle="Recognition and accomplishments"
                            iconBg="from-amber-500 to-yellow-600"
                            icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
                            actions={
                                <button
                                    onClick={() => { setEditingItem(null); setAwardForm({ title: '', issuer: '', description: '', date: '', url: '', is_visible: true }); setShowAwardModal(true); }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    Add
                                </button>
                            }
                        >
                            {awards.length === 0 ? (
                                <EmptyState message="No awards yet. Add your achievements and recognition." />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {awards.map((item) => (
                                        <div key={item.id} className={`p-4 rounded-xl bg-white/5 border border-white/10 ${!item.is_visible ? 'opacity-60' : ''}`}>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-white">{item.title}</p>
                                                    {item.issuer && <p className="text-sm text-gray-400">{item.issuer}</p>}
                                                    {item.date && <p className="text-xs text-gray-500">{item.date}</p>}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => { setEditingItem(item); setAwardForm(item); setShowAwardModal(true); }} className="text-violet-400 hover:text-violet-300">Edit</button>
                                                    <button onClick={() => handleDeleteAward(item)} className="text-red-400 hover:text-red-300">Delete</button>
                                                </div>
                                            </div>
                                            {item.description && <p className="text-gray-400 mt-2 text-sm">{item.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </SectionCard>
                    )}

                    {/* Clients Tab */}
                    {activeTab === 'clients' && (
                        <SectionCard
                            title="Clients"
                            subtitle="Companies you've worked with"
                            iconBg="from-slate-500 to-gray-600"
                            icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                            actions={
                                <button
                                    onClick={() => setShowClientLogoModal(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    Add
                                </button>
                            }
                        >
                            {clientLogos.length === 0 ? (
                                <EmptyState message="No client logos yet. Add companies you've worked with." />
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {clientLogos.map((item) => {
                                        const logoSrc = item.logo_url || (item.logo ? `/storage/${item.logo}` : null);
                                        return (
                                            <div key={item.id} className={`p-4 rounded-xl bg-white/5 border border-white/10 text-center ${!item.is_visible ? 'opacity-60' : ''}`}>
                                                {logoSrc ? (
                                                    <img src={logoSrc} alt={item.name} className="h-12 mx-auto object-contain mb-2" />
                                                ) : (
                                                    <div className="h-12 mx-auto flex items-center justify-center text-gray-500 mb-2">
                                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                    </div>
                                                )}
                                                <p className="text-sm text-white truncate">{item.name}</p>
                                                {item.logo_url && <p className="text-xs text-gray-500 truncate">External URL</p>}
                                                <div className="flex justify-center gap-2 mt-2">
                                                    <button onClick={() => { if (confirm('Delete this client logo?')) { router.delete(route('portfolio.client-logos.destroy', item.id), { preserveScroll: true }); }}} className="text-xs text-red-400 hover:text-red-300">Delete</button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </SectionCard>
                    )}

                    {/* Languages Tab */}
                    {activeTab === 'languages' && (
                        <SectionCard
                            title="Languages"
                            subtitle="Languages you speak"
                            iconBg="from-indigo-500 to-purple-600"
                            icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>}
                            actions={
                                <button
                                    onClick={() => { setEditingItem(null); setLanguageForm({ language: '', proficiency: 'intermediate', is_visible: true }); setShowLanguageModal(true); }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    Add
                                </button>
                            }
                        >
                            {languages.length === 0 ? (
                                <EmptyState message="No languages added yet. Add the languages you speak." />
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {languages.map((item) => (
                                        <div key={item.id} className={`p-4 rounded-xl bg-white/5 border border-white/10 ${!item.is_visible ? 'opacity-60' : ''}`}>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold text-white">{item.language}</p>
                                                    <p className="text-sm text-gray-400 capitalize">{item.proficiency}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => { setEditingItem(item); setLanguageForm(item); setShowLanguageModal(true); }} className="text-violet-400 hover:text-violet-300">Edit</button>
                                                    <button onClick={() => handleDeleteLanguage(item)} className="text-red-400 hover:text-red-300">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </SectionCard>
                    )}
                </div>
            </div>

            {/* Project Modal */}
            <Modal isOpen={showProjectModal} onClose={() => setShowProjectModal(false)} title={editingItem ? 'Edit Project' : 'Add Project'}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Project Title *</label>
                        <input type="text" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="My Awesome Project" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Description</label>
                        <textarea value={projectForm.description || ''} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="A brief description of your project..." />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Category</label>
                        <input type="text" value={projectForm.category || ''} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="Web App, Mobile App, Design, etc." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Live URL</label>
                            <input type="url" value={projectForm.url || ''} onChange={(e) => setProjectForm({ ...projectForm, url: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="https://..." />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">GitHub URL</label>
                            <input type="url" value={projectForm.github_url || ''} onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="https://github.com/..." />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Technologies (comma separated)</label>
                        <input type="text" value={(projectForm.technologies || []).join(', ')} onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t) })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="React, Node.js, PostgreSQL" />
                    </div>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={projectForm.is_featured} onChange={(e) => setProjectForm({ ...projectForm, is_featured: e.target.checked })} className="rounded bg-white/5 border-white/10 text-violet-600" />
                            <span className="text-sm text-gray-400">Featured project</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={projectForm.is_visible} onChange={(e) => setProjectForm({ ...projectForm, is_visible: e.target.checked })} className="rounded bg-white/5 border-white/10 text-violet-600" />
                            <span className="text-sm text-gray-400">Visible</span>
                        </label>
                    </div>
                    <button onClick={handleSaveProject} className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl">
                        {editingItem ? 'Update' : 'Add'} Project
                    </button>
                </div>
            </Modal>

            {/* Testimonial Modal */}
            <Modal isOpen={showTestimonialModal} onClose={() => setShowTestimonialModal(false)} title={editingItem ? 'Edit Testimonial' : 'Add Testimonial'}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Client Name *</label>
                        <input type="text" value={testimonialForm.client_name} onChange={(e) => setTestimonialForm({ ...testimonialForm, client_name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Title</label>
                            <input type="text" value={testimonialForm.client_title || ''} onChange={(e) => setTestimonialForm({ ...testimonialForm, client_title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Company</label>
                            <input type="text" value={testimonialForm.client_company || ''} onChange={(e) => setTestimonialForm({ ...testimonialForm, client_company: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Testimonial *</label>
                        <textarea value={testimonialForm.content} onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Rating</label>
                        <div className="flex gap-1">
                            {[1,2,3,4,5].map(n => (
                                <button key={n} type="button" onClick={() => setTestimonialForm({ ...testimonialForm, rating: n })} className={`p-1 ${testimonialForm.rating >= n ? 'text-yellow-500' : 'text-gray-600'}`}>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={handleSaveTestimonial} className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl">
                        {editingItem ? 'Update' : 'Add'} Testimonial
                    </button>
                </div>
            </Modal>

            {/* Service Modal */}
            <Modal isOpen={showServiceModal} onClose={() => setShowServiceModal(false)} title={editingItem ? 'Edit Service' : 'Add Service'}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Service Title *</label>
                        <input type="text" value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Description</label>
                        <textarea value={serviceForm.description || ''} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Price From</label>
                            <input type="number" value={serviceForm.price_from || ''} onChange={(e) => setServiceForm({ ...serviceForm, price_from: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Price To</label>
                            <input type="number" value={serviceForm.price_to || ''} onChange={(e) => setServiceForm({ ...serviceForm, price_to: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Unit</label>
                            <input type="text" placeholder="hour, project" value={serviceForm.price_unit || ''} onChange={(e) => setServiceForm({ ...serviceForm, price_unit: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                        </div>
                    </div>
                    <button onClick={handleSaveService} className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl">
                        {editingItem ? 'Update' : 'Add'} Service
                    </button>
                </div>
            </Modal>

            {/* Certification Modal */}
            <Modal isOpen={showCertificationModal} onClose={() => setShowCertificationModal(false)} title={editingItem ? 'Edit Certification' : 'Add Certification'}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Certification Name *</label>
                        <input type="text" value={certificationForm.name} onChange={(e) => setCertificationForm({ ...certificationForm, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Issuing Organization *</label>
                        <input type="text" value={certificationForm.issuer} onChange={(e) => setCertificationForm({ ...certificationForm, issuer: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Credential ID</label>
                            <input type="text" value={certificationForm.credential_id || ''} onChange={(e) => setCertificationForm({ ...certificationForm, credential_id: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Credential URL</label>
                            <input type="url" value={certificationForm.credential_url || ''} onChange={(e) => setCertificationForm({ ...certificationForm, credential_url: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Issue Date</label>
                            <input type="date" value={certificationForm.issue_date || ''} onChange={(e) => setCertificationForm({ ...certificationForm, issue_date: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Expiry Date</label>
                            <input type="date" value={certificationForm.expiry_date || ''} onChange={(e) => setCertificationForm({ ...certificationForm, expiry_date: e.target.value })} disabled={certificationForm.does_not_expire} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white disabled:opacity-50" />
                        </div>
                    </div>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" checked={certificationForm.does_not_expire} onChange={(e) => setCertificationForm({ ...certificationForm, does_not_expire: e.target.checked })} className="rounded bg-white/5 border-white/10" />
                        <span className="text-sm text-gray-400">Does not expire</span>
                    </label>
                    <button onClick={handleSaveCertification} className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl">
                        {editingItem ? 'Update' : 'Add'} Certification
                    </button>
                </div>
            </Modal>

            {/* Award Modal */}
            <Modal isOpen={showAwardModal} onClose={() => setShowAwardModal(false)} title={editingItem ? 'Edit Award' : 'Add Award'}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Award Title *</label>
                        <input type="text" value={awardForm.title} onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Issuer/Organization</label>
                        <input type="text" value={awardForm.issuer || ''} onChange={(e) => setAwardForm({ ...awardForm, issuer: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Description</label>
                        <textarea value={awardForm.description || ''} onChange={(e) => setAwardForm({ ...awardForm, description: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Date</label>
                            <input type="date" value={awardForm.date || ''} onChange={(e) => setAwardForm({ ...awardForm, date: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">URL</label>
                            <input type="url" value={awardForm.url || ''} onChange={(e) => setAwardForm({ ...awardForm, url: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                        </div>
                    </div>
                    <button onClick={handleSaveAward} className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl">
                        {editingItem ? 'Update' : 'Add'} Award
                    </button>
                </div>
            </Modal>

            {/* Client Logo Modal */}
            <Modal isOpen={showClientLogoModal} onClose={() => { setShowClientLogoModal(false); setClientLogoForm({ name: '', logo: null, logo_url: '', url: '', is_visible: true }); }} title="Add Client Logo">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Company Name *</label>
                        <input
                            type="text"
                            value={clientLogoForm.name}
                            onChange={(e) => setClientLogoForm({ ...clientLogoForm, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white"
                            placeholder="Company Name"
                        />
                    </div>

                    {/* Image Input with Upload/URL toggle */}
                    <ImageInput
                        label="Logo Image *"
                        uploadValue={null}
                        urlValue={clientLogoForm.logo_url}
                        onUpload={(file) => setClientLogoForm({ ...clientLogoForm, logo: file, logo_url: '' })}
                        onUrlChange={(url) => setClientLogoForm({ ...clientLogoForm, logo_url: url, logo: null })}
                        onClear={() => setClientLogoForm({ ...clientLogoForm, logo: null, logo_url: '' })}
                        maxSize={2}
                        previewClassName="w-24 h-24"
                        aspectRatio="1:1"
                    />
                    {clientLogoForm.logo && (
                        <div className="flex items-center gap-2 text-sm text-green-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            File selected: {clientLogoForm.logo.name}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Website URL (optional)</label>
                        <input
                            type="url"
                            value={clientLogoForm.url}
                            onChange={(e) => setClientLogoForm({ ...clientLogoForm, url: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white"
                            placeholder="https://company-website.com"
                        />
                    </div>

                    <button
                        onClick={handleSaveClientLogo}
                        disabled={!clientLogoForm.name || (!clientLogoForm.logo && !clientLogoForm.logo_url)}
                        className="w-full py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl"
                    >
                        Add Client
                    </button>
                </div>
            </Modal>

            {/* Language Modal */}
            <Modal isOpen={showLanguageModal} onClose={() => setShowLanguageModal(false)} title={editingItem ? 'Edit Language' : 'Add Language'}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Language *</label>
                        <input type="text" value={languageForm.language} onChange={(e) => setLanguageForm({ ...languageForm, language: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="e.g. English, Spanish, French" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Proficiency *</label>
                        <select value={languageForm.proficiency} onChange={(e) => setLanguageForm({ ...languageForm, proficiency: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white">
                            {proficiencyOptions.map(opt => (
                                <option key={opt.value} value={opt.value} className="bg-gray-900">{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={handleSaveLanguage} className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl">
                        {editingItem ? 'Update' : 'Add'} Language
                    </button>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
