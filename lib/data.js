// lib/data.js
import courses from "../data/courses.json";
import topics from "../data/topics.json";
import caseStudies from "../data/caseStudies.json";

export async function getCourses() {
    return courses;
}

export async function getTopics() {
    return topics;
}

export async function getCourseBySlug(slug) {
    return courses.find(c => c.slug === slug) || null;
}

export async function getTopicById(id) {
    return topics.find(t => t.id === id) || null;
}

export function getCourseStats(catalog) {
    const totalCourses = catalog.length;
    const totalLessons = catalog.reduce((sum, c) => sum + (c.lessons || 0), 0);
    const totalMinutes = catalog.reduce((sum, c) => sum + (c.lengthMin || 0), 0);
    return { totalCourses, totalLessons, totalMinutes };
}

export async function getCaseStudies() {
    return caseStudies;
}