import Image from "next/image";
import Styles from "../styles/Discord.module.scss";
import discordImage from "../public/assets/images/discordImage.svg";


export default function Discord() {
    return (
        <div className={Styles.container}>
            <div className={Styles.image_box}>
                <Image src={discordImage} alt="discordImage" fill />
            </div>
            <div className={Styles.text_box}>
                <p className={Styles.text_p}>
                    Possui dúvidas ou quer interagir com outros usuários da comunidade Orange Juice? Acesse a nossa comunidade no <b><a href="https://discord.gg/orangejuicetech">Discord</a></b>
                </p>
            </div>
        </div>
    );
}
