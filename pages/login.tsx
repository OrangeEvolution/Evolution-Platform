import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

import styles from '../styles/Login.module.scss';
import Image from 'next/image';

export default function Login() {
    const { data: session } = useSession();

    console.log(session?.user)

    return (
        <div className={styles.container}>
            {!session
                ? <>
                    <button onClick={(e) => { e.preventDefault(), signIn('github') }}>Login pelo GitHub</button>
                    <button onClick={(e) => { e.preventDefault(), signIn('google') }}>Login pelo Google</button>
                    <button onClick={(e) => { e.preventDefault(), signIn('facebook') }}>Login pelo Facebook</button>
                </>
                : <>
                    <img className={styles.photo} src={session?.user?.image!} alt="Foto de Perfil" />
                    Id: {session.user?.name} <br />
                    E-mail: {session.user?.email}
                    <button onClick={(e) => { e.preventDefault(), signOut() }}>Deslogar</button>
                </>
            }
        </div>
    )
}