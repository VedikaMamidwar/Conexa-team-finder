import React, { useState } from "react";
import HackathonHeader from "../../components/hackathons/HackathonHeader";
import SearchBar from "../../components/hackathons/SearchBar";
import FilterSidebar from "../../components/hackathons/FilterSidebar";
import FeaturedHackathon from "../../components/hackathons/FeaturedHackathon";
import HackathonGrid from "../../components/hackathons/HackathonGrid";
import Pagination from "../../components/hackathons/Pagination";

const Hackathons = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    mode: "All",
    category: "All",
    difficulty: "All",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Hackathon data
  const hackathons = [
    {
      id: 1,
      title: "AI Innovation Hackathon 2026",
      organizer: "Tech Innovators",
      description:
        "Build innovative AI-powered solutions for real-world problems.",
      category: "Artificial Intelligence",
      mode: "Online",
      difficulty: "Intermediate",
      location: "Online",
      prize: "₹2,00,000",
      participants: 250,
      maxParticipants: 500,
      deadline: "15 September 2026",
      image: "/assets/hackathons/banner.jpg",
      featured: true,
    },

    {
      id: 2,
      title: "Web Development Challenge 2026",
      organizer: "Code Masters",
      description:
        "Create modern and scalable web applications using the latest technologies.",
      category: "Web Development",
      mode: "Online",
      difficulty: "Beginner",
      location: "Online",
      prize: "₹1,00,000",
      participants: 180,
      maxParticipants: 400,
      deadline: "25 September 2026",
      image: "/assets/hackathons/banner.jpg",
      featured: false,
    },

    {
      id: 3,
      title: "Cyber Security Hackathon",
      organizer: "SecureTech",
      description:
        "Develop innovative solutions to solve modern cybersecurity challenges.",
      category: "Cybersecurity",
      mode: "Offline",
      difficulty: "Advanced",
      location: "Nagpur, India",
      prize: "₹1,50,000",
      participants: 120,
      maxParticipants: 300,
      deadline: "5 October 2026",
      image: "/assets/hackathons/banner.jpg",
      featured: false,
    },

    {
      id: 4,
      title: "Green Technology Hackathon",
      organizer: "EcoTech",
      description:
        "Build technology solutions that help create a sustainable future.",
      category: "Technology",
      mode: "Online",
      difficulty: "Intermediate",
      location: "Online",
      prize: "₹75,000",
      participants: 95,
      maxParticipants: 250,
      deadline: "12 October 2026",
      image: "/assets/hackathons/banner.jpg",
      featured: false,
    },

    {
      id: 5,
      title: "FinTech Innovation Challenge",
      organizer: "Future Finance",
      description:
        "Develop innovative financial technology solutions for modern users.",
      category: "FinTech",
      mode: "Online",
      difficulty: "Advanced",
      location: "Online",
      prize: "₹2,50,000",
      participants: 210,
      maxParticipants: 500,
      deadline: "20 October 2026",
      image: "/assets/hackathons/banner.jpg",
      featured: false,
    },

    {
      id: 6,
      title: "Student App Development Hackathon",
      organizer: "Student Developers",
      description:
        "Create useful mobile or web applications designed for students.",
      category: "App Development",
      mode: "Offline",
      difficulty: "Beginner",
      location: "Amravati, India",
      prize: "₹50,000",
      participants: 75,
      maxParticipants: 200,
      deadline: "30 October 2026",
      image: "/assets/hackathons/banner.jpg",
      featured: false,
    },
  ];

  // Featured hackathon
  const featuredHackathon = hackathons.find(
    (hackathon) => hackathon.featured
  );

  // Search + filter
  const filteredHackathons = hackathons.filter((hackathon) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      hackathon.title.toLowerCase().includes(search) ||
      hackathon.organizer.toLowerCase().includes(search) ||
      hackathon.category.toLowerCase().includes(search);

    const matchesMode =
      filters.mode === "All" ||
      hackathon.mode === filters.mode;

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

  // Search handler
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Filter handler
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="hackathons-page">

      {/* Header */}
      <HackathonHeader />

      <div className="hackathons-container">

        {/* Search */}
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
        />

        {/* Featured Hackathon */}
        {!searchTerm && featuredHackathon && (
          <FeaturedHackathon
            hackathon={featuredHackathon}
          />
        )}

        <div className="hackathon-content">

          {/* Sidebar */}
          <aside className="hackathon-sidebar">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Main Content */}
          <main className="hackathon-main">

            {/* Heading */}
            <div className="hackathon-list-header">
              <div>
                <h2>Explore Hackathons</h2>

                <p>
                  Find exciting hackathons and showcase
                  your skills.
                </p>
              </div>

              <span>
                {filteredHackathons.length} Hackathons
              </span>
            </div>

            {/* Hackathon Cards */}
            <HackathonGrid
              hackathons={filteredHackathons}
            />

            {/* Pagination */}
            {filteredHackathons.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  filteredHackathons.length / 6
                )}
                onPageChange={setCurrentPage}
              />
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default Hackathons;