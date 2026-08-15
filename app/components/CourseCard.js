// app/components/CourseCard.js
"use client";

import Link from "next/link";

export default function CourseCard({ course, topic, progress }) {
    const { title, slug, tagline, level, lengthMin, instructor, lessons } = course;
    const hue = topic?.hue || 160;
    const pct = progress?.pct || 0;
    const isComplete = progress?.complete || false;
    const isStarted = progress?.started || false;
    const doneCount = progress?.done || 0;

    return (
        <Link
            href={`/course/${slug}`}
            className="course-card reveal"
            style={{ "--hue": hue }}
        >
            <div className="course-cover">
                <span className="c-level">{level}</span>
                <span className="c-icon">{topic?.icon || "📚"}</span>
            </div>
            {doneCount > 0 && (
                <div className="course-progress-strip">
                    <i style={{ width: `${pct}%` }}></i>
                </div>
            )}
            <div className="course-body">
                <span className="course-topic">{topic?.name || course.topic}</span>
                <h3>{title}</h3>
                <p className="tagline">{tagline}</p>
                <div className="course-meta">
                    <span className="instr">
                        <span className="avatar">
                            {instructor?.name?.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase() || "?"}
                        </span>
                        {instructor?.name || "Instructor"}
                    </span>
                    <span>⏱ {formatDuration(lengthMin)}</span>
                    <span>▦ {lessons || 0} lessons</span>
                </div>
            </div>
        </Link>
    );
}

function formatDuration(min) {
    if (!min || min <= 0) return "—";
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) return `${h}h ${m}m`;
    if (h) return `${h}h`;
    return `${m} min`;
}