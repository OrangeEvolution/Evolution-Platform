import Image from 'next/image';
import styles from './Modal.module.scss';

import CloseButton from '../../public/assets/icons/close-button.svg';

type ModalProps = {
    children: React.ReactNode;
    openModal: boolean;
    closeModal: () => void;
    classModal?: string;
    classOverlay?: string;
}

export default function Modal({ children, openModal, closeModal, classModal, classOverlay }: ModalProps) {
    return (
        <div className={styles.container}>
            {openModal &&
                <>
                    <div
                        className={classOverlay ?? styles.overlay}
                        style={{ zIndex: 99 }}
                        onClick={closeModal}
                    >
                        <div
                            className={classModal ?? styles.modal}
                            style={{ zIndex: 100, position: 'relative' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {children}
                            <button className={styles.buttonClose} onClick={closeModal}>
                                <Image src={CloseButton} width='40' height='40' alt="Fechar modal" />
                            </button>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}