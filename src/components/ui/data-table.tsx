import { useMemo, useState } from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { SearchInput, Select } from "./Input";
import { NoData } from "./feedback";
import { TableSkeleton } from "./loading";

export interface DataTableProps<TData> { data: TData[]; columns: ColumnDef<TData, unknown>[]; loading?: boolean; searchable?: boolean; searchPlaceholder?: string; emptyTitle?: string; pageSizeOptions?: number[]; getRowId?: (row: TData) => string; }
export function DataTable<TData>({ data, columns, loading, searchable = true, searchPlaceholder = "Search…", emptyTitle = "No results", pageSizeOptions = [10, 20, 50], getRowId }: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: pageSizeOptions[0] ?? 10 });
  const stableColumns = useMemo(() => columns, [columns]);
  // TanStack Table intentionally exposes a mutable instance that React Compiler must skip.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({ data, columns: stableColumns, state: { globalFilter, pagination }, onGlobalFilterChange: setGlobalFilter, onPaginationChange: setPagination, getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(), getPaginationRowModel: getPaginationRowModel(), getRowId });
  if (loading) return <TableSkeleton rows={pagination.pageSize > 10 ? 10 : pagination.pageSize}/>;
  return <div className="space-y-4">{searchable && <div className="max-w-sm"><SearchInput value={globalFilter} onChange={event => setGlobalFilter(event.target.value)} placeholder={searchPlaceholder} aria-label={searchPlaceholder}/></div>}<div className="overflow-hidden rounded-lg border"><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-muted text-xs uppercase text-muted-foreground">{table.getHeaderGroups().map(group => <tr key={group.id}>{group.headers.map(header => <th key={header.id} scope="col" className="h-11 px-4 font-semibold">{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>)}</tr>)}</thead><tbody className="divide-y">{table.getRowModel().rows.map(row => <tr key={row.id} className="transition-colors hover:bg-muted/50">{row.getVisibleCells().map(cell => <td key={cell.id} className="px-4 py-3">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}</tr>)}</tbody></table>{table.getRowModel().rows.length === 0 && <NoData title={emptyTitle} className="rounded-none border-0"/>}</div></div><div className="flex flex-col items-center justify-between gap-3 sm:flex-row"><p className="text-xs text-muted-foreground">Page {table.getState().pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)} · {table.getFilteredRowModel().rows.length} results</p><div className="flex items-center gap-2"><Select value={String(pagination.pageSize)} onValueChange={value => table.setPageSize(Number(value))} options={pageSizeOptions.map(size => ({ value: String(size), label: `${size} / page` }))}/><Button variant="outline" size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} aria-label="Previous page"><ChevronLeft className="size-4"/></Button><Button variant="outline" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} aria-label="Next page"><ChevronRight className="size-4"/></Button></div></div></div>;
}
