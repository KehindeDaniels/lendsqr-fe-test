import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import localForage from "localforage";
import { User, UserContextType } from "../types/types";

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await localForage.getItem<User[]>("users");
      if (usersData) {
        setUsers(usersData);
      } else {
        const response = await axios.get<User[]>(
          "https://run.mocky.io/v3/be516433-fb60-441e-b94d-8da87437130d"
        );
        setUsers(response.data);
        await localForage.setItem("users", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const updateUserStatus = async (userId: string, newStatus: string) => {
    const updatedUsers = users.map((user) =>
      user.generalInfo.id === userId
        ? { ...user, generalInfo: { ...user.generalInfo, status: newStatus } }
        : user
    );

    setUsers(updatedUsers);
    await localForage.setItem("users", updatedUsers);
  };

  return (
    <UserContext.Provider value={{ users, fetchUsers, updateUserStatus }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers must be used within a UserProvider");
  return context;
};
