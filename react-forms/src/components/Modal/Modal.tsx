import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from './Modal.module.css'

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, children}: ModalProps) {
    const modalRoot = document.getElementById('modal-root');

    if (!modalRoot) return null;

    const modalRef = useRef<HTMLDivElement>(null);

    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        previousFocusRef.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

        modalRef.current?.focus();

        const handleKeyDown = (
            event: KeyboardEvent
        ) => {
            if (event.key === 'Escape') {
                onClose();
            } 

            if (event.key !== 'Tab') {
                return;
            } 

            const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
                [
                    'button',
                    'input',
                    'select',
                    'textarea',
                    'a[href]',
                ].join(',')
            );

            if (!focusableElements || focusableElements.length === 0) return;

            const firstElement = focusableElements[0];

            const lastElement = focusableElements[focusableElements.length - 1];

            if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);

            previousFocusRef.current?.focus();
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    if(!modalRoot) return null;

    return createPortal(
        <div
        className={styles.overlay}
        data-testid="modal-overlay"
        onClick={onClose}
        >
            <div
            ref={modalRef}
            className={styles.modal}
            role="dialog"
            aria-modal='true'
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        modalRoot
    );
} 