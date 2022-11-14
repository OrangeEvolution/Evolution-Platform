import Styles from '../styles/Header.module.scss';
import orangeEvolution from '../public/assets/icons/orange-evo.svg';
import logoutImg from '../public/assets/icons/Logout.svg';
import Menu from '../public/assets/icons/menu.svg';

import Image from 'next/image'
import Discord from './discord';
import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';


export default function Header() {
    const [visibleMenuMobile, setVisibleMenuMobile] = useState<boolean>(false);

    return (
        <div className={Styles.container}>
            <div className={Styles.image_box}>
                <Image src={orangeEvolution} alt='Logo da Orange Evolution' />
            </div>

            <button onClick={(e) => { e.preventDefault(), setVisibleMenuMobile(!visibleMenuMobile) }}>
                <Image src={Menu} className={Styles.menuIcon} alt='' />
            </button>
            <div className={`${Styles.contentRight} ${visibleMenuMobile ? Styles.visible : ''}`}>
                <Discord />

                <div className={Styles.logout}>
                    <Image src={logoutImg} alt='Sair' />
                    <Link onClick={() => signOut()} className={Styles.buttonLogout} href={''}>Sair</Link>
                </div>
            </div>
        </div>
    );
}