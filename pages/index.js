import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'
import { Button, InputGroup, Form } from 'react-bootstrap'
import Cabecalho  from '../components/cabecalho'
import Rodape from '../components/rodape'
import { api } from '../services/api'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

export default function Home() {
//const [ session, loading ] = useSession()
  const router = useRouter()
  const [ idCostumer, setIdCostumer ] = useState('')
  const [ idProduct, setIdProduct ] = useState('')
  const [ priceProduct, setPriceProduct ] = useState('')
  const [ clients, setClients ] = useState([])
  const [ products, setProducts] = useState([])
  const [ sale, setSale ] = useState(true)
  const [ dateSale, setDateSale] = useState(format(new Date(), 'dd/MM/yyyy'))
  const createdAt = format(new Date(), 'dd/MM/yyyy - HH:mm:ss')

  useEffect(() => {
    async function handleClients() {
      const response = await api.get('customers')
      setClients(response.data)  
    }
    
    async function handleProducts() {
      const response = await api.get('products')
      setProducts(response.data)
    }

    handleClients();
    handleProducts();
  },[])

  async function handleCreateOrder(e) {
    e.preventDefault()
    try {
      await api.post('sales', {
          id_client: idCostumer,
          id_product: idProduct,
          sale: sale,
          date_sale: dateSale,
          price_product: priceProduct,
          created_at: createdAt
        })
        alert("Cadastro efetuado com sucesso")
        router.reload()
    } catch {
      alert("Erro, tente novamente mais tarde")
    }  
  }
  
  return (

          <div className={styles.container}>
            <Cabecalho />
            <Form className="w-100" onSubmit={handleCreateOrder}>
              <div className={styles.form_fields}>
                <div className={styles.input_block}>
                  <Form.Group controlId="Clients.ControlSelect">
                    <Form.Label>Nome Cliente:</Form.Label>
                    <Form.Control as="select" value={idCostumer} onChange={(e) => { setIdCostumer(e.target.value) }}>
                      <option key="0" value="" defaultValue disabled hidden>Selecione...</option>
                      { clients.map( client => {
                        return <option key={client.id_customer} value={client.id_customer}>{client.name_customer}</option>
                      })}
                    </Form.Control>
                  </Form.Group>
                </div> 

                <div className={styles.input_block}>
                  <Form.Group controlId="Products.ControlSelect">
                      <Form.Label>Selecione o Produto:</Form.Label>
                      <Form.Control as="select" value={idProduct} onChange={(e) => { setIdProduct(e.target.value)}}>
                        <option value="" defaultValue disabled hidden>Selecione...</option>
                      { products.map( product => {
                        return <option key={product.id_product} value={product.id_product}>{product.type_product} - {product.id_product}</option>
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
