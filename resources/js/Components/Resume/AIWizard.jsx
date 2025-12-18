import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import { wizardApi, templateApi } from '@/utils/api';

export default function AIWizard() {
    const [currentStep, setCurrentStep] = useState('welcome');
    const [stepInfo, setStepInfo] = useState(null);
    const [collectedData, setCollectedData] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [enhancing, setEnhancing] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [workExperiences, setWorkExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [currentWorkForm, setCurrentWorkForm] = useState({
        company: '', position: '', description: '', start_date: '', end_date: '', is_current: false
    });
    const [currentEduForm, setCurrentEduForm] = useState({
        institution: '', degree: '', field: '', description: '', start_date: '', end_date: '', is_current: false
    });
    const [showWorkForm, setShowWorkForm] = useState(false);
    const [showEduForm, setShowEduForm] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        loadStep('welcome');
        loadTemplates();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadTemplates = async () => {
        try {
            const response = await templateApi.getAll();
            setTemplates(response.data.data || response.data || []);
        } catch (error) {
            console.error('Failed to load templates:', error);
        }
    };

    const loadStep = async (step) => {
        setLoading(true);
        try {
            const response = await wizardApi.getStep(step, collectedData);
            const info = response.data.data;
            setStepInfo(info);
            setCurrentStep(step);
            addMessage('bot', info.question);

            if (info.type === 'work_form') {
                setShowWorkForm(true);
            } else if (info.type === 'education_form') {
                setShowEduForm(true);
            }
        } catch (error) {
            console.error('Failed to load step:', error);
        } finally {
            setLoading(false);
        }
    };

    const addMessage = (sender, text, data = null) => {
        setMessages(prev => [...prev, { sender, text, data, timestamp: new Date() }]);
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();

        if (stepInfo?.type === 'work_form' || stepInfo?.type === 'education_form') {
            return;
        }

        if (!inputValue.trim() && stepInfo?.required) return;

        const value = inputValue.trim();
        addMessage('user', value || '(skipped)');
        setInputValue('');
        await processStep(value);
    };

    const handleSelectOption = async (option) => {
        addMessage('user', option.label);
        await processStep(option.value);
    };

    const handleTemplateSelect = async (template) => {
        addMessage('user', `Selected: ${template.name}`);
        await processStep(template.id);
    };

    const processStep = async (value) => {
        setLoading(true);
        try {
            const newData = { ...collectedData };
            if (stepInfo?.field) {
                newData[stepInfo.field] = value;
            }

            newData.work_experiences = workExperiences;
            newData.educations = educations;
            setCollectedData(newData);

            const response = await wizardApi.processInput(currentStep, value, newData);

            if (response.data.done) {
                addMessage('bot', "Your CV is ready! Click the button below to create it.");
                setStepInfo({ type: 'complete', done: true });
                setCollectedData(response.data.data);
            } else if (response.data.nextStep) {
                const nextInfo = response.data.nextStep;
                setStepInfo(nextInfo);
                setCurrentStep(nextInfo.step);
                setCollectedData(response.data.data);
                addMessage('bot', nextInfo.question);

                if (nextInfo.type === 'work_form') {
                    setShowWorkForm(true);
                } else if (nextInfo.type === 'education_form') {
                    setShowEduForm(true);
                }
            }
        } catch (error) {
            console.error('Failed to process step:', error);
            addMessage('bot', 'Sorry, something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEnhanceText = async (text, type) => {
        if (!text.trim()) return text;
        setEnhancing(true);
        try {
            const response = await wizardApi.enhance(text, type, collectedData.cv_type);
            return response.data.enhanced || text;
        } catch (error) {
            console.error('Failed to enhance:', error);
            return text;
        } finally {
            setEnhancing(false);
        }
    };

    const handleAddWorkExperience = async () => {
        if (!currentWorkForm.company || !currentWorkForm.position) {
            alert('Please fill in at least the company and position');
            return;
        }

        let enhancedDescription = currentWorkForm.description;
        if (currentWorkForm.description.trim()) {
            enhancedDescription = await handleEnhanceText(currentWorkForm.description, 'work');
        }

        const newWork = { ...currentWorkForm, description: enhancedDescription };
        setWorkExperiences([...workExperiences, newWork]);
        addMessage('user', `Added: ${newWork.position} at ${newWork.company}`);

        setCurrentWorkForm({
            company: '', position: '', description: '', start_date: '', end_date: '', is_current: false
        });
    };

    const handleDoneWithWork = () => {
        setShowWorkForm(false);
        const count = workExperiences.length;
        addMessage('bot', count > 0 ? `Great! Added ${count} work experience(s).` : 'No work experience added.');
        processStep(workExperiences);
    };

    const handleAddEducation = async () => {
        if (!currentEduForm.institution || !currentEduForm.degree) {
            alert('Please fill in at least the institution and degree');
            return;
        }

        let enhancedDescription = currentEduForm.description;
        if (currentEduForm.description.trim()) {
            enhancedDescription = await handleEnhanceText(currentEduForm.description, 'education');
        }

        const newEdu = { ...currentEduForm, description: enhancedDescription };
        setEducations([...educations, newEdu]);
        addMessage('user', `Added: ${newEdu.degree} from ${newEdu.institution}`);

        setCurrentEduForm({
            institution: '', degree: '', field: '', description: '', start_date: '', end_date: '', is_current: false
        });
    };

    const handleDoneWithEducation = () => {
        setShowEduForm(false);
        const count = educations.length;
        addMessage('bot', count > 0 ? `Perfect! Added ${count} education entry(ies).` : 'No education added.');
        processStep(educations);
    };

    const handleCreateResume = async () => {
        setLoading(true);
        try {
            const finalData = {
                ...collectedData,
                work_experiences: workExperiences,
                educations: educations,
            };

            const response = await wizardApi.createResume(finalData);

            if (response.data.success) {
                addMessage('bot', 'Your CV has been created successfully! Redirecting to editor...');
                setTimeout(() => {
                    router.visit(`/resumes/${response.data.resume.id}/edit`);
                }, 1500);
            }
        } catch (error) {
            console.error('Failed to create resume:', error);
            addMessage('bot', 'Failed to create CV. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderInput = () => {
        if (!stepInfo) return null;

        if (stepInfo.type === 'complete') {
            return (
                <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">CV Ready!</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Your information has been collected. Click below to create your CV.
                        </p>
                        <button
                            onClick={handleCreateResume}
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-500 hover:to-green-500 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Create My CV
                                </>
                            )}
                        </button>
                    </div>
                </div>
            );
        }

        if (stepInfo.type === 'select') {
            return (
                <div className="grid grid-cols-2 gap-3 p-4">
                    {stepInfo.options?.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelectOption(option)}
                            disabled={loading}
                            className="p-4 text-left bg-white/5 border border-white/10 rounded-xl hover:border-violet-500/50 hover:bg-violet-500/10 transition-all"
                        >
                            <span className="font-medium text-white">{option.label}</span>
                        </button>
                    ))}
                </div>
            );
        }

        if (stepInfo.type === 'template_select') {
            return (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {templates.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => handleTemplateSelect(template)}
                            disabled={loading}
                            className="p-4 text-center bg-white/5 border border-white/10 rounded-xl hover:border-violet-500/50 hover:bg-violet-500/10 transition-all"
                        >
                            <div className="w-full h-24 bg-white/5 rounded-lg mb-2 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="font-medium text-white">{template.name}</span>
                        </button>
                    ))}
                </div>
            );
        }

        if (stepInfo.type === 'work_form' && showWorkForm) {
            return (
                <div className="p-4 space-y-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Company *"
                            value={currentWorkForm.company}
                            onChange={(e) => setCurrentWorkForm({ ...currentWorkForm, company: e.target.value })}
                            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <input
                            type="text"
                            placeholder="Position *"
                            value={currentWorkForm.position}
                            onChange={(e) => setCurrentWorkForm({ ...currentWorkForm, position: e.target.value })}
                            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <input
                            type="date"
                            placeholder="Start Date"
                            value={currentWorkForm.start_date}
                            onChange={(e) => setCurrentWorkForm({ ...currentWorkForm, start_date: e.target.value })}
                            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <input
                            type="date"
                            placeholder="End Date"
                            value={currentWorkForm.end_date}
                            onChange={(e) => setCurrentWorkForm({ ...currentWorkForm, end_date: e.target.value })}
                            disabled={currentWorkForm.is_current}
                            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
                        />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-gray-400">
                        <input
                            type="checkbox"
                            checked={currentWorkForm.is_current}
                            onChange={(e) => setCurrentWorkForm({ ...currentWorkForm, is_current: e.target.checked, end_date: '' })}
                            className="rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500"
                        />
                        I currently work here
                    </label>
                    <textarea
                        placeholder="Describe your responsibilities (AI will enhance it!)"
                        value={currentWorkForm.description}
                        onChange={(e) => setCurrentWorkForm({ ...currentWorkForm, description: e.target.value })}
                        rows="3"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    />
                    {workExperiences.length > 0 && (
                        <div className="text-sm text-gray-400">
                            Added: {workExperiences.map(w => w.position).join(', ')}
                        </div>
                    )}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleAddWorkExperience}
                            disabled={enhancing}
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 transition-all"
                        >
                            {enhancing ? 'Enhancing...' : 'Add Experience'}
                        </button>
                        <button
                            type="button"
                            onClick={handleDoneWithWork}
                            className="px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-all"
                        >
                            Done
                        </button>
                    </div>
                </div>
            );
        }

        if (stepInfo.type === 'education_form' && showEduForm) {
            return (
                <div className="p-4 space-y-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Institution *"
                            value={currentEduForm.institution}
                            onChange={(e) => setCurrentEduForm({ ...currentEduForm, institution: e.target.value })}
                            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <input
                            type="text"
                            placeholder="Degree *"
                            value={currentEduForm.degree}
                            onChange={(e) => setCurrentEduForm({ ...currentEduForm, degree: e.target.value })}
                            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <input
                            type="text"
                            placeholder="Field of Study"
                            value={currentEduForm.field}
                            onChange={(e) => setCurrentEduForm({ ...currentEduForm, field: e.target.value })}
                            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <input
                            type="date"
                            placeholder="Start Date"
                            value={currentEduForm.start_date}
                            onChange={(e) => setCurrentEduForm({ ...currentEduForm, start_date: e.target.value })}
                            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <input
                            type="date"
                            placeholder="End Date"
                            value={currentEduForm.end_date}
                            onChange={(e) => setCurrentEduForm({ ...currentEduForm, end_date: e.target.value })}
                            disabled={currentEduForm.is_current}
                            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
                        />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-gray-400">
                        <input
                            type="checkbox"
                            checked={currentEduForm.is_current}
                            onChange={(e) => setCurrentEduForm({ ...currentEduForm, is_current: e.target.checked, end_date: '' })}
                            className="rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500"
                        />
                        I currently study here
                    </label>
                    <textarea
                        placeholder="Describe achievements or activities (optional)"
                        value={currentEduForm.description}
                        onChange={(e) => setCurrentEduForm({ ...currentEduForm, description: e.target.value })}
                        rows="2"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    />
                    {educations.length > 0 && (
                        <div className="text-sm text-gray-400">
                            Added: {educations.map(e => e.degree).join(', ')}
                        </div>
                    )}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleAddEducation}
                            disabled={enhancing}
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 transition-all"
                        >
                            {enhancing ? 'Enhancing...' : 'Add Education'}
                        </button>
                        <button
                            type="button"
                            onClick={handleDoneWithEducation}
                            className="px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-all"
                        >
                            Done
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <form onSubmit={handleSubmit} className="p-4">
                <div className="flex gap-2">
                    {stepInfo.type === 'textarea' ? (
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={stepInfo.placeholder}
                            rows="3"
                            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                        />
                    ) : (
                        <input
                            type={stepInfo.type || 'text'}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={stepInfo.placeholder}
                            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    )}
                    <button
                        type="submit"
                        disabled={loading || (stepInfo.required && !inputValue.trim())}
                        className="px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 transition-all"
                    >
                        {loading ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        )}
                    </button>
                </div>
                {!stepInfo.required && (
                    <button
                        type="button"
                        onClick={() => processStep('')}
                        className="mt-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    >
                        Skip this step
                    </button>
                )}
            </form>
        );
    };

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] max-w-3xl mx-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">AI CV Wizard</h2>
                        <p className="text-sm text-violet-100">Let me help you create your perfect CV</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                                message.sender === 'user'
                                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-br-md'
                                    : 'bg-white/10 text-white rounded-bl-md border border-white/10'
                            }`}
                        >
                            {message.sender === 'bot' && (
                                <div className="flex items-center gap-2 mb-1">
                                    <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <span className="text-xs font-medium text-violet-400">AI Assistant</span>
                                </div>
                            )}
                            <p className="whitespace-pre-wrap">{message.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10">
                {renderInput()}
            </div>
        </div>
    );
}
