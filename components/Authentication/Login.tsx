import { useState } from 'react';
import { notifyError } from '../../util/notifyToast';

import styles from './Authentication.module.scss';
import eye from '../../public/assets/icons/eye.svg';
import eyeOff from '../../public/assets/icons/eye-off.svg';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

type LoginProps = {
    showRegisterForm: (status: boolean) => void;
}

export default function Login({ showRegisterForm }: LoginProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmitLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email !== '' && password !== '') {
            signIn('credentials', { username: email, password });
        } else {
            notifyError('Preencha todos os campos do formulário');
        }
    }

    return (
        <div className={styles.container}>
            <h2>Faça login ou cadastre-se</h2>
            <form onSubmit={handleSubmitLoginForm}>
                <input type="email" placeholder='Endereço de E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div>
                    <input type={showPassword ? 'text' : 'password'} placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={(e) => (e.preventDefault(), setShowPassword(!showPassword))}>
                        <Image src={showPassword ? eye : eyeOff} alt="Exibir/Ocultar senha" />
                    </button>
                </div>

                <button>Entrar</button>
                <span>Não possui conta?</span>
                <button className={styles.buttonRegister} onClick={(e) => { e.preventDefault(), showRegisterForm(false) }}>Criar nova conta</button>

                <span>
                    Ao informar meus dados, estou ciente das<br />
                    diretrizes da <a href="https://fcamara-images.s3.amazonaws.com/site-fcamara/politica-privacidade.pdf" target='_blank' rel="noreferrer">Política de Privacidade</a>.
                </span>
            </form >
        </div >
    )
}