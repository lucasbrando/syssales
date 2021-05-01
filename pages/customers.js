import styles from '../styles/Customers.module.css'
import Cabecalho  from '../components/cabecalho'
import Rodape from '../components/rodape'
import { Button, InputGroup, Form, Accordion, Card } from 'react-bootstrap'
import { useState } from 'react'

export default function Customers() {
    const [idProduct, setIdProduct] = useState('')
    const [nameProduct, setNameProduct] = useState('')
    const [typeProduct, setTypeProduct] = useState('')
    const [providerProduct, setProviderProduct] = useState('')
    const [brandProduct, setBrandProduct] = useState('')

    async function handleCreateProduct(e) {
        e.preventDefault()
        try {
          await api.post('products', {
              id_product: idCostumer,
              name_product: idProduct,
              type_product: sale,
              provider_product: dateSale,
              brand_product: priceProduct
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
        </div>    
    )
}