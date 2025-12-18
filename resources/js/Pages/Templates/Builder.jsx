import React, { useState, useEffect, useCallback } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ComponentLibrary from '@/Components/Resume/TemplateBuilder/ComponentLibrary';
import Canvas from '@/Components/Resume/TemplateBuilder/Canvas';
import PropertyPanel from '@/Components/Resume/TemplateBuilder/PropertyPanel';
import PreviewPanel from '@/Components/Resume/TemplateBuilder/PreviewPanel';
import InteractivePreview from '@/Components/Resume/TemplateBuilder/InteractivePreview';
import LayersPanel from '@/Components/Resume/TemplateBuilder/LayersPanel';
import BlocksLibrary from '@/Components/Resume/TemplateBuilder/BlocksLibrary';
import RulersAndGuides from '@/Components/Resume/TemplateBuilder/RulersAndGuides';
import { templateBuilderApi } from '@/utils/api';

const LAYOUT_PRESETS = {
    classic: {
        mode: 'single',
        sections: [
            { type: 'header', label: 'Header' },
            { type: 'summary', label: 'Summary' },
            { type: 'experience', label: 'Work Experience' },
            { type: 'education', label: 'Education' },
            { type: 'skills', label: 'Skills' }
        ]
    },
    modern: {
        mode: 'two-column',
        sections: [
            { type: 'header', label: 'Header', column: 'right' },
            { type: 'skills', label: 'Skills', column: 'left' },
            { type: 'languages', label: 'Languages', column: 'left' },
            { type: 'summary', label: 'Summary', column: 'right' },
            { type: 'experience', label: 'Work Experience', column: 'right' },
            { type: 'education', label: 'Education', column: 'right' }
        ]
    },
    creative: {
        mode: 'two-column',
        sections: [
            { type: 'header', label: 'Header', column: 'left' },
            { type: 'summary', label: 'Summary', column: 'left' },
            { type: 'skills', label: 'Skills', column: 'left' },
            { type: 'experience', label: 'Work Experience', column: 'right' },
            { type: 'education', label: 'Education', column: 'right' },
            { type: 'projects', label: 'Projects', column: 'right' }
        ]
    }
};

