'use client';
import * as React from 'react';
import styles from './landingPage.module.css';
import Link from 'next/link'
import { Box } from '@mui/material';
import Drawer from '../components/common/drawer/drawer';
import InvoiceForm from '../components/invoice/form/invoiceForm'
import useDrawer from '../hooks/useDrawer';
import UseContext from '@/hooks/useContext';
import { Invoice } from '@/models/interfaces/invoice';

const invoiceRow = (invoice: Invoice) => {

  return (
    <div 
      key={invoice.id} 
      className={styles.invoiceRow}
    >
      <Link
        href={{
          pathname: '/invoices/details/[id]',
          query: { id: invoice.id },
        }}
      >
        <div className={styles.invoiceRowCont}>
          <div>
            #{invoice.id}
          </div>
          <div className="gray-text">
            {invoice.createdAt}
          </div>
          <div className="gray-text">
            {invoice.clientName}
          </div>
          <h3>
            ${invoice.total}
          </h3>
          <div className={`status-${invoice?.status}`}>
            {invoice.status}
          </div>
          <div>
            {">"}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function LandingPage() {

  const { invoices, setInvoices } = React.useContext(UseContext);
  const [invoiceList, setInvoiceList] = React.useState<Array<Invoice>>([...invoices]);
  const { toggleDrawer, drawerState } = useDrawer();

  const filterByStatus = (): void => {
    const copy = [...invoiceList].sort((a, b) => (a.status || "").localeCompare(b.status || ""));
    setInvoiceList(copy);
  }

  React.useEffect(() => {
    setInvoiceList(invoices);
  }, [invoices])

  return (
    <div className={styles.outerCont}>
      <Drawer
        toggle={toggleDrawer}
        state={drawerState}
        >
        <InvoiceForm isNew={true} toggleDrawer={toggleDrawer}/>
      </Drawer>
      <div className={styles.innerCont}>
        <div className={styles.header}>
          <div>
            <h1>Invoices</h1>
            <label>There are {invoices?.length} total invoices</label>
          </div>
          <div>
            <span onClick={filterByStatus}>Filter By Status</span>
            <button onClick={toggleDrawer(true)}>New Invoice</button>
          </div>
        </div>

        {invoiceList.map((invoice: Invoice) => {
            return (
              invoiceRow(invoice)
            )
          })
        }
      </div>
    </div>
  );
}
