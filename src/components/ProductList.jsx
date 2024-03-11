import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ProductItem from "./ProductItem";

function ProductList() {
  const [product, setProduct] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [categorie, setCategorie] = useState([]);
  const [currentCategory, setCurrentCategory] = useState();

  const displayCategories = () => {
    return categorie.map((category, key) => (
      <button
        key={key}
        className={
          "btn " + (currentCategory === category ? "btn-dark" : "btn-secondary")
        }
        onClick={(e) => {
          e.preventDefault();
          setCurrentCategory(category);
        }}
      >
        {category}
      </button>
    ));
  };

  // affiche la liste des produits
  const displayProducts = () => {
    let productsTemp = product.filter(
      (product) =>
        product.title.includes(searchInput) ||
        product.id.toString().includes(searchInput) ||
        product.description.includes(searchInput)
    );

    if (currentCategory !== undefined) {
      productsTemp = productsTemp.filter((product) => {
        return product.category === currentCategory;
      });
    }

    if (productsTemp.length > 0) {
      return productsTemp.map((product, key) => {
        return <ProductItem product={product} key={key} />;
      });
    }
    return (
      <tr>
        <td colSpan={7}>No Items</td>
      </tr>
    );
  };

  const getProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => setProduct(res));
  };

  const getCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((res) => setCategorie(res));
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = document.querySelector("#search").value;
    setSearchInput(searchValue);
  };

  return (
    <div className="container-fluid mx-auto w-75 my-3">
      <form>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label className="col-form-label">Search</label>
          </div>
          <div className="col-auto">
            <input type="text" id="search" className="form-control" />
          </div>
          <div className="col-auto">
            <input
              className="btn btn-dark mx-2"
              type="submit"
              value="Search"
              onClick={handleSearch}
            />
            <input
              className="btn btn-secondary"
              type="reset"
              value="Reset"
              onClick={() => {
                setSearchInput(undefined);
              }}
            />
          </div>
        </div>
        <hr />
        <h5>Categories: </h5>
        <div className="row g-3 align-items-center">
          <div className="btn-group">{displayCategories()}</div>
        </div>
      </form>
      <hr />
      <h1
        style={{
          fontFamily: "Arial sans-serif",
          width: "fit-content",
          padding: "10px",
          color: "#f00000",
        }}
      >
        Liste des produits:{" "}
      </h1>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Image</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>{displayProducts()}</tbody>
      </Table>
    </div>
  );
}

export default ProductList;
