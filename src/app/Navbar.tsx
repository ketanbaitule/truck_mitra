"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const client = createClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    client.auth.onAuthStateChange((event, session) => {
      if (isLoggedIn && !session) {
        setIsLoggedIn(false);
      } else if (!isLoggedIn && session) {
        setIsLoggedIn(true);
      }
    });
  });
  return (
    <>
      <nav className="py-5 px-10 bg-[#FFDA5F] text-xl flex flex-row justify-between">
        <div>
          <Link href="/agency">
            <span className="font-[Samarkan] text-3xl">Truck Mitra</span>
            <span className="ml-3 hover:underline">Admin Panel</span>
          </Link>
        </div>
        {isLoggedIn ? (
          <button>Logout</button>
        ) : (
          <div className="flex flex-row gap-x-4">
            <Link className="hover:underline" href={"/login"}>
              {" "}
              Login{" "}
            </Link>
            <Link className="hover:underline" href={"/register"}>
              {" "}
              Register{" "}
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
