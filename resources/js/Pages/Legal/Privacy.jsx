import { Head, Link } from '@inertiajs/react';

export default function Privacy() {
    return (
        <>
            <Head title="Privacy Policy" />
            <div className="min-h-screen bg-[#0a0a0f] py-12">
                {/* Background effects */}
                <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-indigo-950/20"></div>
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-[128px]"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
                                <p className="text-gray-400">
                                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">We collect information you provide directly to us:</p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                    <li><span className="text-gray-300 font-medium">Account Information:</span> Name, email address, and password when you register</li>
                                    <li><span className="text-gray-300 font-medium">Resume Content:</span> Personal details, work history, education, and skills you add to your resumes</li>
                                    <li><span className="text-gray-300 font-medium">Usage Data:</span> How you interact with our Service</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">We use your information to:</p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                    <li>Provide, maintain, and improve the Service</li>
                                    <li>Process and store your resume content</li>
                                    <li>Generate AI-enhanced content suggestions</li>
                                    <li>Send you technical notices and support messages</li>
                                    <li>Respond to your comments and questions</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">3. AI Processing</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    When you use our AI enhancement features, your text is sent to third-party AI services
                                    (such as Groq or Google Gemini) for processing. This data is used solely to generate
                                    improved content suggestions and is not stored by these services beyond the immediate
                                    processing request.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">4. Data Storage and Security</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    We implement appropriate security measures to protect your personal information.
                                    Your data is stored on secure servers and encrypted in transit using SSL/TLS.
                                </p>
                                <p className="text-gray-400 leading-relaxed">
                                    While we strive to protect your information, no method of transmission over the
                                    Internet is 100% secure.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">5. Data Sharing</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">We do not sell your personal information. We may share your data with:</p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                    <li><span className="text-gray-300 font-medium">Service Providers:</span> Third parties that help us operate the Service</li>
                                    <li><span className="text-gray-300 font-medium">AI Providers:</span> For processing AI enhancement requests</li>
                                    <li><span className="text-gray-300 font-medium">Legal Requirements:</span> When required by law or to protect our rights</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">6. Your Rights</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">You have the right to:</p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                    <li>Access your personal information</li>
                                    <li>Correct inaccurate data</li>
                                    <li>Delete your account and associated data</li>
                                    <li>Export your resume data</li>
                                    <li>Opt out of marketing communications</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">7. Cookies</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    We use cookies and similar technologies to maintain your session, remember your
                                    preferences, and improve our Service. You can control cookies through your browser settings.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">8. Data Retention</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    We retain your information for as long as your account is active or as needed to
                                    provide the Service. You can delete your account at any time, which will remove
                                    your personal data from our systems.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">9. Children's Privacy</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    The Service is not intended for users under 16 years of age. We do not knowingly
                                    collect information from children under 16.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">10. Changes to This Policy</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of any
                                    changes by posting the new policy on this page and updating the "Last updated" date.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">11. Contact Us</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    If you have questions about this Privacy Policy or your data, please contact us at
                                    privacy@cvbuilder.com.
                                </p>
                            </section>
                        </div>

                        <div className="mt-10 pt-6 border-t border-white/10">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
