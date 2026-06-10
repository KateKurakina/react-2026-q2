import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from './Modal';

describe('Modal', () => {
    beforeEach(() => {
        const modalRoot = document.createElement('div');

        modalRoot.setAttribute('id', 'modal-root');

        document.body.appendChild(modalRoot);
    });

    afterEach(() => {
        const modalRoot = document.getElementById('modal-root');

        modalRoot?.remove();
    });

    it('renders dialog when open', () => {
        render(
            <Modal
            isOpen
            onClose={vi.fn()}
            >
                <p>Content</p>
            </Modal>
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        render(
            <Modal
            isOpen={false}
            onClose={vi.fn()}
            >
                <p>Content</p>
            </Modal>
        );

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes on Escape key', async () => {
        const user = userEvent.setup();

        const onClose = vi.fn();

        render(
            <Modal
            isOpen
            onClose={onClose}
            >
                <p>Content</p>
            </Modal>
        );

        await user.keyboard('{Escape}');

        expect(onClose).toHaveBeenCalledTimes(1);
    })

    it('closes on overlay click', async () => {
        const user = userEvent.setup();

        const onClose = vi.fn();

        render(
            <Modal
            isOpen
            onClose={onClose}
            >
                <p>Content</p>
            </Modal>
        );

        await user.click(screen.getByTestId('modal-overlay'));

        expect(onClose).toHaveBeenCalledTimes(1);
    })
    
    it('does not close when clicking modal content', async () => {
        const user = userEvent.setup();

        const onClose = vi.fn();

        render(
            <Modal
            isOpen
            onClose={onClose}
            >
                <button>
                    Inside button
                </button>
            </Modal>
        );

        await user.click(screen.getByRole('button'));

        expect(onClose).not.toHaveBeenCalled();
    })

    it('has accessible dialog role', () => {
        render(
            <Modal
            isOpen
            onClose={vi.fn()}
            >
                <p>Content</p>
            </Modal>
        );

        expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });
});