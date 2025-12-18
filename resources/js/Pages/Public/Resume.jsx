import { Head, Link } from '@inertiajs/react';

export default function Resume({ resume, owner }) {
    return (
        <>
            <Head title={`${resume.title} - ${owner.name} | Indentio`} />

            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                        <Link
                            href={owner.profile_url}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Back to {owner.name}'s Profile</span>
                        </Link>
                        <a
                            href="/"
                            className="text-violet-600 hover:text-violet-700 font-medium text-sm"
                        >
                            Powered by Indentio
                        </a>
                    </div>
                </div>

                {/* Resume Content */}
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Personal Info Header */}
                        {resume.personalInfo && (
                            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white">
                                <h1 className="text-3xl font-bold">{resume.personalInfo.full_name}</h1>
                                {resume.personalInfo.title && (
                                    <p className="text-xl text-violet-200 mt-1">{resume.personalInfo.title}</p>
                                )}
                                <div className="flex flex-wrap gap-4 mt-4 text-sm text-violet-200">
                                    {resume.personalInfo.email && (
                                        <a href={`mailto:${resume.personalInfo.email}`} className="flex items-center gap-1 hover:text-white">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {resume.personalInfo.email}
                                        </a>
                                    )}
                                    {resume.personalInfo.phone && (
                                        <a href={`tel:${resume.personalInfo.phone}`} className="flex items-center gap-1 hover:text-white">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {resume.personalInfo.phone}
                                        </a>
                                    )}
                                    {resume.personalInfo.location && (
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {resume.personalInfo.location}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="p-8 space-y-8">
                            {/* Summary */}
                            {resume.personalInfo?.summary && (
                                <section>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        Professional Summary
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed">{resume.personalInfo.summary}</p>
                                </section>
                            )}

                            {/* Work Experience */}
                            {resume.workExperiences && resume.workExperiences.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                        Work Experience
                                    </h2>
                                    <div className="space-y-6">
                                        {resume.workExperiences.map((exp, index) => (
                                            <div key={index} className="border-l-2 border-violet-200 pl-4">
                                                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                                <p className="text-violet-600">{exp.company}</p>
                                                <p className="text-sm text-gray-500">
                                                    {exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}
                                                    {exp.location && ` | ${exp.location}`}
                                                </p>
                                                {exp.description && (
                                                    <p className="mt-2 text-gray-600 whitespace-pre-line">{exp.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Education */}
                            {resume.educations && resume.educations.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                            </svg>
                                        </span>
                                        Education
                                    </h2>
                                    <div className="space-y-4">
                                        {resume.educations.map((edu, index) => (
                                            <div key={index} className="border-l-2 border-violet-200 pl-4">
                                                <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field_of_study}</h3>
                                                <p className="text-violet-600">{edu.institution}</p>
                                                <p className="text-sm text-gray-500">
                                                    {edu.start_date} - {edu.is_current ? 'Present' : edu.end_date}
                                                </p>
                                                {edu.description && (
                                                    <p className="mt-1 text-gray-600">{edu.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Skills */}
                            {resume.skills && resume.skills.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </span>
                                        Skills
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {resume.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
