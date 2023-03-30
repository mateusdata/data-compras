import React, { createContext, useState } from "react";
export const Context = createContext();

export const ContextProvide = ({ children }) => {
  const [itenSelected, setItenSelected] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openInput, setOpenInput] = useState(true);
  return (
    <Context.Provider
      value={{
        itenSelected,
        setItenSelected,
        setCompletedItems,
        completedItems,
        open,
        setOpen,
        loading,
        setLoading,
        openInput,
        setOpenInput,
      }}
    >
      {children}
    </Context.Provider>
  );
};
