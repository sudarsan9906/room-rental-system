import React from "react";
import Layout from "../../components/ui/layout";
import AdminNavBar from "../../components/ui/AdminNavbar/AdminNavBar";
import { Outlet } from "react-router-dom";

const admin = () => {
  return (
    <Layout logo="Admin" Navbar={AdminNavBar}>
      <Outlet />
    </Layout>
  );
};

export default admin;
