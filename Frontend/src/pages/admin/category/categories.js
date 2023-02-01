import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CategoriesURL,PhotoURL } from "../../../config/url-constant";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchcategories();
  }, []);
  const fetchcategories = async () => {
    const response = await fetch(CategoriesURL);
    const responseData = await response.json();
    console.log(responseData);
    setCategories(responseData);
  };

  const deletecategory = async (id) => {
    const response = await fetch(CategoriesURL + `/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Category deleted Successfully");
          fetchcategories();
        } else {
          toast.error(`Category doesn't deleted! Try again`);
        }
      })

      .catch((error) => {
        toast.error(`Something went wrong`);
        console.error(error);
      });
  };

  return (
    <div>
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Categories</h1>
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">All Categories</h3>
                    <div class="card-tools">
                      <Link to="/addcategory">
                        <i class="fas fa-plus" />
                        &nbsp; Add Category
                      </Link>
                    </div>
                  </div>

                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr style={{ padding: "15px" }}>
                          <th>Image</th>
                          <th>Category Name</th>
                          <th style={{ width: "40px", paddingLeft: "190px" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category) => (
                          <>
                            <tr key={category._id}>
                              <td>
                                <img
                                  class="image"
                                  src={
                                    PhotoURL +
                                    category.photo
                                  }
                                  alt="User Image"
                                />
                              </td>
                              <td style={{ padding: "25px" }}>
                                {category.categoryName}
                              </td>

                              <td
                                style={{ padding: "25px", textAlign: "center" }}
                              >
                                <Link to={`viewcategory/${category._id}`}>
                                  <span>
                                    <i class="fas fa-eye iconcolor"></i>
                                  </span>
                                </Link>
                              </td>
                              <td style={{ padding: "25px" }}>
                                <Link to={`/category/${category._id}`}>
                                  <span>
                                    <i class="fas fa-edit"></i>
                                  </span>
                                </Link>
                              </td>
                              <td style={{ padding: "25px" }}>
                                <i
                                  class="fas fa-trash deleteicon"
                                  onClick={() => deletecategory(category._id)}
                                ></i>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Categories;
