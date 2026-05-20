"use client";
import React, { ReactNode, useState } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { VideoDataProvider } from "../_context/videoDataContext";
import { UserDetailProvider } from "../_context/UserDetailContext";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <UserDetailProvider>
      <VideoDataProvider>
        <div>
          <div className="hidden md:block h-screen bg-white fixed mt-16.25 w-64">
            <SideNav />
          </div>
          <div>
            <Header />
            <div className="md:ml-64 p-10">{children}</div>
          </div>
        </div>
      </VideoDataProvider>
    </UserDetailProvider>
  );
}

export default DashboardLayout;
