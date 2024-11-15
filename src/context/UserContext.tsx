// src/context/UserContext.tsx
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
    if (userListData) {
      setUserList(userListData);
    } else {
      const response = await axios.get<UserSummary[]>(
        "https://run.mocky.io/v3/251b3ef8-1b25-47fd-a484-f51b435ec636"
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
        "https://run.mocky.io/v3/3b3c138c-b521-41dc-bad5-d3628e65ad6b"
      );
      setUserDetails(response.data);
      localForage.setItem("userDetails", response.data);
    }
  };

  return (
    <UserContext.Provider
      value={{ userList, userDetails, fetchUserData, fetchUserDetails }}
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
