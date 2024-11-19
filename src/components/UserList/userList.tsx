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
import { UserSummary } from "../../types/types";
import ActionMenu from "../ActionMenu/ActionMenu";
import FilterModal from "../FilterModal/FilterModal";
import sortIcon from "../../assets/dropDown.svg";
import arrowDown from "../../assets/dropDown.svg";
import arrowUp from "../../assets/filter.svg";

const UserList: React.FC = () => {
  const { userList } = useUsers();
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

  const columns: ColumnDef<UserSummary>[] = [
    {
      accessorKey: "organization",
      header: ({ column }) => (
        <div
          className="column-header"
          onClick={() => column.toggleSorting()}
          style={{ cursor: "pointer" }}
        >
          <span>Organization</span>
          {column.getIsSorted() === "asc" && (
            <img src={arrowUp} alt="Ascending" />
          )}
          {column.getIsSorted() === "desc" && (
            <img src={arrowDown} alt="Descending" />
          )}
          {!column.getIsSorted() && <img src={sortIcon} alt="Unsorted" />}
        </div>
      ),
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <div
          className="column-header"
          onClick={() => column.toggleSorting()}
          style={{ cursor: "pointer" }}
        >
          <span>Full Name</span>
          {column.getIsSorted() === "asc" && (
            <img src={arrowUp} alt="Ascending" />
          )}
          {column.getIsSorted() === "desc" && (
            <img src={arrowDown} alt="Descending" />
          )}
          {!column.getIsSorted() && <img src={sortIcon} alt="Unsorted" />}
        </div>
      ),
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
      header: () => <span className="column-header">Email</span>,
    },
    {
      accessorKey: "dateJoined",
      header: ({ column }) => (
        <div
          className="column-header"
          onClick={() => column.toggleSorting()}
          style={{ cursor: "pointer" }}
        >
          <span>Date Joined</span>
          {column.getIsSorted() === "asc" && (
            <img src={arrowUp} alt="Ascending" />
          )}
          {column.getIsSorted() === "desc" && (
            <img src={arrowDown} alt="Descending" />
          )}
          {!column.getIsSorted() && <img src={sortIcon} alt="Unsorted" />}
        </div>
      ),
      cell: (info) => formatDate(info.getValue() as string),
    },
    {
      accessorKey: "phoneNumber",
      header: () => <span className="column-header">Phone Number</span>,
      cell: (info) => <span>{info.getValue() as string}</span>,
    },
    {
      accessorKey: "status",
      header: () => <span className="column-header">Status</span>,
      cell: (info) => (
        <span
          className={
            info.getValue() === "Active"
              ? "sactive"
              : info.getValue() === "Blacklisted"
              ? "sblacklisted"
              : info.getValue() === "Pending"
              ? "spending"
              : "sinactive"
          }
        >
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorFn: (row) => row.id,
      id: "action",
      header: () => <span className="column-header">Action</span>,
      cell: (info) => <ActionMenu userId={info.row.original.id} />,
    },
  ];

  const table = useReactTable({
    data: userList,
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
        Filter By <img src={arrowDown} alt="" />
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
        {/* Pagination Controls */}
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
            out of {userList.length}
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
              table.getState().pagination.pageIndex + 1, // Current page (1-based)
              table.getPageCount(), // Total pages
              (page) => table.setPageIndex(page - 1) // Change page handler
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
