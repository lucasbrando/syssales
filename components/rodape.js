import styles from '../styles/Rodape.module.css'
import Link from 'next/link'
import { Button } from 'react-bootstrap'

export default function Rodape() {
    return ( 
        <div className={styles.menu_footer}>
            <Link href="/customers">
                <Button variant="dark">Cadastros</Button>
            </Link>
            <Link href="/">
                <Button variant="dark">Vendas/Acerto</Button>
            </Link>
            <Link href="/reports">
                <Button variant="dark">Relatórios</Button>
            </Link>
      </div>
    )
}