import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiossecure from "../../../Hooks/useAxiossecure";

const UsersManagement = () => {
  const axiosSecure = useAxiossecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Make Admin?",
        text: "This user will get admin access.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#FF6B35",
        cancelButtonColor: "#6B7280",
        confirmButtonText: "Yes, Make Admin",
      });

      if (!result.isConfirmed) return;

      const res = await axiosSecure.patch(`/users/admin/${id}`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "User promoted to Admin",
          showConfirmButton: false,
          timer: 1500,
        });

        refetch();
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  };

  const handleRemoveAdmin = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Remove Admin?",
        text: "This admin will be converted to a regular user.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6B7280",
        confirmButtonText: "Yes, Remove Admin",
      });

      if (!result.isConfirmed) return;

      const res = await axiosSecure.patch(`/users/remove-admin/${id}`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Admin Removed Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        refetch();
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
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
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Users Management
          </h2>
          <p className="text-gray-500 mt-1">
            Manage all registered users and admin roles
          </p>
        </div>

        <div className="bg-[#FF6B35]/10 text-[#FF6B35] px-5 py-3 rounded-2xl font-semibold">
          Total Users: {users.length}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="table">
          <thead className="bg-[#FF6B35] text-white">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-orange-50 transition-all duration-200"
              >
                <td className="font-semibold">{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 rounded-full ring-2 ring-[#FF6B35] ring-offset-2">
                        <img
                          src={
                            user.photoURL ||
                            user.photo ||
                            "https://ui-avatars.com/api/?name=User"
                          }
                          alt={user.name}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {user.name || "No Name"}
                      </h3>
                    </div>
                  </div>
                </td>

                <td className="text-gray-600">{user.email}</td>

                <td>
                  {user.role === "admin" ? (
                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      <FaUserShield size={16} />
                      Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                      <FaUser size={15} />
                      User
                    </span>
                  )}
                </td>

                <td className="text-gray-500">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="text-center">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user._id)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white rounded-xl"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm bg-[#FF6B35] hover:bg-[#e85a28] border-none text-white rounded-xl"
                    >
                      Make Admin
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