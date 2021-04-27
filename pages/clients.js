import styles from '../styles/Clients.module.css'
import Cabecalho  from '../components/cabecalho'
import Rodape from '../components/rodape'

export default function Clients() {
    return (
        <div className={styles.container}>
            <Cabecalho />
            <h2>Cadastro de Clientes</h2>
            <h3>Em breve</h3>
            <Rodape />
        </div>    
    )
}