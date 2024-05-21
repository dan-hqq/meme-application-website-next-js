"use client"

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    return (
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`mx-1 px-4 py-2 border rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };
  