import { useEffect, useState } from "react"
import api from "../services/api";
import { IProduct } from "../store/modules/cart/types";
import CatalogItem from "./CatalogItem";

export default function Catalog() {
  const [ catalog, setCatalog ] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get('products').then(response => {
      setCatalog(response.data);
    })
  }, [])

  return (
    <>
      <h1>Catalog</h1>

      {catalog && catalog.map(item => (
        <CatalogItem key={item.id} product={item}/>
      ))}
    </>
  )
}