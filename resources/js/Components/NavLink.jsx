import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}
