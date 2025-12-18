import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-transparent to-indigo-950/30"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                        Indentio
                                    </span>
                                </Link>
                            </div>

                            <div className="hidden space-x-1 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('resumes.index')}
                                    active={route().current('resumes.index')}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    Resumes
                                </NavLink>
                                <NavLink
                                    href={route('business-cards.index')}
                                    active={route().current('business-cards.*')}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    Business Cards
                                </NavLink>
                                <NavLink
                                    href={route('projects.index')}
                                    active={route().current('projects.*')}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    Projects
                                </NavLink>
                                <NavLink
                                    href={route('messages.index')}
                                    active={route().current('messages.*')}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    Messages
                                </NavLink>
                                <NavLink
                                    href={route('leads.index')}
                                    active={route().current('leads.*')}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    Leads
                                </NavLink>
                                <NavLink
                                    href={route('analytics.dashboard')}
                                    active={route().current('analytics.*')}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    Analytics
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center gap-4">
                            <Link
                                href="/resumes/wizard"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-violet-500/25"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                AI Wizard
                            </Link>

                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-lg">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white focus:outline-none"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                {user.name}
                                                <svg
                                                    className="h-4 w-4 text-gray-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Account Settings
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('profile.settings')}>
                                            Public Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden border-t border-white/10 bg-black/40 backdrop-blur-xl'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2 px-4">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('resumes.index')}
                            active={route().current('resumes.index')}
                        >
                            Resumes
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('business-cards.index')}
                            active={route().current('business-cards.*')}
                        >
                            Business Cards
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('projects.index')}
                            active={route().current('projects.*')}
                        >
                            Projects
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('messages.index')}
                            active={route().current('messages.*')}
                        >
                            Messages
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('analytics.dashboard')}
                            active={route().current('analytics.*')}
                        >
                            Analytics
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-white/10 pb-3 pt-4 px-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-lg font-bold text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="text-base font-medium text-white">
                                    {user.name}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="relative z-10 border-b border-white/5 bg-white/5 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="relative z-10">{children}</main>
        </div>
    );
}
