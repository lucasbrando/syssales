import styles from '../styles/Cabecalho.module.css'
import { signOut, useSession } from 'next-auth/client'

export default function Cabecalho({user}) {
  const [ session, loading ] = useSession()

    return ( 
          <div className={styles.cabecalho}>
            <div className={styles.logo}>
              <img src="/static/adama-logotipo.png" width={32} height={32} />
            </div>  
            <div className={styles.title}>
              Sistemas de Gerenciamento de Vendas
            </div>
            <div className={styles.avatar} onClick={() => signOut()}>
              { (session && session.user.email == process.env.ADMIN_1) ? (
                <>
                  <img src="/static/avatar-naiara.png" width={32} height={32} />
                  <span className={styles.username}>{session.user.name}</span>
                </> 
               ) : (
                <> 
                  <img src="/static/avatar-nobody.png" width={32} height={32} />
                  <span className={styles.username}>{session.user.name}</span>
                </> 
               )
               } 
              
              
            </div>
          </div>
    )
}