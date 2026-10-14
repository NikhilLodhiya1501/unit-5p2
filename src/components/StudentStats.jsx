function StudentStats({ students, loading }) {
  const uniqueCourses = new Set(
    students.map((_, index) => index % 6)
  ).size;

  const stats = [
    {
      label: "Total Students",
      value: loading ? "..." : students.length,
      icon: "👨‍🎓",
      color: "from-violet-500 to-indigo-600",
    },
    {
      label: "Available Courses",
      value: loading ? "..." : uniqueCourses,
      icon: "📚",
      color: "from-cyan-500 to-blue-600",
    },
    {
      label: "API Status",
      value: loading ? "Loading" : "Connected",
      icon: "🌐",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"
        >
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-2xl shadow-md`}
          >
            {stat.icon}
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              {stat.label}
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-800">
              {stat.value}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentStats;