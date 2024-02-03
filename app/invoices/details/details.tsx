import React from 'react';
import UseContext from '../../../hooks/useContext';
import useDrawer from '../../../hooks/useDrawer';
import Drawer from '../../../components/common/drawer/drawer';
import InvoiceForm from '../../../components/invoice/form/invoiceForm';
import styles from './details.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Item, Invoice } from '../../../models/interfaces/invoice';

export default function InvoiceDetail({invoiceId}: {
  invoiceId: string | string[]
}) {

  const { invoices, setInvoices } = React.useContext(UseContext);
  const [invoice, setInvoice] = React.useState<Invoice>(invoices.find((x: { id: string }) => x.id === invoiceId));
  const { toggleDrawer, drawerState } = useDrawer();
  const router = useRouter();

  const onClickDelete = (id: string): void => {
    const newList = invoices.filter((x: { id: string; }) => x.id !== id);
    setInvoices(newList);
    router.push('/');
  }

  const onClickMarkPaid = (id: string): string | void => {
    const newList = invoices.map((x: { id: string; status: string; }) => {
      if (x.id === id) {
        x.status = "paid";
      }
      return x;
    });
    setInvoices(newList);
  }

  return (
    <>
      <Drawer
        toggle={toggleDrawer}
        state={drawerState}
      >
        <InvoiceForm toggleDrawer={toggleDrawer} isNew={false} invoice={invoice}/>
      </Drawer>
      <div className={styles.outerCont}>
        <div className={styles.detailsCont}>
          <div className={styles.topNav}>
            <button>
              <Link href="/">Go Back</Link>
            </button>
          </div>
          <div className={styles.detailsRowOne }>
            <div>
              Status <span className={`status-${invoice.status}`}>{invoice.status}</span>
            </div>
            <div>
              <button onClick={toggleDrawer(true)}>Edit</button>
              <button onClick={() => onClickDelete(invoice.id || "")}>Delete</button>
              <button onClick={() => onClickMarkPaid(invoice.id || "")}>Mark as Paid</button>
            </div>
          </div>

          <div className={styles.detailsRowTwo}>
            <div className={styles.rowTwoRowOne}>
              <div>
                <div>
                  <h3>#{invoice.id}</h3>
                </div>
                <div>
                  <label>{invoice.description}</label>
                </div>
              </div>
              <div>
                <div>
                  <label>#{invoice.senderAddress?.street}</label>
                </div>
                <div>
                  <label>{invoice.senderAddress?.city}</label>
                </div>
                <div>
                  <label>{invoice.senderAddress?.postCode}</label>
                </div>
                <div>
                  <label>{invoice.senderAddress?.country}</label>
                </div>
              </div>
            </div>

            <div className={styles.rowTwoRowTwo}>
              <div className={styles.rowTwoRowTwoInner}>
                <div>
                  <div>
                    <label>Invoice Date</label>
                    <h3>{invoice.createdAt}</h3>
                  </div>
                  <div>
                    <label>Payment Date</label>
                    <h3>{invoice.paymentDue}</h3>
                  </div>
                </div>

                <div>
                  <div>
                    <label>Bill To</label>
                    <h3>{invoice.clientName}</h3>
                  </div>
                  <div>
                    <div>
                      <label>{invoice.clientAddress?.city}</label>
                    </div>
                    <div>
                      <label>{invoice.clientAddress?.postCode}</label>
                    </div>
                    <div>
                      <label>{invoice.clientAddress?.country}</label>
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <label>Sent To</label>
                    <h3>{invoice.clientEmail}</h3>
                  </div>
                </div>
              </div>

              <div className={styles.tableCont}>
                <table>
                  <tr>
                    <th>Item Name</th>
                    <th>QTY.</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>

                  {invoice.items?.map((item: Item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price}</td>
                          <td>${item.total}</td>
                        </tr>
                      )
                    })
                  }

                </table>
                <div>
                  <div><label>Amount Due</label></div>
                  <h2>${invoice.total}</h2>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}