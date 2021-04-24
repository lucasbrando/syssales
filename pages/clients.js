import styles from '../styles/Clients.module.css'
import Cabecalho  from '../components/cabecalho'

export default function Clients() {
    return (
        <div className={styles.container}>
            <Cabecalho />
            <h2>Clientes</h2>
        </div>    
    )
}