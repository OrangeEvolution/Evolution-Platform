import Header from '../../../components/Header';
import Styles from '../../../styles/CardContent.module.scss'
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { findById, findFullTrailById } from "../../../services/trails";
import { Trail } from "../../../Types/Trail";



import React from "react";
import { findAll } from "../../../services/contentType";
import { findAll as findAllContent } from "../../../services/category";
import Footer from '../../../components/Footer';
import Link from 'next/link';

type TrailProps = {
  trail: any;
}
export default function ContentDetails({ trail }: TrailProps) {
  const { data: session } = useSession();
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.welcome}>
          <p>Olá, {session?.user.name}!</p>
          <span>Você está na trilha:</span><p>{trail.name}</p>
        </div>

        {trail.categories.map((category) => (
          <>
            <div className={Styles.categoria}><h1>{category.name}</h1></div>


            <div className={Styles.contents}>
              <ul>
                <li>
                  {category.contents.map((content) => (
                    <>
                      <h2>{content.description}</h2>
                      <div className={Styles.info_content}>
                        <ul>
                          <li className={Styles.contentType}>{content.contentType}</li>
                          <li className={Styles.durationInMinutes}>{content.durationInMinutes} minutos</li>
                          <li className={Styles.partner}>{content.partner}</li>
                          <li className={Styles.linkContent}><><Link href={content.link}>Acesse o conteudo</Link></></li>
                        </ul>

                      </div>
                    </>
                  ))}
                </li>
              </ul>


            </div>
          </>
        ))}
      </div>
      <Footer />
    </>
  );

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const trail = await findFullTrailById(context.query.id, session?.user.token);
  const contentType = await findAll(session?.user.token);
  const categories = await findAllContent(session?.user.token);

  console.log(categories._embedded.categoryVOList)

  return {
    props: {
      trail,
      contentsTypes: contentType._embedded.contentTypeVOList,
      categories: categories._embedded.categoryVOList
    }
  }
}