export default function Builder({ auth, templateId = null }) {
    const [templateName, setTemplateName] = useState('My Custom Template');
    const [templateDescription, setTemplateDescription] = useState('');
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [layoutMode, setLayoutMode] = useState('single'); // 'single' or 'two-column'
    const [colors, setColors] = useState({
        primary: '#3B82F6',
        secondary: '#64748B',
        accent: '#10B981',
    });
    const [isPublic, setIsPublic] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [previewMode, setPreviewMode] = useState('interactive'); // 'interactive' or 'canvas'

    // History for undo/redo
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // UI toggles
    const [showRulers, setShowRulers] = useState(true);
    const [showGrid, setShowGrid] = useState(false);
    const [leftSidebarTab, setLeftSidebarTab] = useState('components'); // 'components', 'blocks', 'layers'
    const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
    const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
    const [autoSaveStatus, setAutoSaveStatus] = useState(''); // '', 'saving', 'saved'
    const [lastSaved, setLastSaved] = useState(null);

    useEffect(() => {
        if (templateId) {
            loadTemplate(templateId);
        } else {
            // Check for unsaved work in localStorage
            const draftKey = 'templateBuilder_draft';
            const savedDraft = localStorage.getItem(draftKey);

            if (savedDraft) {
                try {
                    const draft = JSON.parse(savedDraft);
                    const draftTime = new Date(draft.timestamp);
                    const minutesAgo = Math.floor((Date.now() - draftTime) / 60000);

                    if (confirm(`Found unsaved work from ${minutesAgo} minutes ago. Would you like to restore it?`)) {
                        setSections(draft.sections || []);
                        setTemplateName(draft.name || 'My Custom Template');
                        setTemplateDescription(draft.description || '');
                        setLayoutMode(draft.layoutMode || 'single');
                        setLastSaved(draftTime);
                    } else {
                        localStorage.removeItem(draftKey);
                    }
                } catch (error) {
                    console.error('Error restoring draft:', error);
                    localStorage.removeItem(draftKey);
                }
            }
        }
    }, [templateId]);

    // Auto-save to localStorage every 30 seconds
    useEffect(() => {
        if (sections.length === 0 && !templateName) return;

        const draftKey = 'templateBuilder_draft';
        const autoSaveInterval = setInterval(() => {
            setAutoSaveStatus('saving');

            const draft = {
                sections,
                name: templateName,
                description: templateDescription,
                layoutMode,
                timestamp: new Date().toISOString(),
            };

            try {
                localStorage.setItem(draftKey, JSON.stringify(draft));
                setLastSaved(new Date());
                setAutoSaveStatus('saved');

                // Clear "saved" status after 2 seconds
                setTimeout(() => setAutoSaveStatus(''), 2000);
            } catch (error) {
                console.error('Auto-save failed:', error);
                setAutoSaveStatus('');
            }
        }, 30000); // 30 seconds

        return () => clearInterval(autoSaveInterval);
    }, [sections, templateName, templateDescription, layoutMode]);

    // Add to history whenever sections change
    useEffect(() => {
        if (sections.length > 0 || historyIndex === -1) {
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push(JSON.parse(JSON.stringify(sections)));
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
        }
    }, [sections]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Undo: Ctrl+Z
            if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                handleUndo();
            }
            // Redo: Ctrl+Shift+Z or Ctrl+Y
            if ((e.ctrlKey && e.shiftKey && e.key === 'z') || (e.ctrlKey && e.key === 'y')) {
                e.preventDefault();
                handleRedo();
            }
            // Delete: Delete or Backspace
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedSection && !e.target.matches('input, textarea')) {
                e.preventDefault();
                handleRemoveSection(selectedSection.id);
            }
            // Duplicate: Ctrl+D
            if (e.ctrlKey && e.key === 'd' && selectedSection) {
                e.preventDefault();
                handleDuplicateSection();
            }
            // Toggle rulers: Ctrl+R
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                setShowRulers(!showRulers);
            }
            // Toggle grid: Ctrl+G
            if (e.ctrlKey && e.key === 'g') {
                e.preventDefault();
                setShowGrid(!showGrid);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedSection, showRulers, showGrid, historyIndex, history]);

    const handleUndo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setSections(JSON.parse(JSON.stringify(history[historyIndex - 1])));
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setSections(JSON.parse(JSON.stringify(history[historyIndex + 1])));
        }
    };

    const handleDuplicateSection = (section = selectedSection) => {
        if (!section) return;

        const newSection = {
            ...section,
            id: `${section.type}-${Date.now()}`,
            order: sections.length + 1,
            config: { ...section.config }, // Deep copy config
        };

        // Insert right after the duplicated section
        const currentIndex = sections.findIndex(s => s.id === section.id);
        const newSections = [...sections];
        newSections.splice(currentIndex + 1, 0, newSection);

        // Update order for all sections
        const reorderedSections = newSections.map((s, idx) => ({
            ...s,
            order: idx + 1,
        }));

        setSections(reorderedSections);
        setSelectedSection(newSection);
    };

    const handleSectionToggleVisibility = (section) => {
        const updated = sections.map(s =>
            s.id === section.id ? { ...s, hidden: !s.hidden } : s
        );
        setSections(updated);
    };

    const handleSectionToggleLock = (section) => {
        const updated = sections.map(s =>
            s.id === section.id ? { ...s, locked: !s.locked } : s
        );
        setSections(updated);
    };

    const handleSectionRename = (section, newName) => {
        const updated = sections.map(s =>
            s.id === section.id ? {
                ...s,
                config: { ...s.config, customTitle: newName }
            } : s
        );
        setSections(updated);
    };

    const handleApplyBlock = (blockConfig, sectionType) => {
        if (!selectedSection) return;

        handleSectionUpdate({
            ...selectedSection,
            config: { ...selectedSection.config, ...blockConfig }
        });
    };

    const handleApplyColorScheme = (colors) => {
        const updated = sections.map(section => ({
            ...section,
            config: {
                ...section.config,
                textColor: colors.text,
                backgroundColor: colors.background,
            }
        }));
        setSections(updated);
    };

    const loadTemplate = async (id) => {
        try {
            const response = await templateBuilderApi.getStructure(id);
            const { template, layout_structure, component_config } = response.data.data;

            setTemplateName(template.name);
            setTemplateDescription(template.description || '');
            setColors(template.colors || colors);
            setIsPublic(template.is_public || false);

            const loadedSections = layout_structure.map((item, index) => ({
                id: `${item.type}-${Date.now()}-${index}`,
                type: item.type,
                label: item.type.charAt(0).toUpperCase() + item.type.slice(1),
                order: item.order,
                column: item.column || 'main',
                config: component_config[item.type] || {},
            }));

            setSections(loadedSections);

            // Detect layout mode based on columns used
            const hasMultipleColumns = loadedSections.some(s => s.column && s.column !== 'main');
            setLayoutMode(hasMultipleColumns ? 'two-column' : 'single');
        } catch (error) {
            console.error('Error loading template:', error);
        }
    };

    const handleLayoutPresetSelect = (presetId) => {
        const preset = LAYOUT_PRESETS[presetId];
        if (!preset) return;

        setLayoutMode(preset.mode);

        const newSections = preset.sections.map((section, index) => ({
            id: `${section.type}-${Date.now()}-${index}`,
            type: section.type,
            label: section.label,
            order: index + 1,
            column: preset.mode === 'two-column' ? (section.column || 'right') : 'main',
            config: {
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
                fontFamily: 'DejaVu Sans',
                fontSize: 10,
                lineHeight: 1.5,
                padding: 20,
                marginBottom: 20,
                showBorder: false,
                borderColor: '#CCCCCC',
                textAlign: 'left',
            },
        }));

        setSections(newSections);
        setSelectedSection(null);
    };

    const handleDragStart = (e, section) => {
        e.dataTransfer.setData('sectionType', section.type);
        e.dataTransfer.setData('sectionLabel', section.label);
    };

    const handleDrop = (e, targetColumn = null) => {
        e.preventDefault();
        const sectionType = e.dataTransfer.getData('sectionType');
        const sectionLabel = e.dataTransfer.getData('sectionLabel');

        if (sectionType) {
            const column = layoutMode === 'two-column' ? (targetColumn || 'right') : 'main';

            const newSection = {
                id: `${sectionType}-${Date.now()}`,
                type: sectionType,
                label: sectionLabel,
                order: sections.length + 1,
                column: column,
                config: {
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                    fontFamily: 'DejaVu Sans',
                    fontSize: 10,
                    lineHeight: 1.5,
                    padding: 20,
                    marginBottom: 20,
                    showBorder: false,
                    borderColor: '#CCCCCC',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderRadius: 0,
                    textAlign: 'left',
                },
            };

            setSections([...sections, newSection]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    const handleSectionUpdate = (updatedSection) => {
        setSections(sections.map((s) => (s.id === updatedSection.id ? updatedSection : s)));
        setSelectedSection(updatedSection);
    };

    const handleRemoveSection = (sectionId) => {
        setSections(sections.filter((s) => s.id !== sectionId));
        if (selectedSection?.id === sectionId) {
            setSelectedSection(null);
        }
    };

    const handleReorder = (fromIndex, toIndex, fromColumn, targetColumn) => {
        const newSections = [...sections];

        if (fromColumn && targetColumn && fromColumn !== targetColumn) {
            // Moving between columns
            const section = newSections[fromIndex];
            section.column = targetColumn;
        }

        const [movedSection] = newSections.splice(fromIndex, 1);
        newSections.splice(toIndex, 0, movedSection);

        const reorderedSections = newSections.map((section, index) => ({
            ...section,
            order: index + 1,
        }));

        setSections(reorderedSections);
    };

    const [saveError, setSaveError] = useState('');

    const validateTemplate = () => {
        if (!templateName.trim()) {
            return 'Please enter a template name';
        }

        if (templateName.trim().length < 3) {
            return 'Template name must be at least 3 characters long';
        }

        if (sections.length === 0) {
            return 'Please add at least one section to your template';
        }

        // Check if template has a header section
        const hasHeader = sections.some(s => s.type === 'header');
        if (!hasHeader) {
            return 'Your template should have at least one header section';
        }

        return null;
    };

    const handleSave = async () => {
        // Validate template
        const validationError = validateTemplate();
        if (validationError) {
            setSaveError(validationError);
            return;
        }

        setSaveError('');

        try {
            setSaving(true);

            const layoutStructure = sections.map((section) => ({
                type: section.type,
                order: section.order,
                column: section.column,
            }));

            const componentConfig = {};
            sections.forEach((section) => {
                componentConfig[section.type] = section.config;
            });

            const data = {
                name: templateName,
                description: templateDescription,
                layout_structure: layoutStructure,
                component_config: componentConfig,
                colors: colors,
                is_public: isPublic,
                layout_mode: layoutMode,
            };

            if (templateId) {
                await templateBuilderApi.update(templateId, data);
            } else {
                await templateBuilderApi.create(data);
            }

            // Clear auto-save draft after successful save
            localStorage.removeItem('templateBuilder_draft');

            setShowSaveModal(false);
            router.visit('/resumes');
        } catch (error) {
            console.error('Error saving template:', error);

            // Better error messages based on error type
            if (error.response?.status === 422) {
                setSaveError('Validation failed. Please check all required fields.');
            } else if (error.response?.status === 401) {
                setSaveError('You are not authorized. Please log in again.');
            } else if (error.response?.status === 500) {
                setSaveError('Server error. Please try again later.');
            } else if (!navigator.onLine) {
                setSaveError('No internet connection. Please check your network.');
            } else {
                setSaveError(error.response?.data?.message || 'Failed to save template. Please try again.');
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDuplicate = async () => {
        if (!templateId) return;

        try {
            const response = await templateBuilderApi.duplicate(templateId);
            const newTemplateId = response.data.data.id;
            router.visit(`/templates/builder/${newTemplateId}`);
        } catch (error) {
            console.error('Error duplicating template:', error);
            alert('Failed to duplicate template. Please try again.');
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Template Builder" />

            <div className="py-3">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Compact Header */}
                    <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold text-gray-900">Template Builder</h2>
                            <span className="text-xs text-gray-500">
                                {layoutMode === 'single' ? 'Single' : 'Two'} Column
                            </span>
                            {/* Auto-save indicator */}
                            {autoSaveStatus && (
                                <div className="flex items-center gap-1.5 text-xs">
                                    {autoSaveStatus === 'saving' ? (
                                        <>
                                            <svg className="w-3 h-3 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className="text-gray-500">Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-green-600">Saved</span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setLayoutMode(layoutMode === 'single' ? 'two-column' : 'single')}
                                className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                {layoutMode === 'single' ? '2 Col' : '1 Col'}
                            </button>
                            {templateId && (
                                <button
                                    onClick={handleDuplicate}
                                    className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Duplicate
                                </button>
                            )}
                            <button
                                onClick={() => router.visit('/resumes')}
                                className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowSaveModal(true)}
                                disabled={saving}
                                className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : templateId ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </div>

                    {/* Compact Toolbar */}
                    <div className="mb-2 flex items-center justify-between p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center gap-2">
                            {/* Sidebar toggles */}
                            <button
                                onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
                                className="p-2 rounded hover:bg-gray-100 transition-colors"
                                title="Toggle Left Sidebar"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
                                className="p-2 rounded hover:bg-gray-100 transition-colors"
                                title="Toggle Properties Sidebar"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <div className="w-px h-6 bg-gray-300 mx-2"></div>
                            {/* Undo/Redo */}
                            <button
                                onClick={handleUndo}
                                disabled={historyIndex <= 0}
                                className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                title="Undo (Ctrl+Z)"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={handleRedo}
                                disabled={historyIndex >= history.length - 1}
                                className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                title="Redo (Ctrl+Y)"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
                                </svg>
                            </button>
                            <div className="w-px h-6 bg-gray-300 mx-2"></div>
                            {/* View tools */}
                            <button
                                onClick={() => setShowRulers(!showRulers)}
                                className={`p-2 rounded transition-colors ${showRulers ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                                title="Toggle Rulers (Ctrl+R)"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setShowGrid(!showGrid)}
                                className={`p-2 rounded transition-colors ${showGrid ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                                title="Toggle Grid (Ctrl+G)"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-xs text-gray-500">
                                {sections.length} sections
                            </div>
                            <button
                                onClick={() => setPreviewMode(previewMode === 'interactive' ? 'canvas' : 'interactive')}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                                {previewMode === 'interactive' ? '📋 List View' : '✨ Interactive'}
                            </button>
                        </div>
                    </div>

                    {/* Main Grid */}
                    {previewMode === 'canvas' ? (
                        <div className="grid grid-cols-12 gap-6">
                            {/* Left Sidebar - Component Library */}
                            <div className="col-span-3">
                                <ComponentLibrary
                                    onDragStart={handleDragStart}
                                    onLayoutPresetSelect={handleLayoutPresetSelect}
                                />
                            </div>

                            {/* Center - Canvas */}
                            <div className="col-span-5">
                                <Canvas
                                    sections={sections}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onSectionClick={handleSectionClick}
                                    selectedSection={selectedSection}
                                    onRemoveSection={handleRemoveSection}
                                    onReorder={handleReorder}
                                    layoutMode={layoutMode}
                                />
                            </div>

                            {/* Right Sidebar - Properties & Preview */}
                            <div className="col-span-4 space-y-6">
                                <PropertyPanel
                                    section={selectedSection}
                                    onUpdate={handleSectionUpdate}
                                    layoutMode={layoutMode}
                                />
                                <PreviewPanel
                                    sections={sections}
                                    templateName={templateName}
                                    colors={colors}
                                    layoutMode={layoutMode}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            {/* Left Sidebar - Tabbed Interface */}
                            {!leftSidebarCollapsed && (
                                <div className="w-72 flex-shrink-0">
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[calc(100vh-180px)]">
                                        {/* Tab Headers */}
                                        <div className="flex border-b border-gray-200 bg-gray-50">
                                            <button
                                                onClick={() => setLeftSidebarTab('components')}
                                                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                                                    leftSidebarTab === 'components'
                                                        ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                }`}
                                            >
                                                Components
                                            </button>
                                            <button
                                                onClick={() => setLeftSidebarTab('blocks')}
                                                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                                                    leftSidebarTab === 'blocks'
                                                        ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                }`}
                                            >
                                                Blocks
                                            </button>
                                            <button
                                                onClick={() => setLeftSidebarTab('layers')}
                                                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                                                    leftSidebarTab === 'layers'
                                                        ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                }`}
                                            >
                                                Layers
                                            </button>
                                        </div>

                                        {/* Tab Content */}
                                        <div className="overflow-y-auto h-[calc(100%-49px)]">
                                            {leftSidebarTab === 'components' && (
                                                <div className="p-4">
                                                    <ComponentLibrary
                                                        onDragStart={handleDragStart}
                                                        onLayoutPresetSelect={handleLayoutPresetSelect}
                                                    />
                                                </div>
                                            )}
                                            {leftSidebarTab === 'blocks' && (
                                                <div className="p-4">
                                                    <BlocksLibrary
                                                        onApplyBlock={handleApplyBlock}
                                                        onApplyColorScheme={handleApplyColorScheme}
                                                    />
                                                </div>
                                            )}
                                            {leftSidebarTab === 'layers' && (
                                                <div className="p-4">
                                                    <LayersPanel
                                                        sections={sections}
                                                        selectedSection={selectedSection}
                                                        onSectionClick={handleSectionClick}
                                                        onSectionReorder={(from, to) => handleReorder(from, to, null, null)}
                                                        onSectionToggleVisibility={handleSectionToggleVisibility}
                                                        onSectionToggleLock={handleSectionToggleLock}
                                                        onSectionRename={handleSectionRename}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Main - Interactive Preview */}
                            <div className="flex-1 min-w-0 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                                    {showRulers && (
                                        <div className="absolute inset-0 pointer-events-none z-10">
                                            <RulersAndGuides
                                                showRulers={showRulers}
                                                showGrid={showGrid}
                                                containerWidth={800}
                                                containerHeight={1100}
                                            />
                                        </div>
                                    )}
                                    <InteractivePreview
                                        sections={sections.filter(s => !s.hidden)}
                                        onSectionClick={handleSectionClick}
                                        onSectionUpdate={handleSectionUpdate}
                                        onSectionReorder={handleReorder}
                                        onSectionDrop={handleDrop}
                                        onRemoveSection={handleRemoveSection}
                                        onDuplicateSection={handleDuplicateSection}
                                        selectedSection={selectedSection}
                                        layoutMode={layoutMode}
                                    />
                                </div>
                            </div>

                            {/* Right Sidebar - Properties */}
                            {!rightSidebarCollapsed && (
                                <div className="w-80 flex-shrink-0">
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-180px)] overflow-y-auto">
                                        <PropertyPanel
                                            section={selectedSection}
                                            onUpdate={handleSectionUpdate}
                                            layoutMode={layoutMode}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Save Modal */}
            {showSaveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-xl font-semibold mb-4">Save Template</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Template Name *
                                </label>
                                <input
                                    type="text"
                                    value={templateName}
                                    onChange={(e) => setTemplateName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Professional Modern"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={templateDescription}
                                    onChange={(e) => setTemplateDescription(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Describe your template..."
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={isPublic}
                                        onChange={(e) => setIsPublic(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Make this template public
                                    </span>
                                </label>
                                <p className="text-xs text-gray-500 mt-1 ml-6">
                                    Public templates can be used by other users
                                </p>
                            </div>

                            {/* Error Message */}
                            {saveError && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-xs text-red-800 flex-1">{saveError}</p>
                                </div>
                            )}

                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-xs text-blue-800">
                                    Layout: {layoutMode === 'single' ? 'Single Column' : 'Two Column'} • {sections.length} sections
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 justify-end">
                            <button
                                onClick={() => setShowSaveModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
