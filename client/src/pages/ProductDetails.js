import React, { useEffect, useState } from "react";
import Layout from "../componnts/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState();
  const [related, setRelated] = useState([]);

  // initial product details

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-singleproduct/${params?.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelated(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Product Details"}>
      <div className="row container mt-2">
        <div className="col-md-6">
          {" "}
          <img
            src={`/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top"
            alt={product?.name}
            height={"300"}
            width={"300px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h4>Name:{product?.name}</h4>
          <h4>Description:{product?.description}</h4>
          <h4>Price:{product?.price}</h4>
          <h4>Quantity:{product?.quantity}</h4>
          <h4>Category:{product?.category?.name}</h4>
        </div>
      </div>
      <hr />
      <div className="row container">
        {" "}
        <h6>similar products</h6>
        {related.length < 1 && (
          <p className="text-center">No Simmilar Product found</p>
        )}
        <div className="d-flex flex-wrap ">
          {related?.map((p) => (
            <div className="card m-2 " style={{ width: "18rem" }} key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
