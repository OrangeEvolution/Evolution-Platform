import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Styles from '../../styles/CardContent.module.scss'
export default function Home() {
    return (
      <div className={Styles.container}>
        <Header />
        <div className={Styles.box_nameUser}>
          <p>Mateus Carlos</p>
          <p> Voce esta na trilha: UX</p>
        </div>
  
        <div className={Styles.category_box}>
          <p className={Styles.category_text}><b>Nome Categoria</b></p>
        </div>
        <div className={Styles.container_category}>
          <div className={Styles.container_content}>
            <div className={Styles.box_title}>
              <p className={Styles.text_title}>aaaa</p>
            </div>
            <div className={Styles.box_description}>
              <p className={Styles.text_description}>aaaaaa</p>
            </div>
            <div className={Styles.box_info}>
              <div className={Styles.text_info}>
                <p>aaaa</p>
              </div>
  
              <div className={Styles.text_info}>
                <p>123</p>
              </div>
  
              <div className={Styles.text_info}>
                <p>adsadasd</p>
              </div>
              <div className={Styles.text_info}>
                <a>asdsads</a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
  
      </div>
  
  
    );
  }