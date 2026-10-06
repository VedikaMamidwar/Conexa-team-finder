import { hackathons } from "../data/hackathonData";

// Get all hackathons
export const getAllHackathons = () => {
  return hackathons;
};

// Get a single hackathon by ID
export const getHackathonById = (id) => {
  return hackathons.find(
    (hackathon) => hackathon.id === Number(id)
  );
};

// Get featured hackathon
export const getFeaturedHackathon = () => {
  return hackathons.find(
    (hackathon) => hackathon.featured === true
  );
};

// Search hackathons
export const searchHackathons = (searchTerm) => {
  const search = searchTerm.toLowerCase().trim();

  if (!search) {
    return hackathons;
  }

  return hackathons.filter((hackathon) => {
    return (
      hackathon.title.toLowerCase().includes(search) ||
      hackathon.organizer.toLowerCase().includes(search) ||
      hackathon.category.toLowerCase().includes(search) ||
      hackathon.description.toLowerCase().includes(search)
    );
  });
};

// Filter hackathons
export const filterHackathons = (filters) => {
  return hackathons.filter((hackathon) => {
    const modeMatch =
      filters.mode === "All" ||
      hackathon.mode === filters.mode;

    const categoryMatch =
      filters.category === "All" ||
      hackathon.category === filters.category;

    const difficultyMatch =
      filters.difficulty === "All" ||
      hackathon.difficulty === filters.difficulty;

    return modeMatch && categoryMatch && difficultyMatch;
  });
};

// Search + Filter
export const getFilteredHackathons = (
  searchTerm = "",
  filters = {
    mode: "All",
    category: "All",
    difficulty: "All",
  }
) => {
  const search = searchTerm.toLowerCase().trim();

  return hackathons.filter((hackathon) => {
    const matchesSearch =
      !search ||
      hackathon.title.toLowerCase().includes(search) ||
      hackathon.organizer.toLowerCase().includes(search) ||
      hackathon.category.toLowerCase().includes(search) ||
      hackathon.description.toLowerCase().includes(search);

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
};

// Get hackathons created by an organizer
export const getMyHackathons = (organizer) => {
  return hackathons.filter(
    (hackathon) =>
      hackathon.organizer.toLowerCase() ===
      organizer.toLowerCase()
  );
};

// Check whether registration is still available
export const canRegister = (hackathon) => {
  if (!hackathon) {
    return false;
  }

  return (
    hackathon.participants <
    hackathon.maxParticipants
  );
};