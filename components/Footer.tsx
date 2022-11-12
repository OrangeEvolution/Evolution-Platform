import Image from "next/image";
import Styles from "../styles/Footer.module.scss";
import fCamara from "../assets/fCamara.png";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={Styles.container}>
      <div className={Styles.image_row}>
        <div className={Styles.image_box}>
          <Image src={fCamara} alt="fCamara" fill />
        </div>
        <div className={Styles.social_row}>
          <div className={Styles.white_box}>
            <a
              href="https://www.facebook.com/orangejuicefc/"
              target={"_blank"}
              rel="noreferrer"
            >
              <FaFacebookF size={20} color="black" />
            </a>
          </div>
          <div className={Styles.white_box}>
            <a
              href="https://www.instagram.com/orangejuicetech/"
              target={"_blank"}
              rel="noreferrer"
            >
              <AiFillInstagram size={24} color="black" />
            </a>
          </div>
          <div className={Styles.white_box}>
            <a
              href="https://www.linkedin.com/company/orangejuicetech/"
              target={"_blank"}
              rel="noreferrer"
            >
              <FaLinkedin size={20} color="black" />
            </a>
          </div>
          <div className={Styles.white_box}>
            <a
              href="https://www.youtube.com/c/OrangeJuicefc"
              target={"_blank"}
              rel="noreferrer"
            >
              <FaYoutube size={22} color="black" />
            </a>
          </div>
        </div>
      </div>
      <p className={Styles.address}>
        Onde Estamos: São Paulo, MATRIZ - Rua Bela Cintra, 986 - 2º andar
        Consolação, São Paulo - SP -Santos FILIAL: Praça dos Expedicionários, 19
        Sala 22 Gonzaga, Santos - SP
      </p>
    </footer>
  );
}
