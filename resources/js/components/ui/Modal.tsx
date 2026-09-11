import { PropsWithChildren, useEffect, useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
}

const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
};

export default function Modal({ isOpen, onClose, maxWidth = '4xl', children }: PropsWithChildren<ModalProps>) {
    const [render, setRender] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setRender(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            const timer = setTimeout(() => setRender(false), 300); // Wait for exit animation
            return () => clearTimeout(timer);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!render) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 sm:py-12 perspective-[1000px]">
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>

            {/* Modal Content Wrapper */}
            <div 
                className={`relative w-full ${maxWidthClass[maxWidth]} max-h-[90vh] overflow-y-auto modal-scrollbar rounded-xl border border-border bg-white shadow-2xl transition-all duration-300 ease-out ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}
            >
                {/* Close Button */}
                <div className="absolute right-3 top-3 z-110">
                    <button
                        onClick={onClose}
                        className="rounded-md p-2 text-heading focus:outline-none hover:bg-surface-alt transition-colors"
                        aria-label="Close modal"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}
