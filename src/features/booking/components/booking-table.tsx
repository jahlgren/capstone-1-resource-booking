"use client";

import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import { DataTableProps } from "../types/booking";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";

export default function BookingTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <div>
            <div className="w-full overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50 first:rounded-l-[1.5rem] last:rounded-r-[1.5rem]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="text-center h-14 font-bold text-slate-900 px-6 py-4 first:rounded-l-[1.5rem] last:rounded-r-[1.5rem]"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length
                            ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        className="hover:bg-gb-green/5 transition-colors"
                                        data-state={row.getIsSelected() &&
                                            "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="text-center py-4 px-6 first:rounded-l-[1.5rem] last:rounded-r-[1.5rem]"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )
                            : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between px-6 py-6 bg-slate-50/50 border-t border-slate-100">
                {/* Left Side: Page Indicator */}
                <div className="text-sm font-bold text-slate-500 tracking-tight">
                    Page{" "}
                    <span className="text-slate-900">
                        {table.getState().pagination.pageIndex + 1}
                    </span>{" "}
                    of{" "}
                    <span className="text-slate-900">
                        {table.getPageCount()}
                    </span>
                </div>

                {/* Right Side: Navigation Buttons */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="rounded-full px-5 border-slate-200 text-slate-600 font-bold hover:bg-white hover:text-gb-blue hover:border-gb-blue disabled:opacity-30 transition-all"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="rounded-full px-5 border-slate-200 text-slate-600 font-bold hover:bg-white hover:text-gb-blue hover:border-gb-blue disabled:opacity-30 transition-all"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
