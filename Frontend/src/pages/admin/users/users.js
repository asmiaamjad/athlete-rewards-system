import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UsersURL, PhotoURL } from "../../../config/url-constant";
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchusers();
  }, []);
  const fetchusers = async () => {
    const response = await fetch(UsersURL);

    const responseData = await response.json();
    console.log(responseData);
    setUsers(responseData);
  };

  const deleteUser = async (id) => {
    console.log(id);

    const response = await fetch(UsersURL + `/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        // response.json();
        if (response.status === 204) {
          toast.success("User deleted Successfully");
          fetchusers();
        } else {
          toast.error(`User doesn't delete `);
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
                <h1>Users</h1>
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
                    <h3 class="card-title">All Users</h3>
                    <div class="card-tools">
                      <Link to="/add-user">
                        <i class="fas fa-plus" />
                        &nbsp; Add User
                      </Link>
                    </div>
                  </div>

                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr style={{ padding: "15px" }}>
                          <th>Profile</th>
                          <th>User Name</th>
                          <th style={{ paddingLeft: "50px" }}>Email</th>
                          <th>Points</th>
                          <th style={{ width: "40px", paddingLeft: "50px" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <>
                            <tr key={user._id}>
                              <td>
                                <img
                                  class="image"
                                  src={
                                    PhotoURL +
                                    user.photo
                                  }
                                  alt="User Image"
                                />
                              </td>
                              <td style={{ padding: "25px" }}>
                                {user.username}
                              </td>
                              <td style={{ padding: "25px" }}>{user.email}</td>
                              <td style={{ padding: "25px" }}>
                                {user.total_points ? user.total_points : "0"}
                              </td>
                              <td style={{ padding: "25px" }}>
                                <Link to={`/users/${user._id}`}>
                                  <span>
                                    <i class="fas fa-edit"></i>
                                  </span>
                                </Link>
                              </td>
                              <td style={{ padding: "25px" }}>
                                <i
                                  class="fas fa-trash deleteicon"
                                  onClick={() => deleteUser(user._id)}
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

export default Users;
