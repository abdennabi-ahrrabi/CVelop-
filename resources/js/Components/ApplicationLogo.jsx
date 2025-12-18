export default function ApplicationLogo({ className = '', showText = true }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg
                className="h-10 w-10"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="40" height="40" rx="8" className="fill-indigo-600" />
                <path
                    d="M10 12h20v2H10v-2zm0 4h20v2H10v-2zm0 4h14v2H10v-2zm0 4h18v2H10v-2zm0 4h12v2H10v-2z"
                    className="fill-white"
                />
                <circle cx="30" cy="24" r="6" className="fill-indigo-400" />
                <path
                    d="M28 24l2 2 4-4"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </svg>
            {showText && (
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                    Indentio
                </span>
            )}
        </div>
    );
}
