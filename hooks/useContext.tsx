import React from 'react';

export const updateContext = (values = {}) => values;
const UseContext = React.createContext<any>(null);

export default UseContext;