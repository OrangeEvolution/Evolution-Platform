import Styles from '../styles/Header.module.scss';
import orangeEvolution from '../public/assets/images/orange-evo.svg';
import logoutImg from '../public/assets/icons/Logout.svg';

import Image from 'next/image'
import Discord from './discord';
export default function Header() {
    return (
        <div className={Styles.container}>
            <div className={Styles.image_box}>
                <Image src={orangeEvolution} alt='Logo da Orange Evolution' />
            </div>
            <Discord />

            <div className={Styles.logout}>
                <Image src={logoutImg} alt='Sair' />
                <a className={Styles.buttonLogout}>Sair</a>
            </div>
        </div>
    );
}