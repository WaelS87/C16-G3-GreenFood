import React, { useState, useEffect } from "react";
import { Metric } from "./Metric";
import { UseFetch } from '../../hooks/UseFetch'

export const Metrics = () => {
  const [state, setState] = useState({
    products: {
      title: "Total de Productos",
      icon: "fa-store",
      value: 0,
      color: "primary",
    },
  });

  useEffect(() => {

    UseFetch('/total')
      .then(({ data }) => {
        setState({
          products: {
            ...state.products,
            value: data.totalProducts,
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
