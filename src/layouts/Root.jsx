import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer";
import Nav from "../pages/Shared/Nav";

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
