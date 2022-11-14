import Header from '../../../components/Header';
import Styles from '../../../styles/CardContent.module.scss'
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { findById, findFullTrailById, findFullTrailByIdAndProgress } from "../../../services/trails";
import { Trail } from "../../../Types/Trail";

import React from "react";
import { findAll } from "../../../services/contentType";
import { findAll as findAllContent } from "../../../services/category";
import { findAll as findAllProgress, findContentId } from "../../../services/contentProgress";
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { ContentTpe } from '../../../Types/ContentType';
import Head from 'next/head';

type TrailProps = {
  trail: any;
  contentsTypes: ContentTpe[];
}
export default function ContentDetails({ trail, contentsTypes }: TrailProps) {
  const { data: session } = useSession();

  function getContentTypeName(id: number): string {
    let typeName = `${id}`;

    for (let i = 0; i < contentsTypes.length; i++) {
      if (contentsTypes[i].id == id) {
        typeName = contentsTypes[i].name;
      }
    }

    return typeName;
  }

  function getProgressName(progress: string) {
    switch (progress) {
      case 'CONCLUDED':
        return 'Concluido';
        break;
      case 'NOT_COMPLETED':
        return 'Não concluído';
      default:
        return progress;
        break;
    }
  }

  return (
    <>
      <div className={Styles.container}>
        <Head>
          <title>Trilha {trail.name} | Orange Evolution</title>
        </Head>

        <Header />

        <div className={Styles.welcome}>
          <div className={Styles.user}>
            <p>Olá, {session?.user.name}!</p>
            <span>Você está na trilha de <span className={Styles.trailname}>{trail.name}</span></span>
          </div>
        </div>

        {trail.categories.map((category) => (
          <div className={Styles.content} key={category.id}>

            <div className={Styles.category}>
              <p>{category.name}</p>
            </div>

            <div className={Styles.contents}>
              <ul>
                <li>
                  {category.contents.map((content) => (
                    <Link href={content.link} target='_blank' className={Styles.items} key={content.id}>
                      <p><strong>{content.description}</strong></p>
                      <ul>
                        <li>{getContentTypeName(content.contentType)}</li>
                        <li>{content.durationInMinutes} minutos</li>
                        <li>{getProgressName(content.progressEnum)}</li>
                        <li>{content.partner}</li>
                      </ul>
                    </Link>
                  ))}
                </li>
              </ul>

            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const trail = await findFullTrailByIdAndProgress(context.query.id, session?.user.token);
  const contentType = await findAll(session?.user.token);
  const categories = await findAllContent(session?.user.token);

  return {
    props: {
      trail,
      contentsTypes: contentType._embedded.contentTypeVOList,
      categories: categories._embedded.categoryVOList
    }
  }
}
