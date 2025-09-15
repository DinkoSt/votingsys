import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("eid_token") || ""
  );
  const [creator, setCreator] = useState({ creator: false });
  const isBG = !!token && !isTokenExpired(token); // достатъчно е да има валиден токен

  useEffect(() => {
    if (token) {
      if (isTokenExpired(token)) {
        logout();
      } else {
        const decoded = jwtDecode(token);
        setCreator(decoded.creator);
      }
    }
  }, [token]);

  //       if (token && isTokenExpired(token)) {
  //       logout();
  //     } else {
  //       const decoded = jwtDecode(token);
  //       setCreator(decoded.creator);
  //     }

  const loginWithEID = async ({ idNumber, nationality, dob }) => {
    const resp = await fetch("http://localhost:8080/eid/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ idNumber, nationality, dob }),
    });
    const data = await resp.json();
    if (!resp.ok || !data.ok) throw new Error(data.error || "eID failed");
    localStorage.setItem("eid_token", data.token);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("eid_token");
    setToken("");
  };

  const value = useMemo(
    () => ({ token, isBG, creator, loginWithEID, logout }),
    [token, isBG]
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}
