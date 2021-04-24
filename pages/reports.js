import styles from '../styles/Reports.module.css'
import Cabecalho  from '../components/cabecalho'

export default function Reports() {
    return (
        <div className={styles.container}>
            <Cabecalho />
            <h2>Relatórios</h2>
        </div>    
    )
}