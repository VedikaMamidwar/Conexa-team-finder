
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";

import HackathonHeader from "../../components/hackathons/HackathonHeader";
import SearchBar from "../../components/hackathons/SearchBar";
import FilterSidebar from "../../components/hackathons/FilterSidebar";
import FeaturedHackathon from "../../components/hackathons/FeaturedHackathon";
import HackathonGrid from "../../components/hackathons/HackathonGrid";
import Pagination from "../../components/hackathons/Pagination";

import { hackathons } from "../../data/hackathonData";

export default function Hackathons() {
  const navigate = useNavigate();

  // Search
  const [search, setSearch] = useState("");

  // Filters
  const [filters, setFilters] = useState({
    mode: "All",
    category: "All",
    difficulty: "All",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // -----------------------------------------
  // FILTER + SEARCH
  // -----------------------------------------

  const filteredHackathons = useMemo(() => {
    return hackathons.filter((hackathon) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        searchText === "" ||
        hackathon.title.toLowerCase().includes(searchText) ||
        hackathon.description.toLowerCase().includes(searchText) ||
        hackathon.organizer.toLowerCase().includes(searchText) ||
        hackathon.category.toLowerCase().includes(searchText) ||
        hackathon.skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesMode =
        filters.mode === "All" || hackathon.mode === filters.mode;

      const matchesCategory =
        filters.category === "All" ||
        hackathon.category === filters.category;

      const matchesDifficulty =
        filters.difficulty === "All" ||
        hackathon.difficulty === filters.difficulty;

      return (
        matchesSearch &&
        matchesMode &&
        matchesCategory &&
        matchesDifficulty
      );
    });
  }, [search, filters]);

  // -----------------------------------------
  // PAGINATION
  // -----------------------------------------

  const totalPages = Math.ceil(
    filteredHackathons.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedHackathons = filteredHackathons.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // -----------------------------------------
  // FILTER HANDLER
  // -----------------------------------------

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // -----------------------------------------
  // SEARCH HANDLER
  // -----------------------------------------

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // -----------------------------------------
  // PAGE CHANGE
  // -----------------------------------------

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // -----------------------------------------
  // RESET FILTERS
  // -----------------------------------------

  const handleReset = () => {
    setSearch("");

    setFilters({
      mode: "All",
      category: "All",
      difficulty: "All",
    });

    setCurrentPage(1);
  };

  // -----------------------------------------
  // FEATURED HACKATHON
  // -----------------------------------------

  const featuredHackathon = hackathons.find(
    (hackathon) => hackathon.featured
  );

  // -----------------------------------------
  // VIEW DETAILS
  // -----------------------------------------

  const handleViewDetails = (id) => {
    navigate(`/hackathons/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* =====================================
          NAVBAR
      ====================================== */}

      <Navbar />

      {/* =====================================
          MAIN
      ====================================== */}

      <main>
        {/* Header */}
        <HackathonHeader />

        {/* =====================================
            SEARCH SECTION
        ====================================== */}

        <section className="relative">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6">
              <SearchBar
                search={search}
                setSearch={handleSearchChange}
              />
            </div>
          </div>
        </section>

        {/* =====================================
            FEATURED HACKATHON
        ====================================== */}

        {featuredHackathon && (
          <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="mb-5">
              <div className="flex items-center gap-3">
                <span className="h-8 w-1 rounded-full bg-[#1E1B4B]"></span>

                <div>
                  <h2 className="text-xl font-bold text-[#1E1B4B]">
                    Featured Hackathon
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Explore our highlighted opportunities
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-xl">
              <FeaturedHackathon
                hackathon={featuredHackathon}
                onViewDetails={handleViewDetails}
              />
            </div>
          </section>
        )}

        {/* =====================================
            MAIN HACKATHON SECTION
        ====================================== */}

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">

            {/* =================================
                SIDEBAR
            ================================== */}

            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              </div>
            </aside>

            {/* =================================
                HACKATHONS
            ================================== */}

            <div className="lg:col-span-3">

              {/* Section Header */}

              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-[#1E1B4B]">
                    Explore Hackathons
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Find the right challenge and build something amazing.
                  </p>
                </div>

                {/* Result Count */}

                <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                  <span className="mr-2 h-2 w-2 rounded-full bg-[#1E1B4B]"></span>

                  <span className="text-sm font-medium text-slate-600">
                    {filteredHackathons.length}{" "}
                    {filteredHackathons.length === 1
                      ? "Hackathon"
                      : "Hackathons"}
                  </span>
                </div>
              </div>

              {/* =================================
                  HACKATHON GRID
              ================================== */}

              {paginatedHackathons.length > 0 ? (
                <>
                  <HackathonGrid
                    hackathons={paginatedHackathons}
                    onViewDetails={handleViewDetails}
                  />

                  {/* =================================
                      PAGINATION
                  ================================== */}

                  {totalPages > 1 && (
                    <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              ) : (
                /* =================================
                    EMPTY STATE
                ================================== */

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
                      <svg
                        className="h-8 w-8 text-[#1E1B4B]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>

                    <h3 className="text-xl font-bold text-[#1E1B4B]">
                      No Hackathons Found
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                      We couldn't find any hackathons matching your search or
                      filters. Try changing your search or resetting the
                      filters.
                    </p>

                    <button
                      onClick={handleReset}
                      className="mt-6 rounded-xl bg-[#1E1B4B] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-900 hover:shadow-lg hover:shadow-indigo-200"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =====================================
            BOTTOM CTA
        ====================================== */}

        <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#1E1B4B] px-6 py-10 shadow-xl sm:px-10">

            {/* Decorative circles */}

            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10"></div>

            <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/5"></div>

            <div className="relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Have an amazing hackathon idea?
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                  Create your own hackathon and connect with talented
                  developers, designers, and innovators.
                </p>
              </div>

              <button
                onClick={() => navigate("/create-hackathon")}
                className="whitespace-nowrap rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#1E1B4B] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 hover:shadow-xl"
              >
                Create Hackathon
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

