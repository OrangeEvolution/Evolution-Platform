import { useState } from 'react';
import { notifyError } from '../../util/notifyToast';

import styles from './Authentication.module.scss';
import eye from '../../public/assets/icons/eye.svg';
import eyeOff from '../../public/assets/icons/eye-off.svg';
import Image from 'next/image';

type RegisterProps = {
    setShowLoginForm: (status: boolean) => void;
}

export default function Register({ setShowLoginForm }: RegisterProps) {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);

    const handleSubmitRegisterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name !== '' && email != '' && password !== '') {
            if (password === confirm) {

            } else {
                notifyError('As senhas não conferem!')
            }
        } else {
            notifyError('Preencha todos os campos do formulário de cadastro')
        }
    }

    return (
        <div className={`${styles.container} ${styles.containerRegister}`}>
            <h2>Faça login ou cadastre-se</h2>
            <form onSubmit={handleSubmitRegisterForm}>
                <input type="text" placeholder='Nome Completo' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder='Endereço de E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div>
                    <input type={showPassword ? 'text' : 'password'} placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={(e) => (e.preventDefault(), setShowPassword(!showPassword))}>
                        <Image src={showPassword ? eye : eyeOff} alt="Exibir/Ocultar senha" />
                    </button>
                </div>

                <div>
                    <input type={showConfirm ? 'text' : 'password'} placeholder='Confirmar a senha' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                    <button onClick={(e) => (e.preventDefault(), setShowConfirm(!showConfirm))}>
                        <Image src={showConfirm ? eye : eyeOff} alt="Exibir/Ocultar senha" />
                    </button>
                </div>


                <button className={styles.buttonRegister}>Criar conta nova</button>
                <span>Já possui conta?</span>
                <button className={styles.buttonLogin} onClick={(e) => { e.preventDefault(), setShowLoginForm(true) }}>Faça Login</button>

                <span>
                    Ao informar meus dados, estou ciente das<br />
                    diretrizes da <a href="https://fcamara-images.s3.amazonaws.com/site-fcamara/politica-privacidade.pdf" target='_blank'>Política de Privacidade</a>.
                </span>
            </form >
        </div >
    )
}