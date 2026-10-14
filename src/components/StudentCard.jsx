const colors = [
  "from-violet-500 to-indigo-600",
  "from-cyan-500 to-blue-600",
  "from-pink-500 to-rose-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-fuchsia-500 to-purple-600",
];

function StudentCard({ student, index }) {
  const initials = student.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const courses = [
    "Computer Science",
    "Information Technology",
    "Web Development",
    "Data Science",
    "Artificial Intelligence",
    "Software Engineering",
  ];

  const course = courses[index % courses.length];

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-xl">
      <div className="h-2 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400" />

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${
              colors[index % colors.length]
            } text-xl font-bold text-white shadow-lg`}
          >
            {initials}
          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            ● Active
          </span>
        </div>

        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
            Student ID · {String(student.id).padStart(3, "0")}
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-800 transition group-hover:text-violet-700">
            {student.name}
          </h3>

          <p className="mt-2 break-all text-sm text-slate-500">
            ✉ {student.email}
          </p>
        </div>

        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Enrolled Course
          </p>

          <p className="mt-1 font-semibold text-slate-700">
            {course}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
          <span className="text-violet-600">●</span>
          <span className="truncate">{student.company.name}</span>
        </div>
      </div>
    </article>
  );
}

export default StudentCard;