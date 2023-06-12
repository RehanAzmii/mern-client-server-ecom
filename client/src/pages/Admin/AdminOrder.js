import React, { useEffect, useState } from "react";
import AdminMenu from "../../componnts/Layout/AdminMenu";
import Layout from "../../componnts/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;
const AdminOrder = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [changeStatus, setChangeStatus] = useState("");
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          <div className="border shadow">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              {orders?.map((o, i) => {
                return (
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o?._id, value)}
                          defaultValue={o?.status}
                        >
                          {status?.map((s, i) => {
                            <Option key={i} value={s}>
                              {s}
                            </Option>;
                          })}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                      <td>{o?.quantity}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
            <div className="container">
              {orders?.products?.map((p, i) => (
                <div className="row card flex-row mb-2 p-3">
                  <div className="col-md-4">
                    {" "}
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width={"100px"}
                      height={"100px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price:{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;
