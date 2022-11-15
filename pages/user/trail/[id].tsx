import Header from '../../../components/Header';
import Styles from '../../../styles/CardContent.module.scss'
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { findById, findFullTrailById, findFullTrailByIdAndProgress } from "../../../services/trails";
import { Trail } from "../../../Types/Trail";

import React, { useState } from "react";
import { findAll } from "../../../services/contentType";
import { findAll as findAllContent } from "../../../services/category";
import { findAll as findAllProgress, findContentId, updateProgress } from "../../../services/contentProgress";
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { ContentTpe } from '../../../Types/ContentType';
import Head from 'next/head';
import Modal from '../../../components/Modal';
import { Content } from '../../../Types/Content';
import { notifySuccess } from '../../../util/notifyToast';
import { useRouter } from 'next/router';

type TrailProps = {
  trail: any;
  contentsTypes: ContentTpe[];
}
export default function ContentDetails({ trail, contentsTypes }: TrailProps) {
  const router = useRouter();
  const pageTitle = `Trilha ${trail?.name} | Orange Evolution`;

  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [content, setContent] = useState<Content>();

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

  function handleOpenModalContent(content: Content) {
    setContent(content);
    setOpenModal(true);
  }

  async function handleUpdateContentProgress(content: Content, progress: string) {
    const res = await updateProgress(content.progress, {
      content: content.id,
      user: session?.user.id,
      status: progress,
      id: content.progress
    }, session?.user.token);

    notifySuccess(`Status de progresso no conteúdo alterado com sucesso.`);
    setOpenModal(false);
    router.reload();
  }

  return (
    <>
      <div className={Styles.container}>
        <Head>
          <title>{pageTitle}</title>
        </Head>

        <Header />

        <Modal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
        >
          <div className={Styles.modalContent}>
            <h2>Informações sobre o conteúdo</h2>
            <ul>
              <li><strong>Título:</strong> <span>{content?.description}</span></li>
              <li><strong>Tipo: </strong> <span>{getContentTypeName(content?.contentType)}</span></li>
              <li><strong>Duração: </strong><span>{content?.durationInMinutes} minutos</span></li>
              <li><strong>Status: </strong><span>{getProgressName(content?.progressEnum)}</span></li>
              <li><strong>Conteúdo por: </strong><span>{content?.partner}</span></li>
              <li>
                <Link href={content?.link!} target="_blank">Acessar conteúdo</Link>
              </li>
              <li>
                {content?.progressEnum === 'NOT_COMPLETED'
                  ? <button onClick={(e) => { e.preventDefault(), handleUpdateContentProgress(content, 'CONCLUDED') }}>Alterar status para concluído</button>
                  : <button onClick={(e) => { e.preventDefault(), handleUpdateContentProgress(content, 'NOT_COMPLETED') }} className={Styles.notCompleted}>Alterar status para não concluído</button>}
              </li>
            </ul>
          </div>
        </Modal>

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
                    <button className={Styles.items} key={content.id} onClick={(e) => { e.preventDefault(), handleOpenModalContent(content) }}>
                      <p><strong>{content.description}</strong></p>
                      <ul>
                        <li>{getContentTypeName(content.contentType)}</li>
                        <li>{content.durationInMinutes} minutos</li>
                        <li>{getProgressName(content.progressEnum)}</li>
                        <li>{content.partner}</li>
                      </ul>
                    </button>
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

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

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
