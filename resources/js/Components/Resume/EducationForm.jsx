import { useState, useEffect } from 'react';
import { educationApi, aiApi } from '@/utils/api';

export default function EducationForm({ resumeId, educations = [], onUpdate }) {
    const [items, setItems] = useState(educations);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        institution: '',
        degree: '',
        field: '',
        start_date: '',
        end_date: '',
        is_current: false,
        description: '',
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
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
        if (!formData.description.trim()) return;
        if (rateLimit && rateLimit.remaining_requests <= 0) {
            alert('AI limit reached. Try again later.');
            return;
        }

        setEnhancing(true);
        setShowAiSuggestion(false);

        try {
            const response = await aiApi.enhance(formData.description);
            if (response.data.success) {
                setAiSuggestion(response.data.data.enhanced);
                setShowAiSuggestion(true);
                await fetchRateLimit();
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to enhance text.');
        } finally {
            setEnhancing(false);
        }
    };

    const applyAiSuggestion = () => {
        setFormData({ ...formData, description: aiSuggestion });
        setShowAiSuggestion(false);
        setAiSuggestion('');
    };

    const resetForm = () => {
        setFormData({
            institution: '', degree: '', field: '', start_date: '', end_date: '', is_current: false, description: '',
        });
        setEditingId(null);
        setErrors({});
        setShowAiSuggestion(false);
        setAiSuggestion('');
    };

    const handleEdit = (edu) => {
        setFormData({
            institution: edu.institution, degree: edu.degree, field: edu.field,
            start_date: edu.start_date, end_date: edu.end_date || '',
            is_current: edu.is_current, description: edu.description || '',
        });
        setEditingId(edu.id);
        setShowAiSuggestion(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        try {
            if (editingId) {
                const response = await educationApi.update(resumeId, editingId, formData);
                setItems(items.map(item => item.id === editingId ? response.data.data : item));
            } else {
                const response = await educationApi.create(resumeId, formData);
                setItems([...items, response.data.data]);
            }
            resetForm();
            if (onUpdate) onUpdate();
        } catch (error) {
            if (error.response?.data?.errors) setErrors(error.response.data.errors);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this education entry?')) return;
        try {
            await educationApi.delete(resumeId, id);
            setItems(items.filter(item => item.id !== id));
            if (onUpdate) onUpdate();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    return (
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600/20 to-green-600/20 border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Education</h3>
                        <p className="text-sm text-gray-400">Add your educational background</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Existing Education */}
                {items.length > 0 && (
                    <div className="space-y-3">
                        {items.map((edu) => (
                            <div key={edu.id} className="rounded-xl bg-white/5 border border-white/10 p-4 hover:border-emerald-500/50 transition-all">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white">{edu.degree} in {edu.field}</h4>
                                        <p className="text-sm text-emerald-400">{edu.institution}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {edu.start_date} - {edu.is_current ? 'Present' : edu.end_date}
                                        </p>
                                        {edu.description && <p className="mt-2 text-sm text-gray-400">{edu.description}</p>}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button onClick={() => handleEdit(edu)} className="px-3 py-1 text-xs font-medium text-violet-400 hover:text-violet-300 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 transition-colors">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(edu.id)} className="px-3 py-1 text-xs font-medium text-red-400 hover:text-red-300 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add/Edit Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Institution</label>
                            <input
                                type="text"
                                value={formData.institution}
                                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                placeholder="University name"
                                required
                            />
                            {errors.institution && <p className="mt-1 text-sm text-red-400">{errors.institution}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Degree</label>
                            <input
                                type="text"
                                value={formData.degree}
                                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                placeholder="e.g., Bachelor's, Master's"
                                required
                            />
                            {errors.degree && <p className="mt-1 text-sm text-red-400">{errors.degree}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Field of Study</label>
                            <input
                                type="text"
                                value={formData.field}
                                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                placeholder="e.g., Computer Science"
                                required
                            />
                            {errors.field && <p className="mt-1 text-sm text-red-400">{errors.field}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                            <input
                                type="date"
                                value={formData.start_date}
                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                required
                            />
                            {errors.start_date && <p className="mt-1 text-sm text-red-400">{errors.start_date}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                            <input
                                type="date"
                                value={formData.end_date}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
                                disabled={formData.is_current}
                            />
                            {errors.end_date && <p className="mt-1 text-sm text-red-400">{errors.end_date}</p>}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_current_edu"
                                checked={formData.is_current}
                                onChange={(e) => setFormData({ ...formData, is_current: e.target.checked, end_date: '' })}
                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500"
                            />
                            <label htmlFor="is_current_edu" className="ml-2 text-sm text-gray-400">Currently studying here</label>
                        </div>
                    </div>

                    {/* Description with AI */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-300">Description (Optional)</label>
                            <div className="flex items-center gap-2">
                                {rateLimit && <span className="text-xs text-gray-500">{rateLimit.remaining_requests}/{rateLimit.max_requests} AI</span>}
                                <button
                                    type="button"
                                    onClick={handleAIEnhance}
                                    disabled={enhancing || !formData.description.trim() || (rateLimit && rateLimit.remaining_requests <= 0)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {enhancing ? 'Enhancing...' : 'AI Enhance'}
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows="3"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                            placeholder="Describe achievements, coursework..."
                        ></textarea>

                        {showAiSuggestion && (
                            <div className="mt-3 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                                <h4 className="text-sm font-semibold text-violet-300 mb-2">AI Enhanced</h4>
                                <p className="text-sm text-gray-300 whitespace-pre-wrap">{aiSuggestion}</p>
                                <div className="flex gap-2 justify-end mt-3">
                                    <button type="button" onClick={() => setShowAiSuggestion(false)} className="px-3 py-1.5 text-sm text-gray-400 hover:text-white">Dismiss</button>
                                    <button type="button" onClick={applyAiSuggestion} className="px-4 py-1.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg">Use This</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 justify-end">
                        {editingId && (
                            <button type="button" onClick={resetForm} className="px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-colors">
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : `${editingId ? 'Update' : 'Add'} Education`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
