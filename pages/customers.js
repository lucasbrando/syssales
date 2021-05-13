import styles from '../styles/Customers.module.css'
import { useSession } from 'next-auth/client'
import Cabecalho  from '../components/cabecalho'
import Rodape from '../components/rodape'
import { Button, InputGroup, Form, Accordion, Card } from 'react-bootstrap'
import { useState } from 'react'
import { api }  from '../services/api'

export default function Customers() {
    const [ session, loading ] = useSession()
    const [idProduct, setIdProduct] = useState('')
    const [nameProduct, setNameProduct] = useState('')
    const [typeProduct, setTypeProduct] = useState('')
    const [providerProduct, setProviderProduct] = useState('')
    const [brandProduct, setBrandProduct] = useState('')

    async function handleCreateProduct(e) {
        e.preventDefault()
        try { 
          await api.post('products', {
              id_product: idProduct,
              name_product: nameProduct,
              type_product: typeProduct,
              provider_product: providerProduct,
              brand_product: brandProduct
          })
          alert("Cadastro efetuado com sucesso")
          router.reload()
        } catch {
          alert("Erro, tente novamente mais tarde")
        }  
    }

    function checkGranted() {
        let loggeduser = ""
        if (session) {
          loggeduser = session.user.email  
          if (loggeduser == 'lbrandof@gmail.com' || loggeduser == process.env.ADMIN_2 ) {
            return true 
          }} else { 
          return false
        }
        console.log(loggeduser)    
    }

    return (

        checkGranted() ? (

        <div className={styles.container}>
            <Cabecalho />
            <h2>Cadastros</h2><br />
            <Accordion defaultActiveKey="0">
                <Form className="w-100" onSubmit={handleCreateProduct}>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Cadastro de Produto
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div className={styles.input_block}>
                                    <Form.Group>
                                        <InputGroup>
                                        <Form.Label column sm="12">Código do Produto:</Form.Label>
                                        <Form.Control type="text" value={idProduct} onChange={(e) => {setIdProduct(e.target.value)}}/>
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                                <div className={styles.input_block}>
                                    <Form.Group>
                                        <InputGroup>
                                        <Form.Label column sm="12">Nome do Produto:</Form.Label>
                                        <Form.Control type="text" value={nameProduct} onChange={(e) => {setNameProduct(e.target.value)}}/>
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                                <div className={styles.input_block}>
                                    <Form.Group controlId="Products.ControlSelect">
                                        <Form.Label>Tipo do Produto:</Form.Label>
                                        <Form.Control as="select" value={typeProduct} onChange={(e) => { setTypeProduct(e.target.value)}}>
                                            <option key="0" value="" defaultValue disabled hidden>Selecione...</option>
                                            <option value="Calcinha" >Calcinha</option>
                                            <option value="Sutiã" >Sutiã</option>
                                            <option value="Conjunto" >Conjunto</option>
                                            <option value="Pijama" >Pijama</option>
                                            <option value="Cueca" >Cueca</option>
                                            <option value="Meia" >Meia</option>
                                            <option value="Top" >Top</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className={styles.input_block}>
                                    <Form.Group controlId="Products.ControlSelect">
                                        <Form.Label>Fornecedor do Produto:</Form.Label>
                                        <Form.Control as="select" value={providerProduct} onChange={(e) => { setProviderProduct(e.target.value)}}>
                                            <option key="0" value="" defaultValue disabled hidden>Selecione...</option>
                                            <option value="Duforchal">Duforchal</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className={styles.input_block}>
                                    <Form.Group>
                                        <InputGroup>
                                        <Form.Label column sm="12">Marca do Produto:</Form.Label>
                                        <Form.Control type="text" value={brandProduct} onChange={(e) => {setBrandProduct(e.target.value)}}/>
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                                <Button type="submit" variant="primary" className={styles.save}>Salvar</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Form>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Cadastro de Cliente
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                                
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Rodape />
        </div>) : (
                <button onClick={() => signIn('google')}>Sign in</button>
            )    
    )
}