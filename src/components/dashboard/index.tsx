"use client";

import { user } from "@/data";
import AdminDashboard from "./admin";
import UserDashboard from "./user";

export default function Dashboard() {
    const activeUser = user;
    return (
        <>
            {
                activeUser?.role === "admin" && <AdminDashboard />
            }
            {
                activeUser?.role === "user" && <UserDashboard />
            }
        </>
    );
}