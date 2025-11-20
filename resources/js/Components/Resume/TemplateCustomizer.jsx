import { useState, useEffect } from 'react';
import { customizationApi } from '@/utils/api';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import ResumePreview from './ResumePreview';

export default function TemplateCustomizer({ resumeId, resume, onClose, onUpdate }) {
    const [customization, setCustomization] = useState(null);
    const [presets, setPresets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('colors');
    const [hasChanges, setHasChanges] = useState(false);
    const [zoom, setZoom] = useState(50);
    const [showPreview, setShowPreview] = useState(true);

    // Get the correct template slug from resume
    const templateSlug = resume?.template?.slug || 'executive';

    console.log('Template Slug:', templateSlug, 'Resume:', resume);

    useEffect(() => {
        fetchCustomization();
        fetchPresets();
    }, [resumeId]);

    const fetchCustomization = async () => {
        try {
            setLoading(true);
            const response = await customizationApi.get(resumeId);
            setCustomization(response.data.data);
        } catch (error) {
            console.error('Error fetching customization:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPresets = async () => {
        try {
            const response = await customizationApi.getPresets();
            setPresets(response.data.data);
        } catch (error) {
            console.error('Error fetching presets:', error);
        }
    };

    const handleChange = (field, value) => {
        setCustomization(prev => ({
            ...prev,
            [field]: value,
        }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await customizationApi.update(resumeId, customization);
            setHasChanges(false);
            if (onUpdate) onUpdate();
            alert('Customization saved successfully!');
        } catch (error) {
            console.error('Error saving customization:', error);
            alert('Failed to save customization');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = async () => {
        if (!confirm('Are you sure you want to reset to default settings?')) return;

        try {
            setSaving(true);
            await customizationApi.reset(resumeId);
            await fetchCustomization();
            setHasChanges(false);
            if (onUpdate) onUpdate();
            alert('Reset to defaults successfully!');
        } catch (error) {
            console.error('Error resetting customization:', error);
            alert('Failed to reset customization');
        } finally {
            setSaving(false);
        }
    };

    const applyPreset = async (presetId) => {
        if (!confirm(`Apply "${presetId.replace(/_/g, ' ')}" preset?`)) return;

        try {
            setSaving(true);
            await customizationApi.applyPreset(resumeId, presetId);
            await fetchCustomization();
            setHasChanges(false);
            if (onUpdate) onUpdate();
            alert('Preset applied successfully!');
        } catch (error) {
            console.error('Error applying preset:', error);
            alert('Failed to apply preset');
        } finally {
            setSaving(false);
        }
    };

    const fonts = [
        'DejaVu Serif',
        'DejaVu Sans',
        'DejaVu Sans Mono',
        'Helvetica',
        'Times',
        'Courier',
    ];

    const tabs = [
        { id: 'colors', label: 'Colors', icon: '🎨' },
        { id: 'typography', label: 'Typography', icon: '📝' },
        { id: 'spacing', label: 'Spacing', icon: '📏' },
        { id: 'layout', label: 'Layout', icon: '📐' },
        { id: 'sections', label: 'Sections', icon: '👁️' },
        { id: 'presets', label: 'Presets', icon: '⚡' },
    ];

    if (loading || !customization) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading customization...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-[95vw] max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Template Customizer</h2>
                        <p className="text-indigo-100 text-sm mt-1">Personalize your resume template</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {showPreview ? 'Hide' : 'Show'} Preview
                    </button>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Tabs */}
                <div className="w-48 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto flex-shrink-0">
                    <nav className="p-4 space-y-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                                    activeTab === tab.id
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                                }`}
                            >
                                <span className="text-xl">{tab.icon}</span>
                                <span className="text-sm">{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-6" style={{ maxWidth: showPreview ? '40%' : '100%' }}>
                    {/* Colors Tab */}
                    {activeTab === 'colors' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Color Customization</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <ColorPicker
                                        label="Primary Color"
                                        value={customization.primary_color}
                                        onChange={(value) => handleChange('primary_color', value)}
                                        description="Main accent color for headings and highlights"
                                    />
                                    <ColorPicker
                                        label="Secondary Color"
                                        value={customization.secondary_color}
                                        onChange={(value) => handleChange('secondary_color', value)}
                                        description="Secondary accent color"
                                    />
                                    <ColorPicker
                                        label="Accent Color"
                                        value={customization.accent_color}
                                        onChange={(value) => handleChange('accent_color', value)}
                                        description="Additional accent color"
                                    />
                                    <ColorPicker
                                        label="Text Color"
                                        value={customization.text_color}
                                        onChange={(value) => handleChange('text_color', value)}
                                        description="Main text color"
                                    />
                                    <ColorPicker
                                        label="Background Color"
                                        value={customization.background_color}
                                        onChange={(value) => handleChange('background_color', value)}
                                        description="Page background color"
                                    />
                                    <ColorPicker
                                        label="Sidebar Background"
                                        value={customization.sidebar_bg_color || customization.accent_color}
                                        onChange={(value) => handleChange('sidebar_bg_color', value)}
                                        description="Sidebar background color (two-column layouts)"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Typography Tab */}
                    {activeTab === 'typography' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Typography Settings</h3>
                            <div className="space-y-6">
                                <div>
                                    <InputLabel value="Font Family" />
                                    <select
                                        value={customization.font_family}
                                        onChange={(e) => handleChange('font_family', e.target.value)}
                                        className="mt-2 block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    >
                                        {fonts.map((font) => (
                                            <option key={font} value={font}>{font}</option>
                                        ))}
                                    </select>
                                    <p className="mt-1 text-xs text-gray-500">Choose a font for your resume</p>
                                </div>

                                <SliderInput
                                    label="Font Size"
                                    value={customization.font_size}
                                    onChange={(value) => handleChange('font_size', value)}
                                    min={6}
                                    max={16}
                                    unit="pt"
                                    description="Base font size for body text"
                                />

                                <SliderInput
                                    label="Line Height"
                                    value={customization.line_height}
                                    onChange={(value) => handleChange('line_height', value)}
                                    min={1.0}
                                    max={3.0}
                                    step={0.1}
                                    description="Spacing between lines of text"
                                />
                            </div>
                        </div>
                    )}

                    {/* Spacing Tab */}
                    {activeTab === 'spacing' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Spacing & Layout</h3>
                            <div className="space-y-6">
                                <SliderInput
                                    label="Page Padding"
                                    value={customization.page_padding}
                                    onChange={(value) => handleChange('page_padding', value)}
                                    min={0}
                                    max={100}
                                    unit="px"
                                    description="Padding around the entire page"
                                />

                                <SliderInput
                                    label="Section Spacing"
                                    value={customization.section_spacing}
                                    onChange={(value) => handleChange('section_spacing', value)}
                                    min={0}
                                    max={100}
                                    unit="px"
                                    description="Spacing between major sections"
                                />

                                <SliderInput
                                    label="Item Spacing"
                                    value={customization.item_spacing}
                                    onChange={(value) => handleChange('item_spacing', value)}
                                    min={0}
                                    max={100}
                                    unit="px"
                                    description="Spacing between individual items"
                                />

                                <SliderInput
                                    label="Border Radius"
                                    value={customization.border_radius}
                                    onChange={(value) => handleChange('border_radius', value)}
                                    min={0}
                                    max={20}
                                    unit="px"
                                    description="Roundness of corners"
                                />

                                <SliderInput
                                    label="Border Width"
                                    value={customization.border_width}
                                    onChange={(value) => handleChange('border_width', value)}
                                    min={0}
                                    max={10}
                                    unit="px"
                                    description="Width of decorative borders"
                                />
                            </div>
                        </div>
                    )}

                    {/* Layout Tab */}
                    {activeTab === 'layout' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Layout Configuration</h3>
                            <div className="space-y-6">
                                <div>
                                    <InputLabel value="Layout Type" />
                                    <div className="mt-3 grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => handleChange('layout_type', 'single_column')}
                                            className={`p-6 rounded-xl border-2 transition-all ${
                                                customization.layout_type === 'single_column'
                                                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400'
                                            }`}
                                        >
                                            <div className="space-y-2">
                                                <div className="w-full h-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                                <p className="font-semibold text-gray-900 dark:text-gray-100">Single Column</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Traditional layout</p>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handleChange('layout_type', 'two_column')}
                                            className={`p-6 rounded-xl border-2 transition-all ${
                                                customization.layout_type === 'two_column'
                                                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400'
                                            }`}
                                        >
                                            <div className="space-y-2">
                                                <div className="w-full h-32 flex gap-2">
                                                    <div className="w-1/3 bg-gray-700 rounded"></div>
                                                    <div className="flex-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                                </div>
                                                <p className="font-semibold text-gray-900 dark:text-gray-100">Two Column</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Modern sidebar layout</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {customization.layout_type === 'two_column' && (
                                    <SliderInput
                                        label="Sidebar Width"
                                        value={customization.sidebar_width}
                                        onChange={(value) => handleChange('sidebar_width', value)}
                                        min={20}
                                        max={50}
                                        unit="%"
                                        description="Width of the sidebar relative to page width"
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Sections Tab */}
                    {activeTab === 'sections' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Section Visibility</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Toggle sections to show or hide them in your resume
                            </p>
                            <div className="space-y-4">
                                <ToggleSwitch
                                    label="Profile Photo"
                                    checked={customization.show_photo}
                                    onChange={(checked) => handleChange('show_photo', checked)}
                                    description="Display your profile photo"
                                />
                                <ToggleSwitch
                                    label="Professional Summary"
                                    checked={customization.show_summary}
                                    onChange={(checked) => handleChange('show_summary', checked)}
                                    description="Show the summary section"
                                />
                                <ToggleSwitch
                                    label="Skills"
                                    checked={customization.show_skills}
                                    onChange={(checked) => handleChange('show_skills', checked)}
                                    description="Display skills section"
                                />
                                <ToggleSwitch
                                    label="Work Experience"
                                    checked={customization.show_experience}
                                    onChange={(checked) => handleChange('show_experience', checked)}
                                    description="Show work experience section"
                                />
                                <ToggleSwitch
                                    label="Education"
                                    checked={customization.show_education}
                                    onChange={(checked) => handleChange('show_education', checked)}
                                    description="Display education section"
                                />
                                <ToggleSwitch
                                    label="Contact Information"
                                    checked={customization.show_contact}
                                    onChange={(checked) => handleChange('show_contact', checked)}
                                    description="Show contact details"
                                />
                            </div>
                        </div>
                    )}

                    {/* Presets Tab */}
                    {activeTab === 'presets' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Quick Presets</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                    Apply professionally designed color schemes
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {presets.map((preset) => (
                                    <button
                                        key={preset.id}
                                        onClick={() => applyPreset(preset.id)}
                                        disabled={saving}
                                        className="text-left p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 transition-all hover:shadow-lg disabled:opacity-50"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <h4 className="font-bold text-gray-900 dark:text-gray-100">{preset.name}</h4>
                                            {customization.preset_theme === preset.id && (
                                                <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Active</span>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <div
                                                className="w-12 h-12 rounded-lg border-2 border-white shadow-md"
                                                style={{ backgroundColor: preset.colors.primary_color }}
                                            ></div>
                                            <div
                                                className="w-12 h-12 rounded-lg border-2 border-white shadow-md"
                                                style={{ backgroundColor: preset.colors.secondary_color }}
                                            ></div>
                                            <div
                                                className="w-12 h-12 rounded-lg border-2 border-white shadow-md"
                                                style={{ backgroundColor: preset.colors.accent_color }}
                                            ></div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Live Preview */}
                {showPreview && (
                    <div className="flex-1 bg-gray-100 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col">
                        {/* Preview Controls */}
                        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Live Preview</span>
                                    <span className="text-xs text-green-600 dark:text-green-400 ml-2 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        Live
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 capitalize">
                                        {templateSlug || 'Executive'} Template
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-600 dark:text-gray-400">Zoom:</span>
                                <button
                                    onClick={() => setZoom(Math.max(25, zoom - 10))}
                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                    disabled={zoom <= 25}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                </button>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-center">{zoom}%</span>
                                <button
                                    onClick={() => setZoom(Math.min(100, zoom + 10))}
                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                    disabled={zoom >= 100}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setZoom(50)}
                                    className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        {/* Preview Area */}
                        <div className="flex-1 overflow-auto p-6 flex justify-center items-start">
                            <ResumePreview
                                resume={resume}
                                customization={customization}
                                templateSlug={templateSlug}
                                zoom={zoom}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                    {hasChanges && (
                        <span className="text-sm text-orange-600 dark:text-orange-400 font-medium flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Unsaved changes
                        </span>
                    )}
                </div>
                <div className="flex gap-3">
                    <SecondaryButton onClick={handleReset} disabled={saving}>
                        Reset to Defaults
                    </SecondaryButton>
                    <PrimaryButton onClick={handleSave} disabled={saving || !hasChanges}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}

// Helper Components
function ColorPicker({ label, value, onChange, description }) {
    return (
        <div>
            <InputLabel value={label} />
            <div className="mt-2 flex items-center gap-3">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-12 w-20 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer"
                />
                <div className="flex-1">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 uppercase"
                        placeholder="#000000"
                    />
                    {description && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
                </div>
            </div>
        </div>
    );
}

function SliderInput({ label, value, onChange, min, max, step = 1, unit = '', description }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <InputLabel value={label} />
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {value}{unit}
                </span>
            </div>
            <input
                type="range"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                min={min}
                max={max}
                step={step}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
            />
            {description && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
    );
}

function ToggleSwitch({ label, checked, onChange, description }) {
    return (
        <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex-1">
                <label className="font-medium text-gray-900 dark:text-gray-100 cursor-pointer">
                    {label}
                </label>
                {description && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
            </div>
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
                    checked ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
            >
                <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
            </button>
        </div>
    );
}
