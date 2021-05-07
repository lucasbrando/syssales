import styles from '../styles/Cabecalho.module.css'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Cabecalho() {
  const [ session, loading ] = useSession()

    return ( 
          <div className={styles.cabecalho}>
            <div className={styles.logo}>
              <img src="/static/adama-logotipo.png" width={32} height={32} />
            </div>  
            <div className={styles.title}>
              Sistemas de Gerenciamento de Vendas
            </div>
            <div className={styles.avatar}>
              { session ? (
                <img src="/static/avatar-naiara.png" width={32} height={32} />
               ) : (
                <img src="/static/avatar-nobody.png" width={32} height={32} /> 
               )
               } 
              
              
            </div>
          </div>
    )
}