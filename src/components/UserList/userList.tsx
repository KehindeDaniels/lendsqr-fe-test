import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./userList.scss";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import { useUsers } from "../../context/UserContext";
import { User } from "../../types/types";
import ActionMenu from "../ActionMenu/ActionMenu";
import FilterModal from "../FilterModal/FilterModal";
import { FilterIcon, DropDown } from "../../assets/index";

const UserList: React.FC = () => {
  const { users } = useUsers();
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  const toggleFilterModal = () => setShowFilterModal(!showFilterModal);
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

  const columns: ColumnDef<User>[] = [
    {
      id: "organization",
      accessorFn: (row) => row.generalInfo.organization,
      header: () => <span>Organization</span>,
      cell: (info) => info.getValue(),
    },
    {
      id: "fullName",
      accessorFn: (row) => row.generalInfo.fullName,
      header: () => <span>Full Name</span>,
      cell: (info) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(`/dashboard/users/${info.row.original.generalInfo.id}`)
          }
        >
          {info.getValue() as string}
        </div>
      ),
    },
    {
      id: "email",
      accessorFn: (row) => row.generalInfo.email,
      header: () => <span>Email</span>,
      cell: (info) => info.getValue(),
    },
    {
      id: "dateJoined",
      accessorFn: (row) => row.generalInfo.dateJoined,
      header: () => <span>Date Joined</span>,
      cell: (info) => formatDate(info.getValue() as string),
    },
    {
      id: "phoneNumber",
      accessorFn: (row) => row.generalInfo.phoneNumber,
      header: () => <span>Phone Number</span>,
      cell: (info) => info.getValue(),
    },
    {
      id: "status",
      accessorFn: (row) => row.generalInfo.status,
      header: () => <span>Status</span>,
      cell: (info) => (
        <span className={`status ${(info.getValue() as string).toLowerCase()}`}>
          {info.getValue() as string}
        </span>
      ),
    },
    {
      id: "action",
      accessorFn: (row) => row.generalInfo.id,
      header: () => <span>Action</span>,
      cell: (info) => <ActionMenu userId={info.row.original.generalInfo.id} />,
    },
  ];
  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  // Check here akanni
  function generatePaginationButtons(
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
  ) {
    const buttons: (number | string)[] = [];
    const maxVisible = 3;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) buttons.push(i);
    } else {
      buttons.push(1);

      if (currentPage > maxVisible + 1) buttons.push("...");

      const startPage = Math.max(2, currentPage - maxVisible);
      const endPage = Math.min(totalPages - 1, currentPage + maxVisible);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(i);
      }

      if (currentPage < totalPages - maxVisible) buttons.push("...");

      buttons.push(totalPages);
    }

    return buttons.map((btn, index) =>
      typeof btn === "number" ? (
        <button
          key={index}
          onClick={() => onPageChange(btn)}
          className={currentPage === btn ? "active" : ""}
        >
          {btn}
        </button>
      ) : (
        <span key={index} className="ellipsis">
          {btn}
        </span>
      )
    );
  }

  return (
    <div className="table-container">
      <button onClick={toggleFilterModal} className="filter-button">
        Filter By <img src={DropDown} alt="" />
      </button>
      <div className="user-list-table">
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
        {/* Pagination */}
        <div className="pagination-controls">
          <div className="left">
            Showing{" "}
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>{" "}
            out of {users.length}
          </div>

          <div className="right">
            <button
              className="prev"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>

            {generatePaginationButtons(
              table.getState().pagination.pageIndex + 1,
              table.getPageCount(),
              (page) => table.setPageIndex(page - 1)
            )}

            <button
              className="next"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
