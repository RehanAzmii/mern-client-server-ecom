import React, { useState } from "react";
import Layout from "../../componnts/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", { ...input });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("SomeThing Went Wrong");
    }
  };

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <Layout title={"Register - Ecommerce app"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Yor Name"
              name="name"
              onChange={inputHandler}
              value={input?.name}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Yor Email"
              name="email"
              onChange={inputHandler}
              value={input?.email}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Yor Password"
              name="password"
              onChange={inputHandler}
              value={input?.password}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Yor Phone"
              name="phone"
              onChange={inputHandler}
              value={input?.phone}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Yor Address"
              name="address"
              onChange={inputHandler}
              value={input?.address}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="What is your fevrate sport "
              name="answer"
              onChange={inputHandler}
              value={input?.answer}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
