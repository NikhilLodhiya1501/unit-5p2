import { useCallback, useEffect, useMemo, useState } from "react";
import StudentCard from "./components/StudentCard";
import StudentStats from "./components/StudentStats";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to retrieve student records.");
      }

      const data = await response.json();

      setStudents(data);
    } catch (err) {
      setError(
        err.message || "Something went wrong while fetching data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      return (
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.company.name.toLowerCase().includes(query)
      );
    });
  }, [students, search]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 text-white">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl shadow-lg ring-1 ring-white/20">
                🎓
              </div>

              <div>
                <h1 className="text-lg font-extrabold tracking-wide">
                  CAMPUS<span className="text-cyan-300">CONNECT</span>
                </h1>

                <p className="text-xs text-indigo-200">
                  Student Management System
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Live API Dashboard
            </div>
          </nav>

          <div className="grid items-center gap-8 py-10 md:grid-cols-[1.4fr_0.6fr] md:py-14">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-200">
                React Practical · 07
              </p>

              <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Discover Your
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
                  Student Community.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-indigo-100/80">
                A smart student directory powered by REST API,
                React components, and dynamic data rendering.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#students"
                  className="rounded-xl bg-white px-5 py-3 font-bold text-indigo-950 shadow-lg transition hover:-translate-y-1 hover:bg-cyan-100"
                >
                  Explore Students ↓
                </a>

                <button
                  onClick={fetchStudents}
                  disabled={loading}
                  className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Loading..." : "↻ Refresh Data"}
                </button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="mx-auto max-w-xs rounded-3xl border border-white/15 bg-white/5 p-7 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-200">
                    Dashboard Overview
                  </span>
                  <span className="text-2xl">📊</span>
                </div>

                <div className="my-7 flex h-28 items-end justify-center gap-3">
                  {[45, 75, 55, 95, 68, 85, 60].map((height, index) => (
                    <div
                      key={index}
                      style={{ height: `${height}%` }}
                      className="w-6 rounded-t-lg bg-gradient-to-t from-violet-500 to-cyan-300 transition hover:opacity-70"
                    />
                  ))}
                </div>

                <div className="border-t border-white/10 pt-5">
                  <p className="text-3xl font-black">
                    {loading ? "..." : students.length}
                  </p>

                  <p className="mt-1 text-sm text-indigo-200">
                    Student records retrieved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <section aria-label="Student statistics">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                At a glance
              </p>

              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Dashboard Overview
              </h2>
            </div>

            <span className="rounded-lg bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700">
              FETCH + USESTATE + USEEFFECT
            </span>
          </div>

          <StudentStats students={students} loading={loading} />
        </section>

        {/* Student Directory */}
        <section id="students" className="scroll-mt-6 pt-14">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                Your campus, connected
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Student Directory
              </h2>

              <p className="mt-3 text-slate-500">
                Explore student profiles and contact information.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <div className="relative min-w-0 sm:min-w-72">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  🔍
                </span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search students..."
                  aria-label="Search students"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <button
                onClick={fetchStudents}
                disabled={loading}
                className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-violet-700 disabled:opacity-60"
              >
                ↻ Reload
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-extrabold text-violet-700">
                {loading ? "..." : filteredStudents.length}
              </span>{" "}
              of{" "}
              <span className="font-extrabold text-slate-800">
                {loading ? "..." : students.length}
              </span>{" "}
              students
            </p>

            <span className="text-xs font-medium text-slate-400">
              DATA SOURCE: JSONPLACEHOLDER API
            </span>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="h-16 w-16 rounded-2xl bg-slate-200" />
                  <div className="mt-6 h-4 w-2/3 rounded bg-slate-200" />
                  <div className="mt-3 h-3 w-full rounded bg-slate-100" />
                  <div className="mt-6 h-16 rounded-xl bg-slate-100" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center"
            >
              <p className="text-3xl">⚠️</p>

              <h3 className="mt-3 text-xl font-bold text-rose-800">
                Unable to load students
              </h3>

              <p className="mt-2 text-sm text-rose-700">{error}</p>

              <button
                onClick={fetchStudents}
                className="mt-5 rounded-xl bg-rose-600 px-5 py-3 font-bold text-white transition hover:bg-rose-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Student Cards */}
          {!loading && !error && filteredStudents.length > 0 && (
            <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStudents.map((student, index) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredStudents.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
              <div className="text-5xl">🔎</div>

              <h3 className="mt-4 text-xl font-bold text-slate-800">
                No students found
              </h3>

              <p className="mt-2 text-slate-500">
                Try another name, email, or company.
              </p>

              <button
                onClick={() => setSearch("")}
                className="mt-5 rounded-xl bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-700"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>

        {/* Technical Summary */}
        <section className="mt-14 rounded-3xl bg-gradient-to-r from-indigo-950 via-violet-950 to-slate-900 p-7 text-white shadow-xl sm:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                Behind the interface
              </p>

              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                Learn by Building
              </h2>

              <p className="mt-3 leading-7 text-indigo-100/75">
                This practical demonstrates how a React application
                retrieves remote data, stores it in state, and renders
                dynamic records using reusable components.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ["01", "fetch()", "Retrieve API data"],
                ["02", "useEffect()", "Load on mount"],
                ["03", "map()", "Render student cards"],
                ["04", "Props", "Reuse components"],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <span className="text-xs font-bold text-cyan-300">
                    {number}
                  </span>

                  <h3 className="mt-2 font-bold">{title}</h3>

                  <p className="mt-1 text-xs leading-5 text-indigo-100/65">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-5 py-7 text-center">
        <p className="font-bold text-slate-700">
          CAMPUS<span className="text-violet-600">CONNECT</span>
        </p>

        <p className="mt-2 text-sm text-slate-500">
          React Practical 07 · Read Operation with API
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Built with React JS, Tailwind CSS & REST API
        </p>
      </footer>
    </div>
  );
}

export default App;