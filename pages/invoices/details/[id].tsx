import * as React from 'react';
import { useRouter } from 'next/router'
import InvoiceDetail from '../../../app/invoices/details/details';

export default function InvoiceHome() {
  
  const router = useRouter()

  return (
    <>
      <InvoiceDetail invoiceId={router.query.id || ''}></InvoiceDetail>
    </>
  )
}