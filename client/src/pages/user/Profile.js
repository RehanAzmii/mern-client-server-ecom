import React, { useEffect, useState } from "react";
import Layout from "../../componnts/Layout/Layout";
import UserMenu from "../../componnts/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const [input, setInput] = useState("");
  const [auth, setAuth] = useAuth();

  // get user data
  useEffect(() => {
    setInput(auth?.user);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", { ...input });
      if (data.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
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
    <Layout title={"your profile"}>
      {" "}
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Yor Name"
                    name="name"
                    onChange={inputHandler}
                    value={input?.name}
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
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Yor Password"
                    name="password"
                    onChange={inputHandler}
                    // value={input?.password}
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
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
