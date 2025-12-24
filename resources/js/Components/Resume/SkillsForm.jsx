import { useState } from 'react';
import { skillApi } from '@/utils/api';

export default function SkillsForm({ resumeId, skills = [], onUpdate, isLastStep = false, onFinish }) {
    const [items, setItems] = useState(skills);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        proficiency_level: 'intermediate',
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const proficiencyLevels = [
        { value: 'beginner', label: 'Beginner', color: 'bg-gray-500/20 text-gray-300 border-gray-500/30' },
        { value: 'intermediate', label: 'Intermediate', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
        { value: 'advanced', label: 'Advanced', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
        { value: 'expert', label: 'Expert', color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
    ];

    const resetForm = () => {
        setFormData({ name: '', proficiency_level: 'intermediate' });
        setEditingId(null);
        setErrors({});
    };

    const handleEdit = (skill) => {
        setFormData({ name: skill.name, proficiency_level: skill.proficiency_level });
        setEditingId(skill.id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        try {
            if (editingId) {
                const response = await skillApi.update(resumeId, editingId, formData);
                setItems(items.map(item => item.id === editingId ? response.data.data : item));
            } else {
                const response = await skillApi.create(resumeId, formData);
                setItems([...items, response.data.data]);
            }
            resetForm();
            if (onUpdate) onUpdate();
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;

        try {
            await skillApi.delete(resumeId, id);
            setItems(items.filter(item => item.id !== id));
            if (onUpdate) onUpdate();
        } catch (error) {
            alert('Failed to delete skill');
        }
    };

    const getProficiencyColor = (level) => {
        return proficiencyLevels.find(p => p.value === level)?.color || proficiencyLevels[0].color;
    };

    return (
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Skills</h3>
                        <p className="text-sm text-gray-400">Add your technical and soft skills</p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Existing Skills */}
                {items.length > 0 && (
                    <div className="mb-6">
                        <div className="flex flex-wrap gap-3">
                            {items.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="group relative inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all"
                                >
                                    <span className="font-medium text-white">{skill.name}</span>
                                    <span className={`inline-flex items-center rounded-lg px-2 py-0.5 text-xs font-medium border ${getProficiencyColor(skill.proficiency_level)}`}>
                                        {skill.proficiency_level}
                                    </span>
                                    <div className="hidden group-hover:flex absolute -top-2 -right-2 gap-1">
                                        <button
                                            onClick={() => handleEdit(skill)}
                                            className="rounded-full bg-violet-500 p-1.5 text-white shadow-lg hover:bg-violet-400 transition-colors"
                                        >
                                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(skill.id)}
                                            className="rounded-full bg-red-500 p-1.5 text-white shadow-lg hover:bg-red-400 transition-colors"
                                        >
                                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Add/Edit Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                placeholder="e.g., JavaScript, Project Management"
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Proficiency Level</label>
                            <select
                                value={formData.proficiency_level}
                                onChange={(e) => setFormData({ ...formData, proficiency_level: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                required
                            >
                                {proficiencyLevels.map(level => (
                                    <option key={level.value} value={level.value} className="bg-gray-900">
                                        {level.label}
                                    </option>
                                ))}
                            </select>
                            {errors.proficiency_level && <p className="mt-1 text-sm text-red-400">{errors.proficiency_level}</p>}
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    {editingId ? 'Update' : 'Add'} Skill
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Final Step - Finish Section */}
                {isLastStep && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="rounded-xl bg-gradient-to-r from-emerald-600/10 to-green-600/10 border border-emerald-500/20 p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-white mb-1">You're Almost Done!</h4>
                                    <p className="text-sm text-gray-400 mb-4">
                                        {items.length === 0
                                            ? 'Add some skills to showcase your expertise, then preview or download your resume.'
                                            : `Great! You've added ${items.length} skill${items.length > 1 ? 's' : ''}. Preview your resume to see how it looks.`
                                        }
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {onFinish && (
                                            <button
                                                type="button"
                                                onClick={onFinish}
                                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                Preview Resume
                                            </button>
                                        )}
                                        <a
                                            href={`/resumes/${resumeId}/pdf/download`}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold rounded-xl transition-all shadow-lg"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Download PDF
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
