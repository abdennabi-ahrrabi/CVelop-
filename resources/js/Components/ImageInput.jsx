import { useState, useRef } from 'react';

/**
 * ImageInput Component
 * Allows users to either upload an image file or provide an external URL
 *
 * Props:
 * - label: Label text for the input
 * - value: Current image value (either uploaded path or URL)
 * - uploadValue: Path to uploaded file (e.g., 'projects/image.jpg')
 * - urlValue: External URL
 * - onUpload: Callback when file is uploaded (receives file)
 * - onUrlChange: Callback when URL changes (receives url string)
 * - onClear: Callback when image is cleared
 * - accept: Accepted file types (default: 'image/*')
 * - maxSize: Max file size in MB (default: 5)
 * - aspectRatio: Optional aspect ratio hint (e.g., '16:9', '1:1')
 * - previewClassName: Custom class for preview container
 * - error: Error message to display
 */
export default function ImageInput({
    label = 'Image',
    uploadValue = null,
    urlValue = null,
    onUpload,
    onUrlChange,
    onClear,
    accept = 'image/*',
    maxSize = 5,
    aspectRatio,
    previewClassName = 'w-32 h-32',
    error,
}) {
    const [mode, setMode] = useState(urlValue ? 'url' : 'upload');
    const [urlInput, setUrlInput] = useState(urlValue || '');
    const [dragActive, setDragActive] = useState(false);
    const [previewError, setPreviewError] = useState(false);
    const fileInputRef = useRef(null);

    // Get the display URL
    const displayUrl = urlValue || (uploadValue ? `/storage/${uploadValue}` : null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size
            if (file.size > maxSize * 1024 * 1024) {
                alert(`File size must be less than ${maxSize}MB`);
                return;
            }
            setPreviewError(false);
            onUpload?.(file);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            if (file.size > maxSize * 1024 * 1024) {
                alert(`File size must be less than ${maxSize}MB`);
                return;
            }
            setPreviewError(false);
            onUpload?.(file);
        }
    };

    const handleUrlSubmit = () => {
        if (urlInput.trim()) {
            setPreviewError(false);
            onUrlChange?.(urlInput.trim());
        }
    };

    const handleClear = () => {
        setUrlInput('');
        setPreviewError(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClear?.();
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
        // Don't clear values when switching modes
    };

    return (
        <div className="space-y-3">
            {label && (
                <label className="block text-sm font-medium text-gray-300">{label}</label>
            )}

            {/* Mode Toggle */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-lg w-fit">
                <button
                    type="button"
                    onClick={() => handleModeChange('upload')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                        mode === 'upload'
                            ? 'bg-violet-600 text-white'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Upload File
                </button>
                <button
                    type="button"
                    onClick={() => handleModeChange('url')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                        mode === 'url'
                            ? 'bg-violet-600 text-white'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Image URL
                </button>
            </div>

            {/* Upload Mode */}
            {mode === 'upload' && (
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                        dragActive
                            ? 'border-violet-500 bg-violet-500/10'
                            : 'border-white/20 hover:border-white/40'
                    }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-2">
                        <svg
                            className="w-10 h-10 mx-auto text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="text-sm text-gray-400">
                            <span className="text-violet-400">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to {maxSize}MB
                            {aspectRatio && ` (${aspectRatio} recommended)`}
                        </p>
                    </div>
                </div>
            )}

            {/* URL Mode */}
            {mode === 'url' && (
                <div className="flex gap-2">
                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleUrlSubmit())}
                        placeholder="https://example.com/image.jpg"
                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                        type="button"
                        onClick={handleUrlSubmit}
                        disabled={!urlInput.trim()}
                        className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all"
                    >
                        Set
                    </button>
                </div>
            )}

            {/* Preview */}
            {displayUrl && !previewError && (
                <div className="flex items-start gap-4">
                    <div className={`${previewClassName} bg-white/5 rounded-xl overflow-hidden flex-shrink-0`}>
                        <img
                            src={displayUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={() => setPreviewError(true)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-400 break-all max-w-xs">
                            {urlValue ? urlValue : uploadValue}
                        </p>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="text-sm text-red-400 hover:text-red-300 text-left"
                        >
                            Remove image
                        </button>
                    </div>
                </div>
            )}

            {/* Preview Error */}
            {previewError && displayUrl && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Failed to load image. Please check the URL.
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-red-400 hover:text-red-300 underline ml-2"
                    >
                        Clear
                    </button>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <p className="text-sm text-red-400">{error}</p>
            )}
        </div>
    );
}
