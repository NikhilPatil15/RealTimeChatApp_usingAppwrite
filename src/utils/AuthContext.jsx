import { createContext, useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  const handleLogIn = async (e, credentials) => {
    e.preventDefault();

    try {
      const response = await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );
      console.log(response);
      let accountDetails = await account.get();
      setUser(accountDetails);

      navigate("/");
      
    } catch (error) {
      toast.error("Invalid cridentials");
    }
    
  };

  const handleLogOut = async()=>{
    await account.deleteSession('current')
    setUser(null)
  }

  const data = {
    user,
    handleLogIn,
    handleLogOut,
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
