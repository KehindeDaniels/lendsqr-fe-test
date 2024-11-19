import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import localForage from "localforage";
import { UserSummary, UserDetails, UserContextType } from "../types/types";

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userList, setUserList] = useState<UserSummary[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails[]>([]);

  useEffect(() => {
    fetchUserData();
    fetchUserDetails();
  }, []);

  const fetchUserData = async () => {
    const userListData = await localForage.getItem<UserSummary[]>("userList");
    console.log("Retrieved userList from localForage:", userListData);
    if (userListData) {
      setUserList(userListData);
    } else {
      const response = await axios.get<UserSummary[]>(
        "https://run.mocky.io/v3/4989c9d5-ec0f-4b4f-9270-c4b456e7f9d8"
      );

      setUserList(response.data);
      localForage.setItem("userList", response.data);
    }
  };

  const fetchUserDetails = async () => {
    const userDetailsData = await localForage.getItem<UserDetails[]>(
      "userDetails"
    );
    if (userDetailsData) {
      setUserDetails(userDetailsData);
    } else {
      const response = await axios.get<UserDetails[]>(
        "https://run.mocky.io/v3/c4087e71-851a-43e5-9dff-eaab28a6cddc"
      );
      setUserDetails(response.data);
      localForage.setItem("userDetails", response.data);
    }
  };

  const updateUserStatus = async (userId: string, newStatus: string) => {
    const updatedUserList = userList.map((user) => {
      // console.log(user);
      if (user.id === userId) {
        return { ...user, status: newStatus };
      }
      return user;
    });
    setUserList(updatedUserList);
    await localForage.setItem("userList", updatedUserList);
  };

  return (
    <UserContext.Provider
      value={{
        userList,
        userDetails,
        fetchUserData,
        fetchUserDetails,
        updateUserStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers must be used within a UserProvider");
  return context;
};
