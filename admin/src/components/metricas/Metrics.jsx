import React, { useState, useEffect } from "react";
import { Metric } from './Metric'
import { UseFetch } from '../../hooks/UseFetch'

export const Metrics = () => {
  const [state, setState] = useState({
    products: {
      title: "Total de Productos",
      icon: "fa-store",
      value: 0,
      color: "primary",
    },

    users: {
      title: "Total de Usuarios",
      icon: "fa-users",
      value: 0,
      color: "sucess",
    },
  });

  useEffect(() => {

    UseFetch('/list')
      .then(({ meta,data }) => {
        setState({
          products: {
            ...state.products,
            value: meta.total
          },
        });
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="row">
      <Metric {...state.products} />
    </div>
  );
};
