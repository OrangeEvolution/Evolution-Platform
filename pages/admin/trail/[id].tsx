import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { findById, findFullTrailById } from "../../../services/trails";
import { Trail } from "../../../Types/Trail";

import styles from '../../../styles/TrailDetails.module.scss';
import Image from "next/image";

import TrailImage from '../../../public/assets/images/trails.svg';
import Link from "next/link";

type TrailProps = {
    trail: any;
}

export default function TrailDetails({ trail }: TrailProps) {
    console.log(trail)

    return (
        <div className={styles.container}>
            <div className={styles.details}>
                <header>
                    <Image src={TrailImage} alt='Imagem da trilha' />
                    <span>
                        Trilha {trail.name}
                    </span>
                </header>
                <div className={styles.content}>
                    <Link href='/admin/content/create-content'>Adicionar um novo material</Link>
                </div>
            </div>

            <div className={styles.contents}>
                <span>Atualizar um material existente</span>
                <ul>
                    {trail.categories.map((category) => (
                        <li>
                            {category.name}
                            <ul>
                                {category.contents.map((content) => <Link href={'#'}><li>{content.description}</li></Link>)}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    const trail = await findFullTrailById(context.query.id, session?.user.token);

    console.log(trail)

    return {
        props: {
            trail
        }
    }
}