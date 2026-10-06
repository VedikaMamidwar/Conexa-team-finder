
import React from "react";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Sparkles,
} from "lucide-react";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    if (totalPages <= 1) {
        return null;
    }

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handleFirst = () => {
        if (currentPage !== 1) {
            onPageChange(1);
        }
    };

    const handleLast = () => {
        if (currentPage !== totalPages) {
            onPageChange(totalPages);
        }
    };

    return (
        <div className="mt-10 flex w-full flex-col items-center gap-5">

            {/* =====================================================
                PAGINATION HEADER INFO
            ====================================================== */}
            <div className="flex flex-wrap items-center justify-center gap-3">

                {/* Current Page Box */}
                <div className="group flex items-center gap-2 rounded-2xl border border-[#99F6E4] bg-[#F0FDFA] px-4 py-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#14B8A6] transition-transform duration-300 group-hover:scale-110">
                        <Sparkles size={15} />
                    </div>

                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#14B8A6]">
                            Browsing
                        </p>

                        <p className="text-xs font-extrabold text-[#0F766E]">
                            Page {currentPage}
                        </p>
                    </div>

                </div>

                {/* Total Pages Box */}
                <div className="group flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1E1B4B] text-white transition-transform duration-300 group-hover:scale-110">
                        <span className="text-xs font-extrabold">
                            {totalPages}
                        </span>
                    </div>

                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Available
                        </p>

                        <p className="text-xs font-extrabold text-[#1E1B4B]">
                            Total Pages
                        </p>
                    </div>

                </div>

            </div>

            {/* =====================================================
                PAGINATION BOX
            ====================================================== */}
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-lg transition-all duration-300 hover:shadow-xl">

                {/* Decorative Background */}
                <div className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full bg-[#CCFBF1]/50 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-slate-100/70 blur-2xl" />

                <div className="relative flex items-center gap-1.5 sm:gap-2">

                    {/* =================================================
                        FIRST PAGE
                    ================================================== */}
                    <button
                        type="button"
                        onClick={handleFirst}
                        disabled={currentPage === 1}
                        aria-label="Go to first page"
                        className="group hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:text-[#14B8A6] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-500 sm:flex"
                    >
                        <ChevronsLeft
                            size={17}
                            className="transition-transform duration-300 group-hover:-translate-x-0.5"
                        />
                    </button>

                    {/* =================================================
                        PREVIOUS BUTTON
                    ================================================== */}
                    <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                        className="group flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:text-[#14B8A6] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600 sm:px-4"
                    >
                        <ChevronLeft
                            size={17}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />

                        <span className="hidden sm:inline">
                            Previous
                        </span>
                    </button>

                    {/* =================================================
                        PAGE NUMBERS
                    ================================================== */}
                    <div className="flex items-center gap-1.5">

                        {pages.map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => onPageChange(page)}
                                aria-label={`Go to page ${page}`}
                                aria-current={
                                    currentPage === page
                                        ? "page"
                                        : undefined
                                }
                                className={`group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl text-sm font-extrabold transition-all duration-300 ${
                                    currentPage === page
                                        ? "scale-105 bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] text-white shadow-lg shadow-slate-200"
                                        : "border border-transparent text-slate-600 hover:-translate-y-1 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:text-[#14B8A6] hover:shadow-md"
                                }`}
                            >
                                {/* Active shine */}
                                {currentPage === page && (
                                    <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
                                )}

                                <span className="relative">
                                    {page}
                                </span>
                            </button>
                        ))}

                    </div>

                    {/* =================================================
                        NEXT BUTTON
                    ================================================== */}
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                        className="group flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:text-[#14B8A6] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600 sm:px-4"
                    >
                        <span className="hidden sm:inline">
                            Next
                        </span>

                        <ChevronRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </button>

                    {/* =================================================
                        LAST PAGE
                    ================================================== */}
                    <button
                        type="button"
                        onClick={handleLast}
                        disabled={currentPage === totalPages}
                        aria-label="Go to last page"
                        className="group hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:text-[#14B8A6] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-500 sm:flex"
                    >
                        <ChevronsRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                    </button>

                </div>
            </div>

            {/* =====================================================
                PAGE STATUS
            ====================================================== */}
            <div className="group flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">

                <span>
                    Page
                </span>

                <span className="flex h-6 min-w-6 items-center justify-center rounded-lg bg-gradient-to-r from-[#1E1B4B] to-[#14B8A6] px-1.5 font-extrabold text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                    {currentPage}
                </span>

                <span>
                    of
                </span>

                <span className="font-extrabold text-[#1E1B4B]">
                    {totalPages}
                </span>

            </div>

            {/* =====================================================
                SMALL NAVIGATION HINT BOXES
            ====================================================== */}
            <div className="grid w-full max-w-md grid-cols-2 gap-3">

                {/* Previous Hint */}
                <div className="group flex items-center justify-center gap-2 rounded-2xl border border-[#99F6E4] bg-gradient-to-r from-[#F0FDFA] to-white px-3 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

                    <ChevronLeft
                        size={15}
                        className="text-[#14B8A6] transition-transform duration-300 group-hover:-translate-x-1"
                    />

                    <span className="text-[11px] font-semibold text-slate-600">
                        Previous results
                    </span>

                </div>

                {/* Next Hint */}
                <div className="group flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white px-3 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

                    <span className="text-[11px] font-semibold text-slate-600">
                        More results
                    </span>

                    <ChevronRight
                        size={15}
                        className="text-[#14B8A6] transition-transform duration-300 group-hover:translate-x-1"
                    />

                </div>

            </div>

        </div>
    );
};

export default Pagination;
