// ✅ SEO Meta Tags for Catalog Page
export const metadata = {
    title: "Course Catalog Free Finance Courses | Finance Platform Demo",
    description: "Browse our free course catalog. Learn microfinance, sustainable finance, investing, banking, fintech and more. All courses are 100% free with certificates.",
    keywords: "finance courses, microfinance course, sustainable finance, free finance education, investing course, fintech course",
    openGraph: {
        title: "Course Catalog Free Finance Courses",
        description: "Browse 100+ free finance courses. Learn at your own pace and earn certificates.",
        url: "https://your-domain.com/catalog",
    },
    twitter: {
        title: "Course Catalog Free Finance Courses",
        description: "Browse our free finance course catalog. Start learning today!",
    },
};

import CatalogComp from "../components/catalogComp/CatalogComp";

// Main Page Component (Server Component)
export default async function CatalogPage({ searchParams }) {
    const [courses, topics] = await Promise.all([
        getCourses(),
        getTopics()
    ]);

    const initialFilters = {
        q: searchParams?.q || "",
        topic: searchParams?.topic || "",
    };

    return (
        <section className="section tight" style={{ paddingTop: "48px" }}>
            <div className="wrap">
                <span className="overline">Course catalog</span>
                <h1 className="section-title">Find your next course</h1>
                <p className="text-muted">Every course is completely free — search, filter, and start in one click.</p>

                <Suspense fallback={<div className="text-muted">Loading filters...</div>}>
                    <CatalogComp topics={topics} initialFilters={initialFilters} />
                </Suspense>
            </div>
        </section>
    );
}