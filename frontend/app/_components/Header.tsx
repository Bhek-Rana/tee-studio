"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";

const menu = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Products", path: "/" },
  { id: 3, name: "AboutUs", path: "/" },
  { id: 4, name: "ContactUs", path: "/" },
];

export type User = {
  email: string;
  name: string;
  picture?: string;
};

function Header() {
  const [user, setUser] = useState<User>();

  // ✅ Guard against undefined context
  const context = useContext(UserDetailContext);
  const { UserDetail, setUserDetail } = context || {};

  useEffect(() => {
    // ✅ Run only on client side
    if (typeof window !== "undefined") {
      const tokenResponse = JSON.parse(
        localStorage.getItem("tokenResponse") || "null"
      );
      if (tokenResponse) {
        getUserProfile(tokenResponse?.access_token);
      }
    }
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      localStorage.setItem("tokenResponse", JSON.stringify(tokenResponse));
      await getUserProfile(tokenResponse?.access_token);
      // Save to DB/Strapi Backend
      

    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  // Get User Info
  const getUserProfile = async (access_token: string) => {
    try {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          // ✅ Fixed Bearer token spacing
          headers: { Authorization: "Bearer " + access_token },
        }
      );

      console.log(userInfo);
      setUser(userInfo?.data);
      setUserDetail && setUserDetail(userInfo?.data);
      SaveNewUser(userInfo?.data);

    } catch (e) {
      localStorage.setItem("tokenResponse", "");
    }
  };
  const SaveNewUser=async(user:User)=>{
    const result=await axios.post('/api/users',{
      name:user.name,
      email:user.email,
      picture:user.picture
    });
   console.log(result.data);
  }

  return (
    <div className="flex items-center justify-between p-4 px-10 ">
      <Image src={"/logo.svg"} alt="logo" width={180} height={180} />
      <ul className="flex gap-5">
        {menu.map((item) => (
          <li key={item.id} className="text-lg">
            {item.name}
          </li>
        ))}
      </ul>
      <div className="flex gap-3 items-center">
        <ShoppingCart />
        {!user ? (
          <Button onClick={() => googleLogin()}>SignIn/SignUp</Button>
        ) : (
          <Image
            src={user?.picture || "/default-profile.png"}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
      </div>
    </div>
  );
}

export default Header;
