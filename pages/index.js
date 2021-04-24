import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Button, FormControl, InputGroup, Form } from 'react-bootstrap'
import Cabecalho  from '../components/cabecalho'

export default function Home() {
  return (

      <div className={styles.container}>
      <Cabecalho />
      <div className={styles.form_fields}>
        <div className={styles.input_block}>
          <Form.Group controlId="Clients.ControlSelect">
            <Form.Label>Nome Cliente:</Form.Label>
            <Form.Control as="select">
              <option value="">Selecione...</option>
              <option value="123">Katia - Raio de Sol</option>
              <option value="234">Gloria - Familia</option>
              <option value="345">Josi - Igreja</option>
              <option value="456">Cleide - Externo</option>
            </Form.Control>
          </Form.Group>
        </div> 

        <div className={styles.input_block}>
          <Form.Group controlId="Products.ControlSelect">
              <Form.Label>Selecione o Produto:</Form.Label>
              <Form.Control as="select">
                <option value="">Selecione...</option>
                <option value="0000">Acerto - 0000</option>
                <option value="6307">Calcinha - 6307</option>
                <option value="5966">Conjunto - 5966</option>
                <option value="5135">Calcinha - 5135</option>
                <option value="6086">Pijama - 6086</option>
              </Form.Control>
            </Form.Group>
        </div>

        <div className={styles.input_block}>
          <Form.Group>
            <InputGroup>
              <Form.Label column sm="12">Valor do Produto:</Form.Label>
              <InputGroup.Prepend>
                <InputGroup.Text>R$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text" />
            </InputGroup>
          </Form.Group>
        </div>

        <div className={styles.input_block}>
          <Form.Group>
            <InputGroup>
              <Form.Label column sm="12">Desconto:</Form.Label>
              <InputGroup.Prepend>
                <InputGroup.Text>R$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text"/>
            </InputGroup>
          </Form.Group>
        </div>

        <div className={styles.input_block}>
          <Form.Group>
            <InputGroup>
              <Form.Label column sm="12">Total:</Form.Label>
              <InputGroup.Prepend>
                <InputGroup.Text>R$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text"/>
            </InputGroup>
          </Form.Group>
        </div>

        <Button variant="primary" className={styles.save}>Salvar</Button>
      </div>
        <div className={styles.menu_footer}>
          <Link href="/clients">
            <Button variant="dark">Clientes</Button>
          </Link>
          <Link href="/">
            <Button variant="dark">Vendas/Acerto</Button>
          </Link>
          <Link href="/reports">
            <Button variant="dark">Relatórios</Button>
          </Link>
        </div>
      </div>    
  )
}
