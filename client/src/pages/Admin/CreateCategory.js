import React, { useEffect, useState } from "react";
import Layout from "../../componnts/Layout/Layout";
import AdminMenu from "../../componnts/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../componnts/Form/CategoryForm";
import { Modal } from "antd";
import { useParams } from "react-router-dom";
const CreateCategory = () => {
  const [category, setCatgory] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${data?.category?.name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing Went wrong in getting category");
    }
  };
  // get all catgory
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCatgory(data?.category);
      }
    } catch (error) {
      // console.log(error);
      // toast.error("Somthing Went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${data.category.name} is updated`);
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in updated category");
    }
  };
  // delet category
  const handleDelete = async (pId) => {
    try {
      await axios.delete(`/api/v1/category/delete-category/${pId}`);
      toast.success("Category deleted succesfully");
      getAllCategory();
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in delete category");
    }
  };
  return (
    <Layout title={"Dashboard- Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((c) => {
                    return (
                      <tr key={c._id}>
                        <td>{c?.name}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setOpen(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger m-1"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
