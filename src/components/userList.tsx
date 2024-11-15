// src/components/UserList.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useUsers } from "../context/userContext";
import { UserSummary } from "../types/types";
import ActionMenu from "./ActionMenu"; // Make sure to import ActionMenu

const UserList: React.FC = () => {
  const { userList } = useUsers();
  const navigate = useNavigate();

  const columns: ColumnDef<UserSummary>[] = [
    {
      accessorKey: "fullName",
      header: "Full Name",
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
      header: "Email",
    },
    {
      accessorKey: "dateJoined",
      header: "Date Joined",
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorFn: (row) => row.id,
      id: "action",
      header: "Action",
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
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
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
