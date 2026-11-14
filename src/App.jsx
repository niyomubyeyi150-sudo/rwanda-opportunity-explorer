import { useState } from "react";
import hezaLogo from "./assets/Heza Rwanda Opportunities Logo.png";
import { seedOpportunities } from "./data/seedOpportunities";
import OpportunityList from "./component/OpportunityList";
import OpportunityFilters from "./component/OpportunityFilters";
import AddOpportunityForm from "./component/AddOpportunityForm";

function App() {
  const [opportunities, setOpportunities] = useState(seedOpportunities);
  const [savedIds, setSavedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [showForm, setShowForm] = useState(false);

  // SUCCESS AND CANCEL MESSAGES
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

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

  // SAVE AND UNSAVE OPPORTUNITIES
  function handleSave(id) {
    setSavedIds((currentSavedIds) =>
      currentSavedIds.includes(id)
        ? currentSavedIds.filter((savedId) => savedId !== id)
        : [...currentSavedIds, id],
    );
  }

  // FILTER AND SORT OPPORTUNITIES
  const filteredOpportunities = opportunities
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

  // RESET FILTERS
  function handleResetFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
    setAvailableOnly(false);
    setSavedOnly(false);
    setSortBy("date");
  }

  // ADD NEW OPPORTUNITY
  function handleAddOpportunity(newOpportunity) {
    setOpportunities((current) => [...current, newOpportunity]);

    setShowForm(false);
    handleResetFilters();

    setFeedbackMessage("Opportunity added successfully!");
    setFeedbackType("success");
  }

  // CANCEL ADD OPPORTUNITY
  function handleCancelForm() {
    setShowForm(false);

    setFeedbackMessage("Adding opportunity was cancelled.");
    setFeedbackType("cancel");
  }

  // OPEN ADD OPPORTUNITY FORM
  function handleOpenForm() {
    setFeedbackMessage("");
    setFeedbackType("");
    setShowForm(true);
  }

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#302B31]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#E8D8C5] bg-[#F7F3ED]/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#home" className="flex items-center">
            <img
              src={hezaLogo}
              alt="Heza - Rwanda Opportunities Explorer"
              className="h-16 w-auto object-contain"
            />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-sm font-medium transition hover:text-[#C87968]"
            >
              Home
            </a>

            <a
              href="#opportunities"
              className="text-sm font-medium transition hover:text-[#C87968]"
            >
              Explore Opportunities
            </a>

            <a
              href="#categories"
              className="text-sm font-medium transition hover:text-[#C87968]"
            >
              Categories
            </a>

            <a
              href="#about"
              className="text-sm font-medium transition hover:text-[#C87968]"
            >
              About
            </a>
          </div>

          <a
            href="#opportunities"
            className="rounded-full bg-[#C87968] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#AD6254]"
          >
            Get Started
          </a>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
            <div>
              <span className="mb-5 inline-block rounded-full bg-[#E8D8C5] px-4 py-2 text-sm font-semibold text-[#8F574B]">
                Discover. Learn. Grow.
              </span>

              <h1 className="max-w-xl text-4xl leading-tight font-bold tracking-tight md:text-6xl">
                Your next opportunity starts{" "}
                <span className="text-[#C87968]">here.</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-[#6D6265]">
                Discover workshops, career events, short courses, and community
                activities happening across Rwanda. Find opportunities that help
                you learn, connect, and grow.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#opportunities"
                  className="rounded-full bg-[#C87968] px-7 py-3.5 font-semibold text-white transition hover:bg-[#AD6254]"
                >
                  Explore Opportunities
                </a>

                <a
                  href="#categories"
                  className="rounded-full border border-[#C87968] px-7 py-3.5 font-semibold text-[#C87968] transition hover:bg-[#E8D8C5]"
                >
                  Browse Categories
                </a>
              </div>

              {/* STATISTICS */}
              <div className="mt-12 grid max-w-lg grid-cols-3 gap-5">
                <div>
                  <h2 className="text-3xl font-bold text-[#C87968]">
                    {opportunities.length}
                  </h2>
                  <p className="mt-1 text-sm text-[#6D6265]">Opportunities</p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#C87968]">
                    {categories.length}
                  </h2>
                  <p className="mt-1 text-sm text-[#6D6265]">Categories</p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#C87968]">6</h2>
                  <p className="mt-1 text-sm text-[#6D6265]">Cities</p>
                </div>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="relative">
              <div className="absolute -right-4 -bottom-4 h-full w-full rounded-3xl bg-[#E8D8C5]" />

              <img
                src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=85"
                alt="People working together and learning"
                className="relative h-[350px] w-full rounded-3xl object-cover shadow-xl md:h-[470px]"
              />

              <div className="absolute right-5 bottom-5 left-5 rounded-2xl bg-white/95 p-5 shadow-lg">
                <p className="text-sm font-semibold text-[#C87968]">
                  Opportunities are waiting
                </p>
                <p className="mt-1 text-lg font-bold">
                  Take your next step with Heza.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section id="categories" className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="text-sm font-bold tracking-widest text-[#C87968] uppercase">
                Explore by category
              </span>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
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
        <section id="opportunities" className="bg-[#F7F3ED] px-6 py-20">
          <div className="mx-auto max-w-7xl">
            {/* SECTION HEADING */}
            <div className="mb-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C87968]">
                Explore opportunities
              </p>

              <h2 className="text-3xl font-bold text-[#302B31] md:text-4xl">
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

            {/* SUCCESS AND CANCEL FEEDBACK */}
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

            {/* ADD OPPORTUNITY FORM */}
            {showForm && (
              <div className="mb-10">
                <AddOpportunityForm
                  onAdd={handleAddOpportunity}
                  onCancel={handleCancelForm}
                />
              </div>
            )}

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

            {/* OPPORTUNITY CARDS */}
            <OpportunityList
              opportunities={filteredOpportunities}
              savedIds={savedIds}
              onSave={handleSave}
            />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="bg-[#302B31] px-6 py-20 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
            <div>
              <span className="text-sm font-bold tracking-widest text-[#E8B5A5] uppercase">
                About Heza
              </span>

              <h2 className="mt-4 text-3xl leading-tight font-bold md:text-4xl">
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

            <div className="rounded-3xl bg-[#453B40] p-8 md:p-10">
              <h3 className="text-2xl font-bold">Discover more with Heza</h3>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <span className="text-2xl text-[#E8B5A5]">✦</span>
                  <div>
                    <h4 className="font-semibold">Discover</h4>
                    <p className="mt-1 text-sm leading-6 text-[#E5DCD9]">
                      Find opportunities that match your interests.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-2xl text-[#E8B5A5]">✦</span>
                  <div>
                    <h4 className="font-semibold">Connect</h4>
                    <p className="mt-1 text-sm leading-6 text-[#E5DCD9]">
                      Connect with learning and community experiences.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-2xl text-[#E8B5A5]">✦</span>
                  <div>
                    <h4 className="font-semibold">Grow</h4>
                    <p className="mt-1 text-sm leading-6 text-[#E5DCD9]">
                      Take meaningful steps toward your future.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#241F24] px-6 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
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
