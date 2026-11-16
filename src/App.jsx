import { useState } from "react";
import hezaLogo from "./assets/Heza Rwanda Opportunities Logo.png";
import { seedOpportunities } from "./data/seedOpportunities";
import OpportunityList from "./component/OpportunityList";
import OpportunityFilters from "./component/OpportunityFilters";
import AddOpportunityForm from "./component/AddOpportunityForm";

function App() {
  // MAIN STATE
  const [opportunities, setOpportunities] = useState(seedOpportunities);
  const [savedIds, setSavedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [showForm, setShowForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [demoStatus, setDemoStatus] = useState("ready");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  // NAVIGATION LINKS
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Explore Opportunities", href: "#opportunities" },
    { name: "Categories", href: "#categories" },
    { name: "About", href: "#about" },
  ];

  // CATEGORY INFORMATION
  const categories = [
    {
      name: "Workshops",
      description: "Learn practical skills through hands-on sessions.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Career Events",
      description: "Connect with professionals and discover career paths.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Short Courses",
      description: "Build your knowledge with focused learning programs.",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Community Activities",
      description: "Meet people and make a difference in your community.",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Technology",
      description: "Explore opportunities in the world of technology.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Entrepreneurship",
      description: "Discover ideas and opportunities to grow your business.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // SAVE AND UNSAVE
  function handleSave(id) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  }

  // FILTER AND SORT
  const filteredOpportunities = [...opportunities]
    .filter((op) => {
      const search = searchTerm.trim().toLowerCase();

      return (
        (op.title.toLowerCase().includes(search) ||
          op.city.toLowerCase().includes(search)) &&
        (selectedCategory === "All" || op.category === selectedCategory) &&
        (!availableOnly || op.availableSeats > 0) &&
        (!savedOnly || savedIds.includes(op.id))
      );
    })
    .sort((a, b) =>
      sortBy === "date"
        ? a.date.localeCompare(b.date)
        : sortBy === "title"
          ? a.title.localeCompare(b.title)
          : sortBy === "seats"
            ? b.availableSeats - a.availableSeats
            : 0,
    );

  // CITY COUNT
  const cityCount = new Set(opportunities.map((op) => op.city)).size;

  // RESET FILTERS
  function handleResetFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
    setAvailableOnly(false);
    setSavedOnly(false);
    setSortBy("date");
  }

  // ADD OPPORTUNITY
  function handleAddOpportunity(newOpportunity) {
    setOpportunities((current) => [...current, newOpportunity]);
    setShowForm(false);
    handleResetFilters();
    setDemoStatus("ready");
    setFeedbackMessage("Opportunity added successfully!");
    setFeedbackType("success");
  }

  // CANCEL FORM
  function handleCancelForm() {
    setShowForm(false);
    setFeedbackMessage("Adding opportunity was cancelled.");
    setFeedbackType("cancel");
  }

  // OPEN FORM
  function handleOpenForm() {
    setFeedbackMessage("");
    setFeedbackType("");
    setShowForm(true);
  }

  // OPPORTUNITY CONTENT
  let opportunityContent;

  if (demoStatus === "loading") {
    opportunityContent = (
      <div
        role="status"
        className="rounded-2xl border border-[#E8D8C5] bg-white p-8 text-center sm:p-10"
      >
        <h3 className="text-xl font-bold">Loading opportunities...</h3>
        <p className="mt-3 text-[#6D6265]">
          Please wait while opportunities are being prepared.
        </p>
      </div>
    );
  } else if (demoStatus === "error") {
    opportunityContent = (
      <div
        role="alert"
        className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center sm:p-10"
      >
        <h3 className="text-xl font-bold text-red-700">
          Something went wrong!
        </h3>
        <p className="mt-3 text-red-600">
          We could not display the opportunities. Please try again.
        </p>
        <button
          type="button"
          onClick={() => setDemoStatus("ready")}
          className="mt-5 rounded-xl bg-[#C87968] px-6 py-3 font-semibold text-white hover:bg-[#AD6254]"
        >
          Try Again
        </button>
      </div>
    );
  } else if (filteredOpportunities.length === 0) {
    opportunityContent = (
      <div className="rounded-2xl border border-[#E8D8C5] bg-white px-6 py-12 text-center">
        <h3 className="text-xl font-bold">No opportunities found</h3>
        <p className="mx-auto mt-3 max-w-md text-[#6D6265]">
          We couldn't find opportunities matching your search or filters. Try
          changing your search or resetting your filters.
        </p>
        <button
          type="button"
          onClick={handleResetFilters}
          className="mt-6 rounded-xl bg-[#C87968] px-6 py-3 font-semibold text-white hover:bg-[#AD6254]"
        >
          Reset Filters
        </button>
      </div>
    );
  } else {
    opportunityContent = (
      <OpportunityList
        opportunities={filteredOpportunities}
        savedIds={savedIds}
        onSave={handleSave}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#302B31]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#E8D8C5] bg-[#F7F3ED]/95 backdrop-blur">
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>
            <img
              src={hezaLogo}
              alt="Heza - Rwanda Opportunities Explorer"
              className="h-12 w-auto object-contain sm:h-16"
            />
          </a>

          {/* DESKTOP LINKS */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition hover:text-[#C87968]"
              >
                {link.name}
              </a>
            ))}
          </div>

          <a
            href="#opportunities"
            className="hidden rounded-full bg-[#C87968] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#AD6254] md:inline-flex"
          >
            Get Started
          </a>

          {/* HAMBURGER BUTTON */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="rounded-lg border border-[#E8D8C5] p-2 text-xl md:hidden"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>

          {/* MOBILE MENU */}
          {isMobileMenuOpen && (
            <div className="absolute top-full right-0 left-0 flex flex-col gap-5 border-b border-[#E8D8C5] bg-[#F7F3ED] p-6 shadow-lg md:hidden">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-medium transition hover:text-[#C87968]"
                >
                  {link.name}
                </a>
              ))}

              <a
                href="#opportunities"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full bg-[#C87968] px-5 py-3 text-center font-semibold text-white hover:bg-[#AD6254]"
              >
                Get Started
              </a>
            </div>
          )}
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
            <div>
              <span className="mb-5 inline-block rounded-full bg-[#E8D8C5] px-4 py-2 text-sm font-semibold text-[#8F574B]">
                Discover. Learn. Grow.
              </span>

              <h1 className="max-w-xl text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl">
                Your next opportunity starts{" "}
                <span className="text-[#C87968]">here.</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-[#6D6265] sm:text-lg">
                Discover workshops, career events, short courses, and community
                activities happening across Rwanda. Find opportunities that help
                you learn, connect, and grow.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="#opportunities"
                  className="rounded-full bg-[#C87968] px-5 py-3 font-semibold text-white transition hover:bg-[#AD6254] sm:px-7 sm:py-3.5"
                >
                  Explore Opportunities
                </a>
                <a
                  href="#categories"
                  className="rounded-full border border-[#C87968] px-5 py-3 font-semibold text-[#C87968] transition hover:bg-[#E8D8C5] sm:px-7 sm:py-3.5"
                >
                  Browse Categories
                </a>
              </div>

              {/* STATISTICS */}
              <div className="mt-12 grid max-w-lg grid-cols-3 gap-3 sm:gap-5">
                <div>
                  <h2 className="text-2xl font-bold text-[#C87968] sm:text-3xl">
                    {opportunities.length}
                  </h2>
                  <p className="mt-1 text-xs text-[#6D6265] sm:text-sm">
                    Opportunities
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#C87968] sm:text-3xl">
                    {categories.length}
                  </h2>
                  <p className="mt-1 text-xs text-[#6D6265] sm:text-sm">
                    Categories
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#C87968] sm:text-3xl">
                    {cityCount}
                  </h2>
                  <p className="mt-1 text-xs text-[#6D6265] sm:text-sm">
                    Cities
                  </p>
                </div>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="relative">
              <div className="absolute -right-2 -bottom-2 h-full w-full rounded-3xl bg-[#E8D8C5] sm:-right-4 sm:-bottom-4" />
              <img
                src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=85"
                alt="People working together and learning"
                className="relative h-[300px] w-full rounded-3xl object-cover shadow-xl sm:h-[400px] md:h-[470px]"
              />
              <div className="absolute right-3 bottom-3 left-3 rounded-2xl bg-white/95 p-4 shadow-lg sm:right-5 sm:bottom-5 sm:left-5 sm:p-5">
                <p className="text-sm font-semibold text-[#C87968]">
                  Opportunities are waiting
                </p>
                <p className="mt-1 text-base font-bold sm:text-lg">
                  Take your next step with Heza.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section
          id="categories"
          className="bg-white px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="text-sm font-bold tracking-widest text-[#C87968] uppercase">
                Explore by category
              </span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Find what inspires you
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6D6265]">
                Explore different types of opportunities and discover something
                that matches your interests and goals.
              </p>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="group overflow-hidden rounded-2xl border border-[#E8D8C5] bg-[#F7F3ED] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#6D6265]">
                      {category.description}
                    </p>
                    <a
                      href="#opportunities"
                      className="mt-5 inline-flex items-center gap-2 font-semibold text-[#C87968] transition hover:gap-3"
                    >
                      Explore <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPPORTUNITIES SECTION */}
        <section id="opportunities" className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="mb-3 text-sm font-semibold tracking-widest text-[#C87968] uppercase">
                Explore opportunities
              </p>
              <h2 className="text-3xl font-bold md:text-4xl">
                Find your next opportunity
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[#6D6265]">
                Explore workshops, career events, short courses and community
                activities happening across Rwanda.
              </p>
            </div>

            {/* ADD OPPORTUNITY BUTTON */}
            {!showForm && (
              <button
                type="button"
                onClick={handleOpenForm}
                className="mb-8 rounded-xl bg-[#C87968] px-6 py-3 font-semibold text-white transition hover:bg-[#AD6254] focus:outline-none focus:ring-2 focus:ring-[#C87968] focus:ring-offset-2"
              >
                + Add Opportunity
              </button>
            )}

            {/* FEEDBACK MESSAGE */}
            {feedbackMessage && (
              <div
                role="status"
                className={`mb-8 rounded-xl border px-5 py-4 text-sm font-medium ${
                  feedbackType === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-[#E8D8C5] bg-white text-[#6D6265]"
                }`}
              >
                {feedbackMessage}
              </div>
            )}

            {/* ADD FORM */}
            {showForm && (
              <div className="mb-10">
                <AddOpportunityForm
                  onAdd={handleAddOpportunity}
                  onCancel={handleCancelForm}
                />
              </div>
            )}

            {/* DEMO STATES */}
            <div className="mb-6 rounded-2xl border border-[#E8D8C5] bg-white p-5">
              <h3 className="font-bold">Demonstrate interface states</h3>
              <p className="mt-1 text-sm text-[#6D6265]">
                Try the loading and error examples required for this project.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setDemoStatus("ready")}
                  className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                    demoStatus === "ready"
                      ? "bg-[#302B31] text-white"
                      : "border border-[#E8D8C5] bg-white hover:bg-[#F7F3ED]"
                  }`}
                >
                  Show Opportunities
                </button>

                <button
                  type="button"
                  onClick={() => setDemoStatus("loading")}
                  className="rounded-xl border border-[#E8D8C5] bg-white px-5 py-3 text-sm font-semibold hover:bg-[#F7F3ED]"
                >
                  Loading...
                </button>

                <button
                  type="button"
                  onClick={() => setDemoStatus("error")}
                  className="rounded-xl border border-[#E8D8C5] bg-white px-5 py-3 text-sm font-semibold hover:bg-[#F7F3ED]"
                >
                  Error
                </button>
              </div>

              <p className="mt-4 text-xs text-[#6D6265]">
                Current state:{" "}
                <span className="font-semibold capitalize">{demoStatus}</span>
              </p>
            </div>

            {/* FILTERS */}
            <OpportunityFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              availableOnly={availableOnly}
              setAvailableOnly={setAvailableOnly}
              savedOnly={savedOnly}
              setSavedOnly={setSavedOnly}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={handleResetFilters}
            />

            {/* RESULTS COUNT */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#6D6265]">
                Showing{" "}
                <span className="font-bold text-[#302B31]">
                  {filteredOpportunities.length}
                </span>{" "}
                of {opportunities.length} opportunities
              </p>
              <p className="text-sm text-[#6D6265]">
                Saved:{" "}
                <span className="font-bold text-[#302B31]">
                  {savedIds.length}
                </span>
              </p>
            </div>

            {/* OPPORTUNITY CONTENT */}
            {opportunityContent}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section
          id="about"
          className="bg-[#302B31] px-4 py-16 text-white sm:px-6 sm:py-20"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
            <div>
              <span className="text-sm font-bold tracking-widest text-[#E8B5A5] uppercase">
                About Heza
              </span>
              <h2 className="mt-4 text-3xl leading-tight font-bold sm:text-4xl">
                Making opportunities easier to discover.
              </h2>
              <p className="mt-6 leading-8 text-[#E5DCD9]">
                Heza is a platform designed to help people across Rwanda
                discover learning, career, and community opportunities in one
                place. Our goal is to make it easier for everyone to find
                opportunities to develop their skills and reach their goals.
              </p>
              <a
                href="#opportunities"
                className="mt-8 inline-block rounded-full bg-[#C87968] px-7 py-3.5 font-semibold text-white transition hover:bg-[#AD6254]"
              >
                Start Exploring
              </a>
            </div>

            <div className="rounded-3xl bg-[#453B40] p-6 sm:p-10">
              <h3 className="text-2xl font-bold">Discover more with Heza</h3>

              <div className="mt-8 space-y-6">
                {[
                  {
                    title: "Discover",
                    description:
                      "Find opportunities that match your interests.",
                  },
                  {
                    title: "Connect",
                    description:
                      "Connect with learning and community experiences.",
                  },
                  {
                    title: "Grow",
                    description: "Take meaningful steps toward your future.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl text-[#E8B5A5]">✦</span>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="mt-1 text-sm leading-6 text-[#E5DCD9]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#241F24] px-4 py-8 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">
              Heza<span className="text-[#C87968]">.</span>
            </h2>
            <p className="mt-1 text-sm text-[#C9BFBC]">
              Rwanda Opportunities Explorer
            </p>
          </div>

          <p className="text-center text-sm text-[#C9BFBC]">
            © {new Date().getFullYear()} Heza. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
