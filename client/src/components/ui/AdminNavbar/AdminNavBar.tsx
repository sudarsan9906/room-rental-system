import React from "react";
import { useState } from "react";
import { Group, Code } from "@mantine/core";
import {
  IconUserScan,
  IconUserDollar,
  IconLogout,
  IconMailForward,
  IconPresentationAnalytics,
  IconAward,
} from "@tabler/icons-react";
import classes from "./NavbarSimple.module.css";
import { NavLink } from "react-router-dom";

const data = [
  { link: "/dashboard/admin/staffs", label: "Staffs", icon: IconUserScan },
  { link: "/dashboard/admin/clients", label: "Clients", icon: IconUserDollar },
  {
    link: "/dashboard/admin/createemail",
    label: "Create Email",
    icon: IconMailForward,
  },
  {
    link: "/dashboard/admin/projects",
    label: "Projects",
    icon: IconPresentationAnalytics,
  },
  {
    link: "/dashboard/admin/sendreward",
    label: "Send reward",
    icon: IconAward,
  },
];

export default function NavbarSimple() {
  const [active, setActive] = useState("Staffs");

  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <NavLink to="/" className={classes.link}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </NavLink>
      </div>
    </nav>
  );
}
