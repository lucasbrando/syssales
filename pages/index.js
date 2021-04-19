import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Button } from 'react-bootstrap'

export default function Home() {
  return (
      <div className={styles.container}>
        <div className={styles.cabecalho}>
          Sistemas de Gerenciamento de Vendas
        </div>

        <div className={styles.input_block}>
          <label htmlFor='name_client'>Nome Cliente</label>
          <select name="name_client" id="name_client">
              <option value="">Selecione...</option>
              <option value="123">Katia - Raio de Sol</option>
              <option value="234">Gloria - Familia</option>
              <option value="345">Josi - Igreja</option>
              <option value="456">Cleide - Externo</option>
          </select>
        </div>

        <div className={styles.input_block}>
          <label htmlFor="name_product">Selecione o Produto:</label>
          <select name="name_product" id="name_product">
              <option value="">Selecione...</option>
              <option value="0000">Acerto - 0000</option>
              <option value="6307">Calcinha - 6307</option>
              <option value="5966">Conjunto - 5966</option>
              <option value="5135">Calcinha - 5135</option>
              <option value="6086">Pijama - 6086</option>
          </select>
        </div>

        <div className={styles.input_block}>
          <label htmlFor='value_product'>Valor Produto - R$:</label>
          <input id='value_product' />
        </div>

        <div className={styles.input_block}>
          <label htmlFor='discount'>Desconto - R$:</label>
          <input id='discount' />
        </div>

        <div className={styles.input_block}>
          <label htmlFor="type">Tipo:</label>
          <select name="type" id="type">
              <option value="0">Compra</option>
              <option value="1">Acerto</option>
          </select>
        </div>

        <div className={styles.input_block}>
          <label htmlFor='total'>Total - R$:</label>
          <input id='total' />
        </div>

        <div className={styles.menu_footer}>
          <Link href="">
            <Button variant="primary">Clientes</Button>
          </Link>
          <Link href="">
          <Button variant="primary">Vendas/Acerto</Button>
          </Link>
          <Link href="">
          <Button variant="primary">Relatórios</Button>
          </Link>
        </div>
      </div>    
  )
}
