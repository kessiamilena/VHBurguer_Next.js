import styles from "./sub-header.module.css";
import Link from "next/link";

const SubHeader = () => {
    return (
        <header className={styles.header}>
            <div className={`${styles.container} layout_guide`}>
                <img src="../imgs/Logo_footer.svg" alt="Logo do VH Burguer que contém como plano de fundo um hamburguer"
                    className={styles.logo_vhburguer}/>
                <Link href="/home#cardapio">Voltar</Link>
            </div>
        </header>
    )
}

export default SubHeader;