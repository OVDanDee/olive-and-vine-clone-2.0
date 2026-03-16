"use client";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import * as Icons from "@/app/utils/icons";

const ArrowBackIcon = () => <Icons.BiSolidChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#888D88]" />;
const ArrowForwardIcon = () => <Icons.BiSolidChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#888D88]" />;
const FirstPageIcon = () => <Icons.BiSolidChevronsLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#888D88]" />;
const LastPageIcon = () => <Icons.BiSolidChevronsRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#888D88]" />;

export default function InsightsPagination({
  count = 10,
  page,
  onPageChange,
}: {
  count?: number;
  page?: number;
  onPageChange?: (page: number) => void;
}) {
  return (
    <Stack spacing={2} className="mt-6 sm:mt-8 flex items-center justify-center">
      <Pagination
        count={count}
        {...(page != null && onPageChange
          ? { page, onChange: (_e: unknown, value: number) => onPageChange(value) }
          : {})}
        showFirstButton
        showLastButton
        size="small"
        sx={{
          "& .MuiPagination-ul": {
            flexWrap: "wrap",
            justifyContent: "center",
          },
        }}
        renderItem={(item) => (
          <PaginationItem
            slots={{ 
              previous: ArrowBackIcon, 
              next: ArrowForwardIcon,
              first: FirstPageIcon,
              last: LastPageIcon
            }}
            {...item}
            sx={{
              "&.MuiPaginationItem-root": {
                color: "#111B12",
                fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                minWidth: { xs: "32px", sm: "36px", md: "42px" },
                height: { xs: "32px", sm: "36px", md: "42px" },
                ...(item.type === "first" || item.type === "previous" || item.type === "next" || item.type === "last" ? {
                  borderRadius: "50%",
                  border: "1px solid rgba(17, 27, 18, 0.5)",
                  minWidth: { xs: "32px", sm: "36px", md: "42px" },
                  height: { xs: "32px", sm: "36px", md: "42px" },
                  color: "rgba(17, 27, 18, 0.7)",
                  "&:hover": {
                    backgroundColor: "#436A1F",
                    borderColor: "#436A1F",
                    color: "#fff",
                    "& svg": { color: "#fff" },
                  },
                  "&:active": {
                    backgroundColor: "#648E3E",
                    borderColor: "#648E3E",
                    color: "#fff",
                    "& svg": { color: "#fff" },
                  },
                } : {}),
                "&.Mui-selected": {
                  backgroundColor: "transparent",
                  color: "#495F2B",
                  textDecoration: "underline",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                },
              },
            }}
          />
        )}
      />
    </Stack>
  );
}
