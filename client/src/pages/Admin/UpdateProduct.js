import React, { useEffect, useState } from "react";
import Layout from "../../componnts/Layout/Layout";
import AdminMenu from "../../componnts/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCatgoris] = useState([]);
  const [input, setInput] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState();
  const [id, setId] = useState("");

  // get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-singleproduct/${params.slug}`
      );
      setInput(data.product);
      setId(data.product._id);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Error in Single Product");
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  // get All category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCatgoris(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing Went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  // update product function
  const handleUpdatae = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      const x = { ...input };
      for (let key in x) {
        productData.append(key, x[key]);
      }
      productData.append("category", category);
      photo && productData.append("photo", photo);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("product update successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something Went Wrong in create product");
    }
  };

  // delete product

  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this product ?"
      );
      if (!answer) return;

      await axios.delete(`/api/v1/product/delete-product/${id}`);
      toast.success("Product Successfully Deleted");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error(" Error in Product Deleted");
    }
  };

  const inputHandler = (e) => {
    setInput({ ...input, [e.target?.name]: e.target?.value });
  };
  return (
    <Layout title={"Dashboard- create-product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => {
                  return (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  );
                })}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder=" Write a name"
                  className="form-control"
                  onChange={inputHandler}
                  value={input?.name}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  name="description"
                  placeholder=" Write a Dscription"
                  className="form-control"
                  onChange={inputHandler}
                  value={input?.description}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="price"
                  placeholder=" Write a Price"
                  className="form-control"
                  onChange={inputHandler}
                  value={input?.price}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="quantity"
                  placeholder=" Write a quantity"
                  className="form-control"
                  onChange={inputHandler}
                  value={input?.quantity}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  name="shipping"
                  value={input?.shipping ? "yes" : "No"}
                  onChange={inputHandler}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdatae}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
