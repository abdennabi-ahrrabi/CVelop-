import { useState, useEffect } from 'react';
import { aiApi } from '@/utils/api';

export default function PersonalInfoForm({ resume, onUpdate, onNext, showNextButton = true }) {
    const [formData, setFormData] = useState({
        full_name: resume?.personal_info?.full_name || '',
        email: resume?.personal_info?.email || '',
        phone: resume?.personal_info?.phone || '',
        address: resume?.personal_info?.address || '',
        summary: resume?.personal_info?.summary || '',
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [enhancing, setEnhancing] = useState(false);
    const [rateLimit, setRateLimit] = useState(null);
    const [showAiSuggestion, setShowAiSuggestion] = useState(false);
    const [aiSuggestion, setAiSuggestion] = useState('');

    useEffect(() => {
        fetchRateLimit();
    }, []);

    const fetchRateLimit = async () => {
        try {
            const response = await aiApi.getRateLimit();
            setRateLimit(response.data.data);
        } catch (error) {
            console.error('Failed to fetch rate limit:', error);
        }
    };

    const handleAIEnhance = async () => {
        if (!formData.summary.trim()) {
            alert('Please enter a summary first');
            return;
        }

        if (rateLimit && rateLimit.remaining_requests <= 0) {
            alert('You have reached your AI enhancement limit. Please try again later.');
            return;
        }

        setEnhancing(true);
        setShowAiSuggestion(false);

        try {
            const response = await aiApi.enhance(formData.summary);
            if (response.data.success) {
                setAiSuggestion(response.data.data.enhanced);
                setShowAiSuggestion(true);
                await fetchRateLimit();
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to enhance text. Please try again.';
            alert(message);
        } finally {
            setEnhancing(false);
        }
    };

    const applyAiSuggestion = () => {
        setFormData({ ...formData, summary: aiSuggestion });
        setShowAiSuggestion(false);
        setAiSuggestion('');
        setSaved(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSaved(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        try {
            await onUpdate({ personal_info: formData });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Personal Information</h3>
                            <p className="text-sm text-gray-400">Tell us about yourself</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.full_name && <p className="mt-1 text-sm text-red-400">{errors.full_name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                            {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    placeholder="San Francisco, CA"
                                />
                            </div>
                            {errors.address && <p className="mt-1 text-sm text-red-400">{errors.address}</p>}
                        </div>
                    </div>

                    {/* Summary */}
                    <div>
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Professional Summary *</label>
                                <p className="text-xs text-gray-500 mt-1">Brief overview of your background and goals</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {rateLimit && (
                                    <span className="text-xs text-gray-500">{rateLimit.remaining_requests}/{rateLimit.max_requests} AI</span>
                                )}
                                <button
                                    type="button"
                                    onClick={handleAIEnhance}
                                    disabled={enhancing || !formData.summary.trim() || (rateLimit && rateLimit.remaining_requests <= 0)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {enhancing ? (
                                        <>
                                            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Enhancing...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            AI Enhance
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        <textarea
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                            placeholder="Experienced software engineer with 5+ years in full-stack development..."
                        ></textarea>
                        <div className="mt-1 flex items-center justify-between">
                            {errors.summary && <p className="text-sm text-red-400">{errors.summary}</p>}
                            <span className="text-xs text-gray-500 ml-auto">{formData.summary.length} chars</span>
                        </div>

                        {/* AI Suggestion */}
                        {showAiSuggestion && (
                            <div className="mt-4 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-violet-300 mb-1">AI Enhanced Version</h4>
                                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{aiSuggestion}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowAiSuggestion(false)}
                                        className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        type="button"
                                        onClick={applyAiSuggestion}
                                        className="px-4 py-1.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors"
                                    >
                                        Use This
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            {saved && (
                                <div className="flex items-center gap-2 text-emerald-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm font-medium">Saved!</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10 disabled:opacity-50"
                            >
                                {saving ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Save
                                    </>
                                )}
                            </button>
                            {showNextButton && onNext && (
                                <button
                                    type="button"
                                    disabled={saving}
                                    onClick={async () => {
                                        setSaving(true);
                                        try {
                                            await onUpdate({ personal_info: formData });
                                            setSaved(true);
                                            onNext();
                                        } catch (error) {
                                            if (error.response?.data?.errors) {
                                                setErrors(error.response.data.errors);
                                            }
                                        } finally {
                                            setSaving(false);
                                        }
                                    }}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
                                >
                                    Save & Continue
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
