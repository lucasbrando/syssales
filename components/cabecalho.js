import styles from '../styles/Cabecalho.module.css'

export default function Cabecalho() {
    return ( 
          <div className={styles.cabecalho}>
            <div className={styles.logo}>
              Logo
            </div>  
            <div className={styles.title}>
              Sistemas de Gerenciamento de Vendas
            </div>
            <div className={styles.avatar}>
              Avatar
            </div>
          </div>
    )
}