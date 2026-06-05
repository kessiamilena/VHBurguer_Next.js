import Link from "next/link";
import styles from "./header.module.css";
import { useState } from "react";

const Header = () => {

    const[menuAberto, setMenuAberto] = useState(false);

    function mostrarMenu(){
        setMenuAberto(!menuAberto);
    }

    return (
        <header id={styles.header}>
            <div className={`${styles.container} layout_guide`}>
                <img src="../imgs/Logo_VH_Burguer.svg" alt="Logo do VH Burguer que contém como plano de fundo um hamburguer" id={styles.logo}/>
                <nav id={styles.nav_menu} className={menuAberto? styles.nav_menu_aberto : styles.nav_menu}>
                    <a href="#destaques">Destaques</a>
                    <a href="#cardapio">Cardápio</a>
                    <a href="#unidades">Unidades</a>
                    <Link href="/login">Login</Link>
                </nav>
                <button id={styles.btn_icon} onClick={mostrarMenu}>
                    <img src="../imgs/icon_hamburguer.svg" alt="Ícone que representa um hamburguer para acessar o menu lateral" />
                </button>
            </div>
        </header>
    )
}

export default Header;