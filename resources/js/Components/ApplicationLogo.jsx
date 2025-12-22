export default function ApplicationLogo({ className = '', showText = true }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <img
                src="/images/logo.png"
                alt="Indentio"
                className="h-10 w-auto"
            />
            {showText && (
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                    Indentio
                </span>
            )}
        </div>
    );
}
