import React from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";
import {Outlet} from "react-router-dom";

export const Root = () => {
  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar />

          <Outlet/>
        </div>

        <Footer />
      </div>
    </div>
  );
};
