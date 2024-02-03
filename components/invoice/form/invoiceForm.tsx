import React, { useState,  useContext } from 'react';
import UseContext from '../../../hooks/useContext';
import styles from './form.module.css';
import { Item, Invoice, Address } from '../../../models/interfaces/invoice';
import ItemClass from '../../../models/classes/item';
import InvoiceClass from '../../../models/classes/invoice';
import { useRouter } from 'next/router'

export default function InvoiceForm({ invoice, isNew, toggleDrawer }: {
  invoice?: Invoice,
  isNew: boolean,
  toggleDrawer: (x:boolean) => any
}) {

  const initialFormValues = {
    id: invoice?.id || '',
    createdAt: invoice?.createdAt || new Date().toISOString().split('T')[0],
    paymentDue: invoice?.paymentDue || '',
    description: invoice?.description || '',
    paymentTerms: invoice?.paymentTerms || 0,
    clientName: invoice?.clientName || '',
    clientEmail: invoice?.clientEmail || '',
    status: invoice?.status || '',
    total: invoice?.total || 0
  };

  const initialSenderAddress = {
    street: invoice?.senderAddress?.street || '',
    city: invoice?.senderAddress?.city || '',
    postCode: invoice?.senderAddress?.postCode || '',
    country: invoice?.senderAddress?.country || ''
  };

  const initialClientAddress = {
    street: invoice?.clientAddress?.street || '',
    city: invoice?.clientAddress?.city || '',
    postCode: invoice?.clientAddress?.postCode || '',
    country: invoice?.clientAddress?.country || ''
  };

  const router = useRouter()
  const { invoices, setInvoices } = useContext(UseContext);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [senderValues, setSenderValues] = useState(initialSenderAddress);
  const [clientValues, setClientValues] = useState(initialClientAddress);
  const [tempItems, setTempItems] = useState<Array<Item> >(invoice?.items || [new ItemClass({}) as Item]);

  const saveInvoice = (status: string) => {
    const newDraft = new InvoiceClass({...formValues, senderAddress: senderValues, clientAddress: clientValues, status: status, items: tempItems})
    const invoiceCopy = [...invoices];
    console.log(tempItems)
    if (isNew) {
      invoiceCopy.push(newDraft);
    } else {
      let pos = invoiceCopy.map(e => e.id).indexOf(newDraft.id);
      invoiceCopy[pos] = newDraft;
    }
    setInvoices(invoiceCopy);
  }

  const handleSend = () => {
    const _check = (stuff: any) => {
      for (const [key, value] of Object.entries(stuff)) {
        if (key !== 'status' && key !== 'id') {
          if ((value === undefined || value === '')) {
            return false;
          }
        }
      }
      return true;
    }
    const formCheck = _check(formValues);
    const sendCheck = _check(senderValues);
    const clientCheck = _check(clientValues);
    if (formCheck && sendCheck && clientCheck) { 
      saveInvoice('pending');
      toggleDrawer(false)();
      router.push('/');
    } else {
      alert('Please fill out all the required fields');
    }
  };

  const handleDraft = () => {
    saveInvoice('draft');
    toggleDrawer(false)();
    router.push('/');
  };


  const addNewInvoice = ():void => {
    let newItem = new ItemClass({}) as Item;
    let copy = [...tempItems, newItem]
    setTempItems(copy);
  }

  const handleFormChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === 'paymentTerms') {
      let newDate = new Date(formValues.createdAt);
      newDate.setDate(newDate.getDate() + Number(value));
      setFormValues({
        ...formValues,
        paymentDue: newDate.toISOString().split('T')[0],
        [name]: Number(value)
      });
      return;
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleClientChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientValues({
      ...clientValues,
      [name]: value,
    });
  };

  const handleSenderChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSenderValues({
      ...senderValues,
      [name]: value,
    });
  };

  const handleItemChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const lastIndex = tempItems.length - 1;
    let copy = [...tempItems];
    let lastItem: any = copy[lastIndex];
    lastItem[name] = name !== 'name'? Number(value) : value;
    const newItem = new ItemClass({...lastItem});
    copy[lastIndex] = newItem;
    setTempItems(copy);
  };

  const deleteItem = (e: any, index:number):any => {
    let copy = [...tempItems];
    copy.splice(index, 1)
    setTempItems(copy);
  }

  return (
    <>
    <div className={styles.outerCont}>
      <div>
        <h2>{isNew ? "New Invoice" : `Edit #${invoice?.id}`}</h2>
      </div>

      <div className={styles.purpleText}>Bill From</div>
      <div className={styles.flexColumn}>
        <label>
          Street Address <br/>
          <input type='text' onChange={handleSenderChange} name="street" value={senderValues.street} />
        </label>
        <div className={styles.flexRow}>
          <label>
            City <br/>
            <input type='text' onChange={handleSenderChange} name="city" value={senderValues.city} />
          </label>
          <label className={styles.paddingLR}>
            Post Code<br/>
            <input type='text' onChange={handleSenderChange} name="postCode" value={senderValues.postCode} />
          </label>
          <label>
            Country <br/>
            <input type='text' onChange={handleSenderChange} name="country" value={senderValues.country} />
          </label>
        </div>
      </div>
      <div className={styles.purpleText}>Bill To</div>
      <div className={styles.flexColumn}>
        <label>
          Client's Name <br/>
          <input type='text' onChange={handleFormChange} name="clientName" value={formValues.clientName}/>
        </label>
        <label>
          Client's Email <br/>
          <input type='text' onChange={handleFormChange} name="clientEmail" value={formValues.clientEmail}/>
        </label>
        <label>
          Street Address <br/>
          <input type='text' onChange={handleClientChange} name="street"  value={clientValues.street}/>
        </label>
        <div className={styles.flexRow}>
          <label>
            City <br/>
            <input type='text' onChange={handleClientChange} name="city" value={clientValues.city}/>
          </label>
          <label className={styles.paddingLR}>
            Post Code<br/>
            <input type='text' onChange={handleClientChange} name="postCode" value={clientValues.postCode}/>
          </label>
          <label>
            Country <br/>
            <input type='text' onChange={handleClientChange} name="country" value={clientValues.country}/>
          </label>
        </div>
      </div>
      <div className={styles.flexRow}>
        <label className={styles.paddingR}>Invoice Date <br/>
          <input type="date" disabled name="paymentDue" value={formValues.paymentDue} />
        </label>
        <label className={styles.paddingL}>Payment Terms <br/>
          <input type='number' onChange={handleFormChange} name="paymentTerms" value={formValues.paymentTerms}/>
        </label>
      </div>
      <label>
        Payment Description <br/>
        <input type='text' onChange={handleFormChange} name="description" value={formValues.description}/>
      </label>

      <div className={styles.itemCont}>
        <h3>Item List</h3>
        {tempItems?.map((item: Item, index) => {
          let isLast = (index === (tempItems.length - 1));
          return (
            <div key={index}>
              <label>Name
                <input disabled={!isLast} onChange={handleItemChange} name="name" value={item.name} />
              </label>
              <label className={`${styles.marginL} ${styles.marginR}`}>Quanity <br/>
                <input type='number' disabled={!isLast} onChange={handleItemChange} name="quantity" value={item.quantity} />
              </label>
              <label className={styles.marginR}>Price <br/>
                <input type='number' disabled={!isLast} onChange={handleItemChange}  name="price" value={item.price} />
              </label>
              <label className={styles.marginR}>Total <br/>
                <input disabled={true} onChange={handleItemChange} name="total" value={item.price * item.quantity} />
              </label>
              <button className={styles.specialBtn} onClick={(e:any) => deleteItem(e, index)}>Delete</button>
            </div>
          )})
        }
        <button onClick={addNewInvoice}>+ Add New Item</button>
      </div>
      <div className={styles.btnCont}>
        <div>
          <button onClick={toggleDrawer(false)}>Discard</button>
        </div>
        <div>
          <button onClick={handleDraft}>Save as Draft</button>
          <button onClick={handleSend}>Save & Send</button>
        </div>
      </div>
    </div>
    </>
  )
}