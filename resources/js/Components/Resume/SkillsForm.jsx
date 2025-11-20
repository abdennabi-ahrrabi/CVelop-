import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { skillApi } from '@/utils/api';

export default function SkillsForm({ resumeId, skills = [], onUpdate }) {
    const [items, setItems] = useState(skills);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        proficiency_level: 'intermediate',
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const proficiencyLevels = [
        { value: 'beginner', label: 'Beginner', color: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
        { value: 'intermediate', label: 'Intermediate', color: 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
        { value: 'advanced', label: 'Advanced', color: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300' },
        { value: 'expert', label: 'Expert', color: 'bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
    ];

    const resetForm = () => {
        setFormData({
            name: '',
            proficiency_level: 'intermediate',
        });
        setEditingId(null);
        setErrors({});
    };

    const handleEdit = (skill) => {
        setFormData({
            name: skill.name,
            proficiency_level: skill.proficiency_level,
        });
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
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Skills
                    </h3>

                    {/* List of existing skills */}
                    {items.length > 0 && (
                        <div className="mb-6">
                            <div className="flex flex-wrap gap-3">
                                {items.map((skill) => (
                                    <div
                                        key={skill.id}
                                        className="group relative inline-flex items-center gap-2 rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                                    >
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            {skill.name}
                                        </span>
                                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getProficiencyColor(skill.proficiency_level)}`}>
                                            {skill.proficiency_level}
                                        </span>
                                        <div className="hidden group-hover:flex absolute -top-2 -right-2 gap-1">
                                            <button
                                                onClick={() => handleEdit(skill)}
                                                className="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500"
                                                title="Edit"
                                            >
                                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(skill.id)}
                                                className="rounded-full bg-red-600 p-1 text-white shadow-sm hover:bg-red-500"
                                                title="Delete"
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

                    {/* Add/Edit form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="name" value="Skill Name" />
                                <TextInput
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1 block w-full"
                                    placeholder="e.g., JavaScript, Project Management"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="proficiency_level" value="Proficiency Level" />
                                <select
                                    id="proficiency_level"
                                    value={formData.proficiency_level}
                                    onChange={(e) => setFormData({ ...formData, proficiency_level: e.target.value })}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                    required
                                >
                                    {proficiencyLevels.map(level => (
                                        <option key={level.value} value={level.value}>
                                            {level.label}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.proficiency_level} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex gap-2 justify-end">
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            )}
                            <PrimaryButton disabled={saving}>
                                {saving ? 'Saving...' : editingId ? 'Update' : 'Add'} Skill
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
