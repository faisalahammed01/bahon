import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUser, FaSearch, FaUserMinus, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiossecure from "../../../Hooks/useAxiossecure";

const UsersManagement = () => {
  const axiosSecure = useAxiossecure();
  const [searchText, setSearchText] = useState("");

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?searchText=${searchText}`
      );
      return res.data;
    },
  });

  const handleMakeAdmin = async (id) => {
    const result = await Swal.fire({
      title: "Make Admin?",
      text: "This user will get admin access.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FF6B35",
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    const res = await axiosSecure.patch(`/users/admin/${id}`);

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Admin Added",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };

  const handleRemoveAdmin = async (id) => {
    const result = await Swal.fire({
      title: "Remove Admin?",
      text: "User role will be changed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Remove",
    });

    if (!result.isConfirmed) return;

    const res = await axiosSecure.patch(`/users/remove-admin/${id}`);

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Admin Removed",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-[#FF6B35]"></span>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold">Users Management</h2>
          <p className="text-gray-500">
            Manage all users and admin roles
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search by name or email"
              className="input input-bordered pl-10 w-full sm:w-72"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="bg-orange-100 text-orange-600 px-4 py-3 rounded-lg font-semibold">
            Total: {users.length}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-xl">
        <table className="table">
          <thead className="bg-gray-50 text-text-black font-medium border-b">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        user.photoURL ||
                        user.photo ||
                        "https://i.ibb.co/T0z7wSG/user.png"
                      }
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <span className="font-medium">
                      {user.name ||
                        user.displayName ||
                        "No Name"}
                    </span>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>
                  {user.role === "admin" ? (
                    <span className="badge badge-success gap-2">
                      <FaUserShield />
                      Admin
                    </span>
                  ) : (
                    <span className="badge badge-ghost gap-2">
                      <FaUser />
                      User
                    </span>
                  )}
                </td>

                <td>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>


<td>
  {user.role === "admin" ? (
    <button
      onClick={() => handleRemoveAdmin(user._id)}
      className="btn btn-sm btn-ghost text-red-700 hover:bg-red-50"
      title="Remove Admin"
    >
      <FaUserMinus size={16} />
    </button>
  ) : (
    <button
      onClick={() => handleMakeAdmin(user._id)}
      className="btn btn-sm btn-ghost text-blue-700 hover:bg-blue-50"
      title="Make Admin"
    >
      <FaUserPlus size={16} />
    </button>
  )}
</td>




              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;