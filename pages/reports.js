import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { Button, InputGroup, Form, Table } from 'react-bootstrap'
import { format } from 'date-fns'
import styles from '../styles/Reports.module.css'
import Cabecalho  from '../components/cabecalho'
import Rodape from '../components/rodape'


export default function Reports() {
    const [lastSales, setLastSales] = useState([])



    
    
    useEffect(() => {
    
    async function handlelastSales() {
        try {
            const response = await api.get('sales')
            console.log(response)
            setLastSales(response.data)
            console.log(lastSales)  
        } catch {
    
        }
            
    }

    handlelastSales()
    },[])
    return (
        <div className={styles.container}>
            <Cabecalho />
            <h2>Relatórios</h2>

            <h4>Vendas dos últimos 7 dias</h4>
            
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
            <Rodape />
        </div>    
    )
}