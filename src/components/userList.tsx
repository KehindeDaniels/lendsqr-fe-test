// src/components/UserList.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useUsers } from "../context/UserContext";
import { UserSummary } from "../types/types";
import ActionMenu from "./ActionMenu";
import FilterModal from "./FilterModal";

const UserList: React.FC = () => {
  const { userList } = useUsers();
  const navigate = useNavigate();
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  const toggleFilterModal = () => setShowFilterModal(!showFilterModal);

  const getStatusStyle = (status: string): React.CSSProperties => {
    switch (status) {
      case "Active":
        return { color: "green", fontWeight: "bold" };
      case "Blacklisted":
        return { color: "red", fontWeight: "bold" };
      case "Inactive":
        return { color: "gray", fontStyle: "italic" };
      default:
        return {};
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const columns: ColumnDef<UserSummary>[] = [
    {
      accessorKey: "organization",
      header: () => <span>Organization</span>,
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "fullName",
      header: () => <span>Full Name</span>,
      cell: (info) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/dashboard/users/${info.row.original.id}`)}
        >
          {info.getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: () => <span>Email</span>,
    },
    {
      accessorKey: "dateJoined",
      header: () => <span>Date Joined</span>,
      cell: (info) => formatDate(info.getValue() as string),
    },
    {
      accessorKey: "phoneNumber",
      header: () => <span>Phone Number</span>,
      cell: (info) => <span>{info.getValue() as string}</span>,
    },
    {
      accessorKey: "status",
      header: () => <span>Status</span>,
      cell: (info) => (
        <span style={getStatusStyle(info.getValue() as string)}>
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorFn: (row) => row.id,
      id: "action",
      header: () => <span>Action</span>,
      cell: (info) => <ActionMenu userId={info.row.original.id} />,
    },
  ];

  const table = useReactTable({
    data: userList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h2>User List</h2>
      <button onClick={toggleFilterModal}>Filter</button>
      {showFilterModal && <FilterModal toggleModal={toggleFilterModal} />}
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
