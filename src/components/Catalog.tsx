import { useEffect, useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import api from "../services/api";
import { addProductToCart } from "../store/modules/cart/actions";
import { IProduct } from "../store/modules/cart/types";

export default function Catalog() {
  const dispatch = useDispatch();
  const [ catalog, setCatalog ] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get('products').then(response => {
      setCatalog(response.data);
    })
  }, []);

  const handleAddProductToCart = useCallback((product) => {
    dispatch(addProductToCart(product))
  }, [dispatch]);

  return (
    <>
      <h1>Catalog</h1>

      {catalog && catalog.map(item => (
        <article key={item.id}>
          <strong>{item.title}</strong> {" - "}
          <span>{item.price}</span> {" "}
          <button
           type="button"
           onClick={(item) => handleAddProductToCart(item)}
          >
            Comprar
          </button>
        </article>
      ))}
    </>
  )
}