import Link from "next/link";
import Image from "next/image";
import CourseCard from "./components/CourseCard";
import TopicCard from "./components/TopicCard";
import { getCourses, getTopics, getCourseStats } from "../lib/data";

export default async function HomePage() {
  const topics = await getTopics();
  const catalog = await getCourses();
  const stats = getCourseStats(catalog);

  // Flagship courses (microfinance and sustainability)
  const flagshipSlugs = ["microfinance", "sustainability-and-finance"];
  const flagship = catalog.filter(c => flagshipSlugs.includes(c.slug));

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-arcs"></div>
        <div className="wrap">
          <span className="kicker">✦ 100% free — no paywalls, ever</span>
          <h1>Learn how finance <em>includes</em> people — and how it heals the <em>planet</em>.</h1>
          <p className="lede">
            Two flagship 12-module programs — <b>Microfinance</b> and <b>Sustainability &amp; Finance</b> — plus case studies, country statistics and a student research corner.
          </p>
          <form className="hero-search" action="/catalog" method="get">
            <input type="search" name="q" placeholder="What do you want to learn? Try 'microcredit' or 'green bonds'…" />
            <button type="submit">Search</button>
          </form>
          <div className="hero-stats">
            <div className="stat"><b>{stats.totalCourses}</b><span>free courses</span></div>
            <div className="stat"><b>{stats.totalLessons}</b><span>lessons & quizzes</span></div>
            <div className="stat"><b>{topics.length}</b><span>finance topics</span></div>
            <div className="stat"><b>{Math.round(stats.totalMinutes / 60)}+</b><span>hours of learning</span></div>
          </div>
        </div>
      </section>

      {/* Flagship Programs */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="overline">Flagship programs</span>
              <h2>Twelve modules each. Pass at 70% to move on.</h2>
            </div>
            <Link className="link-more" href="/catalog">Browse all courses →</Link>
          </div>
          <div className="grid cols-2">
            {flagship.map(course => {
              const topic = topics.find(t => t.id === course.topic);
              const progress = null;
              return (
                <CourseCard
                  key={course.slug}
                  course={course}
                  topic={topic}
                  progress={progress}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="overline">Explore by topic</span>
              <h2>Every corner of finance, one home</h2>
            </div>
            <Link className="link-more" href="/catalog">Full catalog →</Link>
          </div>
          <div className="grid cols-3">
            {topics.map(topic => {
              const count = catalog.filter(c => c.topic === topic.id).length;
              return <TopicCard key={topic.id} topic={topic} count={count} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}