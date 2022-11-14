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
                      <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, accusamus eaque beatae delectus omnis magnam deleniti cum velit alias ipsum exercitationem commodi?</span>

                      <ul>
                        <li>{getContentTypeName(content.contentType)}</li>
                        <li>{content.durationInMinutes} minutos</li>
                        <li>Em andamento</li>
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

  const trail = await findFullTrailById(context.query.id, session?.user.token);
  const contentType = await findAll(session?.user.token);
  const categories = await findAllContent(session?.user.token);

  console.log(contentType._embedded.contentTypeVOList)

  return {
    props: {
      trail,
      contentsTypes: contentType._embedded.contentTypeVOList,
      categories: categories._embedded.categoryVOList
    }
  }
}
