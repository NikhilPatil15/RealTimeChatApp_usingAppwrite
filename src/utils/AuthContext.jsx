import { createContext, useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUserOnLoad = async () => {
    try {
      let accountDetails = await account.get();
      // console.log(accountDetails);
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const getUserInfo = async () => {
    let userDetails = await account.get();

    setUser(userDetails);
  };
  const createSession = async (email, password) => {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogIn = async (e, credentials) => {
    e.preventDefault();

    try {
      await createSession(credentials.email, credentials.password);

      await getUserInfo();

      navigate("/");
    } catch (error) {
      toast.error("Invalid cridentials");
    }
  };

  const handleLogOut = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const handleRegister = async (e, credentials) => {
    e.preventDefault();

    if (credentials.password1 !== credentials.password2) {
      toast.warning("Passwords don't match !");
    }

    try {
      let response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      );

      await createSession(credentials.email, credentials.password1);

      await getUserInfo();

      navigate("/");
    } catch (error) {
      toast.error("Please enter valid credentials !");
    }
  };

  const data = {
    user,
    handleLogIn,
    handleLogOut,
    handleRegister,
  };

  useEffect(() => {
    getUserOnLoad();
  }, []);
  return (
    <AuthContext.Provider value={data}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ReactLoading type="bars" color="blue" height={200} width={100} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
