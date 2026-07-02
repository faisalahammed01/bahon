import { Outlet } from "react-router";
import Nav from "../pages/Shared/Nav";
import Footer from "../pages/Shared/Footer";

const Root = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Nav></Nav>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
