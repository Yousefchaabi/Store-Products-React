import React from "react";
import Rating from "./Rating";

function ProductItem({ product }) {
  return (
    <>
      <tr>
        <td>{product.id}</td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>{product.category}</td>
        <td>{product.description.slice(0, 100)}...</td>
        <td>
          <img src={product.image} alt={product.title} width={100} />
        </td>
        <td>
          <Rating rate={product.rating.rate} count={product.rating.count} />
        </td>
      </tr>
    </>
  );
}

export default ProductItem;
