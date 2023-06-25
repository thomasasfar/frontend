import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "use-history";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Cek status login pengguna di sini
    const isLoggedIn = checkLoginStatus();

    if (!isLoggedIn) {
      // Jika pengguna belum login, arahkan ke halaman login
      navigate("/login");
    }
  }, [navigate]);

  const checkLoginStatus = () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      // Lakukan verifikasi token di sini
      try {
        // const decodedToken = jwt.verify(token, "secretKey"); // Ganti 'secretKey' dengan kunci rahasia yang digunakan saat membuat token
        return true; // Pengguna sudah login
      } catch (error) {
        console.error("Token tidak valid:", error);
      }
    }

    return false; // Pengguna belum login
  };

  return <></>;
};

export default Redirect;
