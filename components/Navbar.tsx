import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import requestHandler from "../utils/requestHandler";
import { AuthContext } from "../context/authContext";
import { useRouter } from "next/router";
import { Text, useMantineTheme } from "@mantine/core";

function Navbar({ className }: { className?: string }) {
  const router = useRouter();
  const theme = useMantineTheme();

  const { currentUser, currentCompany, handleCompanyLogout, handleUserLogout } =
    useContext(AuthContext);

  useEffect(() => {
    if (!currentUser && !currentCompany) {
      router.push("/auth/login");
    }
  }, [currentUser]);

  const logout = () => {
    if (currentUser) {
      handleUserLogout();
      router.push("/auth/login");
    } else {
      handleCompanyLogout();
      router.push("/company/login");
    }
  };

  return (
    <div
      className={`flex flex-row justify-between font-fredoka text-lg ${className}`}
    >
      <div className="ml-5">
        <nav>
          <ul>
            <Link href={currentCompany ? "/company/profile" : "/profile"}>
              Profile
            </Link>
            <Link href={"/chat/list"} className="ml-4">
              Messages
            </Link>
            <Link href="/jobs" className="ml-4">
              Job
            </Link>
            <Link href="/feed" className="ml-4">
              Feed
            </Link>
            <Link href="/predict" className="ml-4">
              Predict
            </Link>
            {currentUser && (
              <Link href="/mentoring" className="ml-4">
                Mentoring
              </Link>
            )}
            <button className="ml-5" onClick={logout}>
              Logout
            </button>
          </ul>
        </nav>
      </div>
      <div className="flex justify-end mr-5">
        <div>WeConnect</div>
      </div>
    </div>
  );
}

export default Navbar;
