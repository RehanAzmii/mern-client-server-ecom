import React, { useEffect, useState } from "react";
import Layout from "../../componnts/Layout/Layout";
import AdminMenu from "../../componnts/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCatgoris] = useState([]);
  const [input, setInput] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");

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
  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      const x = { ...input };
      for (let key in x) {
        productData.append(key, x[key]);
      }
      productData.append("category", category);
      productData.append("photo", photo);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("product create successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something Went Wrong in create product");
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
            <h1>Create Product</h1>
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
                // onChange={inputHandler}
                // value={input?.name}
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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
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
                  value={input?.shipping}
                  onChange={inputHandler}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
