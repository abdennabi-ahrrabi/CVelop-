import { Head, Link } from '@inertiajs/react';

export default function Terms() {
    return (
        <>
            <Head title="Terms of Service" />
            <div className="min-h-screen bg-[#0a0a0f] py-12">
                {/* Background effects */}
                <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-indigo-950/20"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[128px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[128px]"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
                                <p className="text-gray-400">
                                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    By accessing and using Indentio ("the Service"), you agree to be bound by these Terms of Service.
                                    If you do not agree to these terms, please do not use the Service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Indentio is an online platform that allows users to create, customize, and download
                                    professional resumes and curriculum vitae. The Service includes AI-powered features to
                                    enhance your content.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">3. User Accounts</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    To use the Service, you must create an account. You are responsible for:
                                </p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                    <li>Maintaining the confidentiality of your account credentials</li>
                                    <li>All activities that occur under your account</li>
                                    <li>Providing accurate and complete information</li>
                                    <li>Notifying us immediately of any unauthorized use</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">4. User Content</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    You retain ownership of all content you create using the Service. By using the Service,
                                    you grant us a limited license to process and store your content solely for the purpose
                                    of providing the Service.
                                </p>
                                <p className="text-gray-400 leading-relaxed">
                                    You are solely responsible for the accuracy and legality of the information you include
                                    in your resumes.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">5. AI Features</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    The Service includes AI-powered features to help enhance your resume content.
                                    While we strive to provide helpful suggestions, you are responsible for reviewing
                                    and approving all AI-generated content before using it.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">6. Prohibited Uses</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">You agree not to:</p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                    <li>Use the Service for any unlawful purpose</li>
                                    <li>Include false or misleading information in your resumes</li>
                                    <li>Attempt to gain unauthorized access to the Service</li>
                                    <li>Interfere with the proper functioning of the Service</li>
                                    <li>Use automated systems to access the Service without permission</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    The Service is provided "as is" without warranties of any kind. We are not responsible
                                    for any employment outcomes or decisions made based on resumes created using the Service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">8. Changes to Terms</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    We reserve the right to modify these terms at any time. Continued use of the Service
                                    after changes constitutes acceptance of the new terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-white mb-4">9. Contact</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    If you have questions about these Terms, please contact us at support@cvbuilder.com.
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
