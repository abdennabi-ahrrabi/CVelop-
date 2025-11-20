import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { educationApi } from '@/utils/api';

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

    const resetForm = () => {
        setFormData({
            institution: '',
            degree: '',
            field: '',
            start_date: '',
            end_date: '',
            is_current: false,
            description: '',
        });
        setEditingId(null);
        setErrors({});
    };

    const handleEdit = (education) => {
        setFormData({
            institution: education.institution,
            degree: education.degree,
            field: education.field,
            start_date: education.start_date,
            end_date: education.end_date || '',
            is_current: education.is_current,
            description: education.description || '',
        });
        setEditingId(education.id);
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
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this education entry?')) return;

        try {
            await educationApi.delete(resumeId, id);
            setItems(items.filter(item => item.id !== id));
            if (onUpdate) onUpdate();
        } catch (error) {
            alert('Failed to delete education entry');
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Education
                    </h3>

                    {/* List of existing education entries */}
                    {items.length > 0 && (
                        <div className="mb-6 space-y-4">
                            {items.map((edu) => (
                                <div
                                    key={edu.id}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                                {edu.degree} in {edu.field}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {edu.institution}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                {edu.start_date} - {edu.is_current ? 'Present' : edu.end_date}
                                            </p>
                                            {edu.description && (
                                                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                                    {edu.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => handleEdit(edu)}
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(edu.id)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add/Edit form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="institution" value="Institution" />
                                <TextInput
                                    id="institution"
                                    value={formData.institution}
                                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.institution} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="degree" value="Degree" />
                                <TextInput
                                    id="degree"
                                    value={formData.degree}
                                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.degree} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="field" value="Field of Study" />
                                <TextInput
                                    id="field"
                                    value={formData.field}
                                    onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.field} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="start_date" value="Start Date" />
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.start_date} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="end_date" value="End Date" />
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    value={formData.end_date}
                                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                    className="mt-1 block w-full"
                                    disabled={formData.is_current}
                                />
                                <InputError message={errors.end_date} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="is_current"
                                type="checkbox"
                                checked={formData.is_current}
                                onChange={(e) => setFormData({ ...formData, is_current: e.target.checked, end_date: '' })}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
                            />
                            <label htmlFor="is_current" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                I currently study here
                            </label>
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Description (Optional)" />
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows="3"
                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                            ></textarea>
                            <InputError message={errors.description} className="mt-2" />
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
                                {saving ? 'Saving...' : editingId ? 'Update' : 'Add'} Education
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
