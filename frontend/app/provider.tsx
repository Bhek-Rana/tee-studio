
// "use client";
// import React, { useState } from "react";
// import { UserDetailContext } from "../context/UserDetailContext";
// import { GoogleOAuthProvider } from "@react-oauth/google";

// export default function Provider({ children }: { children: React.ReactNode }) {
//   const [UserDetail, setUserDetail] = useState<any>(null);

//   return (
//     <GoogleOAuthProvider clientId="GOOGLE_CLIENT_ID">
//       <UserDetailContext.Provider value={{ UserDetail, setUserDetail }}>
//         {children}
//       </UserDetailContext.Provider>
//     </GoogleOAuthProvider>
//   );
// }


"use client"
import React, { useState } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext';
function Provider({
    children,
}: Readonly <{
  children: React.ReactNode;
}>) {

const [UserDetail, setUserDetail] = useState<any>(null);
  return(
    <div>
      <UserDetailContext.Provider value={{ UserDetail, setUserDetail }}>
        {children}
      </UserDetailContext.Provider>
      
    </div>
  )
}

export default Provider;