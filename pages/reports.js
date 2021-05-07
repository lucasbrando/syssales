import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { api } from '../services/api'
import { Button, InputGroup, Form, Table, Accordion, Card } from 'react-bootstrap'
import styles from '../styles/Reports.module.css'
import Cabecalho  from '../components/cabecalho'
import Rodape from '../components/rodape'
import moment from 'moment'


export default function Reports() {
    const [ session, loading ] = useSession()
    const [ lastSales, setLastSales ] = useState([])
    const today = moment()
    const lastday = moment().subtract(7, 'd')
    const [ dateToday, setDateToday ] = useState(today.format('YYYY-MM-DD'))
    const [ lastDays, setLastDays ] = useState(lastday.format('YYYY-MM-DD'))
    const [ customers, setCustomers ] = useState([])
    const [ idCostumer, setIdCostumer ] = useState('')
    const [ customersreport, setCustomerReport ] = useState('')

    async function handleCustomersReport() {

    }
    
    
    useEffect(() => {

    async function handleCustomers() {
        const response = await api.get('customers')
        setCustomers(response.data)  
    }
    
    async function handlelastSales() {
        try {
            const response = await api.get('sales')
            setLastSales(response.data)  
        } catch {
    
        }
            
    }
    handleCustomers()
    handlelastSales()
    },[])
    return (
        <div className={styles.container}>
            <Cabecalho />
            <h2>Relatórios</h2>
            <br /><br />

            <Accordion defaultActiveKey="0" className='w-100'>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Relatórios - Últimas Vendas
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div className={styles.input_block}>
                            <Form.Group>
                                <InputGroup>
                                <Form.Label column sm="12">Data Inicial:</Form.Label>
                                <Form.Control type="date" min={dateToday} value={lastDays} onChange={(e) => {setLastDays(e.target.value)}}/>
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className={styles.input_block}>
                            <Form.Group>
                                <InputGroup>
                                <Form.Label column sm="12">Data Final:</Form.Label>
                                <Form.Control type="date" max={dateToday} value={dateToday} onChange={(e) => {setDateToday(e.target.value)}}/>
                                </InputGroup>
                            </Form.Group>
                        </div>

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
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Relatório por Cliente
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <div className={styles.input_block}>
                            <Form.Group controlId="Clients.ControlSelect">
                                <Form.Label>Nome Cliente:</Form.Label>
                                <Form.Control as="select" value={idCostumer} onChange={(e) => { setIdCostumer(e.target.value) }}>
                                <option key="0" value="" defaultValue disabled hidden>Selecione...</option>
                                { customers.map( customer => {
                                    return <option key={customer.id_customer} value={customer.id_customer}>{customer.name_customer}</option>
                                })}
                                </Form.Control>
                            </Form.Group>
                        </div>

                        <div className={styles.input_block}>
                            <Form.Group>
                                <InputGroup>
                                <Form.Label column sm="12">Data Inicial:</Form.Label>
                                <Form.Control type="text" value={lastDays} onChange={(e) => {setLastDays(e.target.value)}}/>
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className={styles.input_block}>
                            <Form.Group>
                                <InputGroup>
                                <Form.Label column sm="12">Data Final:</Form.Label>
                                <Form.Control type="text" value={dateToday} onChange={(e) => {setDateToday(e.target.value)}}/>
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <Button type="submit" onClick={handleCustomersReport} variant="primary" className={styles.save}>Buscar</Button>

                        {customersreport && 
                            <Table striped bordered hover>
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
                                        <td>{lastsale.created_at}</td>
                                    </tr>
                                )})
                                }
                            </tbody>
                        </Table>


                        }
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>            
            
            <Rodape />
        </div>    
    )
}