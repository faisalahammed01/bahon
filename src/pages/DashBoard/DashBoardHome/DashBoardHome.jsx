import Loading from "../../../Componets/Loading/Loading";
import useRole from "../../../Hooks/useRole";
import AdminDashBoard from "./AdminDashBoard";
import RiderDashBoard from "./RiderDashBoard";
import UserDashBoard from "./UserDashBoard";


const DashBoardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role === "admin") {
    return <AdminDashBoard/>;
  }

  if (role === "rider") {
    return <RiderDashBoard />;
  }

  if (role === "user") {
    return <UserDashBoard />;
  }

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold">Unauthorized Access</h2>
    </div>
  );
};

export default DashBoardHome;