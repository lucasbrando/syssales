import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'
import { Button, InputGroup, Form, Table } from 'react-bootstrap'
import Cabecalho  from '../components/cabecalho'
import Rodape from '../components/rodape'
import { api } from '../services/api'
import { useEffect, useState } from 'react'
import moment from 'moment'

export default function Home() {
  const [ session, loading ] = useSession()
  const router = useRouter()
  const [ idCostumer, setIdCostumer ] = useState('')
  const [ idProduct, setIdProduct ] = useState('')
  const [ priceProduct, setPriceProduct ] = useState('')
  const [ clients, setClients ] = useState([])
  const [ products, setProducts] = useState([])
  const [ sale, setSale ] = useState(true)
  const [ dateSale, setDateSale] = useState(moment().utc().format("YYYY-MM-DD"))
  const [ createdAt, setCreatedAt ] = useState(moment().utc().format())
  const [ lastSales, setLastSales ] = useState([])

  useEffect(() => {

    async function handleClients() {
      const response = await api.get('customers')
      setClients(response.data)  
    }
    
    async function handleProducts() {
      const response = await api.get('products')
      setProducts(response.data)
    }

    async function handlelastSales() {
      try {
          const response = await api.get('lastsales', {
            params: {
              maxrows: 3
            }
          })
          setLastSales(response.data)
          console.log(lastSales) 
      } catch {
  
      }
          
    }
    console.log('dateSale ' + dateSale)
    console.log('createdAt ' + createdAt)
    handlelastSales()
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

  function handleDate(dateconvert) {
    const dateresult = moment(dateconvert).format("YYYY-MM-DD")
    console.log(dateresult)
    setDateSale(dateresult)

  }
  
  return (
        <>

          { !session && <>
            {console.log("Google ID " + process.env.GOOGLE_CLIENT_ID)}
            {console.log("Google Secret " + process.env.GOOGLE_CLIENT_SECRET)}
            <button onClick={() => signIn('google')}>Sign in</button>
          </>}
          
          {
            session && <>

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
                      <Form.Control type="date" value={dateSale} onChange={(e) => {handleDate(e.target.value)}}/>
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
                <br /><br />

                <h4>Últimas 3 vendas</h4>

                <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Cliente:</th>
                                    <th>Produto:</th>
                                    <th>Valor:</th>
                                    <th>Venda:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lastSales.map( lastsale => {
                                    return (
                                    <tr key={lastsale.id_sale}>
                                        <td>{lastsale.name_customer}</td>
                                        <td>{lastsale.name_product}</td>
                                        <td>R$ {lastsale.price_product}</td>
                                        <td>{moment(lastsale.date_sale).add(1, 'd').format("DD/MM/YYYY")}</td>
                                    </tr>
                                )})
                                }
                            </tbody>
                        </Table>
              </div>
            </Form>  
            <Rodape />
          </div>
        </>}
  </>)    
}
