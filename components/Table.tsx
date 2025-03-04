import React, { ReactNode } from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import { FilterBar } from "@/pages/filterBar";
import { FilterKey } from "@/graphql/types/members";

interface TableColumn {
  title: string;
  dataIndex?: string;
  render?: (value?: any, record?: any, index?: number) => ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: { [key: string]: any }[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
  onPageChange: (cursor: string | null) => void;
  onPageSizeChange: (size: number) => void;
  pageSize: number;
  onFilterChange: (key: FilterKey, value: string | null) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  pageInfo,
  onPageChange,
  onPageSizeChange,
  pageSize,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col w-full bg-[#0A171D] border-2 py-4 border-secondary mt-8">
      <FilterBar data={data} onFilterChange={onFilterChange} />
      <div className="min-w-full overflow-auto h-[70vh]">
        <table>
          <thead className="sticky top-0 bg-[#0B1D26]">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-3 text-left text-secondary text-xs font-semibold">
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-[#667085] text-secondary text-sm">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {col.render ? col.render(row[col.dataIndex || ""], row, rowIndex) : row[col.dataIndex || ""] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 gap-4 mr-4">
        <select
          className="border border-gray-600 bg-[#111] text-white rounded px-4 py-2"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option value={10}>10 Entries</option>
          <option value={20}>20 Entries</option>
          <option value={30}>30 Entries</option>
        </select>

        <div className="flex items-center">
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-white rounded-l-md hover:bg-gray-700 disabled:opacity-50"
            disabled={!pageInfo.endCursor}
            onClick={() => onPageChange(null)}
          >
            <MoveLeft className="w-4 h-4" /> Previous
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-white rounded-r-md hover:bg-gray-700 disabled:opacity-50"
            disabled={!pageInfo.hasNextPage}
            onClick={() => onPageChange(pageInfo.endCursor)}
          >
            Next <MoveRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
