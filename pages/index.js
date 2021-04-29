import { signIn, signOut, useSession } from 'next-auth/client'
import styles from '../styles/Home.module.css'
import { Button, InputGroup, Form } from 'react-bootstrap'
import Cabecalho  from '../components/cabecalho'
import Rodape from '../components/rodape'
import { api } from '../services/api'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

export default function Home() {
//const [ session, loading ] = useSession()
  const [ nameClient, setNameClient ] = useState('')
  const [ nameProduct, setNameProduct ] = useState('')
  const [ priceProduct, setPriceProduct ] = useState('')
  const [ clients, setClients ] = useState([])
  const [ products, setProducts] = useState([])
  const [ dateSale, setDateSale] = useState(format(new Date(), 'dd/MM/yyyy'))

  useEffect(() => {
    async function handleClients() {
      const response = await api.get('customers')
      console.log(response)
      setClients(response.data)  
    }
    
    async function handleProducts() {
      const response = await api.get('products')
      setProducts(response.data)
    }

    handleClients();
    handleProducts();
  },[])

  function handleCreateOrder(e) {
    e.preventDefault()
    console.log({nameClient, nameProduct, priceProduct, dateSale})
  }
  
  return (

          <div className={styles.container}>
            <Cabecalho />
            <Form className="w-100" onSubmit={handleCreateOrder}>
              <div className={styles.form_fields}>
                <div className={styles.input_block}>
                  <Form.Group controlId="Clients.ControlSelect">
                    <Form.Label>Nome Cliente:</Form.Label>
                    <Form.Control as="select" value={nameClient} onChange={(e) => { setNameClient(e.target.value)}}>
                      <option key="0" value="" defaultValue disabled hidden>Selecione...</option>
                      { clients.map( client => {
                        return <option key={client.id_customer} value={client.name_customer}>{client.name_customer}</option>
                      })}
                    </Form.Control>
                  </Form.Group>
                </div> 

                <div className={styles.input_block}>
                  <Form.Group controlId="Products.ControlSelect">
                      <Form.Label>Selecione o Produto:</Form.Label>
                      <Form.Control as="select" value={nameProduct} onChange={(e) => {setNameProduct(e.target.value)}}>
                        <option value="" defaultValue disabled hidden>Selecione...</option>
                        <option value="0000">Acerto - 0000</option>
                        {products.map( product => {
                        return <option key={product.id} value={product.name +" - "+product.id}>{product.name} - {product.id}</option>
                      })}
                      </Form.Control>
                    </Form.Group>
                </div>

                <div className={styles.input_block}>
                  <Form.Group>
                    <InputGroup>
                      <Form.Label column sm="12">Data:</Form.Label>
                      <Form.Control type="text" value={dateSale} onChange={(e) => {setDateSale(e.target.value)}}/>
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className={styles.input_block}>
                  <Form.Group>
                    <InputGroup>
                      <Form.Label column sm="12">Valor:</Form.Label>
                      <InputGroup.Prepend>
                        <InputGroup.Text>R$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control type="text" value={priceProduct} onChange={(e) => {setPriceProduct(e.target.value)}}/>
                    </InputGroup>
                  </Form.Group>
                </div>
               
                <Button type="submit" variant="primary" className={styles.save}>Salvar</Button>
              </div>
            </Form>  
            <Rodape />
          </div>
  )    
}
