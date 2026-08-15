// app/api/content/[...key]/route.js

import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

const STATIC_PATHS = {
    topics: "topics.json",
    courses: "courses.json",
    esg: "esg-data.json",
};

function getStaticPath(key) {
    if (STATIC_PATHS[key]) {
        return STATIC_PATHS[key];
    }

    if (key.startsWith("course:")) {
        const slug = key
            .slice(7)
            .replace(/[^a-z0-9-]/gi, "")
            .toLowerCase();

        if (!slug) {
            return null;
        }

        return path.join("courses", `${slug}.json`);
    }

    return null;
}

export async function GET(request, { params }) {
    try {
        const key = decodeURIComponent(params.key.join("/"));

        const relativePath = getStaticPath(key);

        if (!relativePath) {
            return Response.json(
                { error: "unknown key" },
                { status: 404 }
            );
        }

        const filePath = path.join(DATA_DIR, relativePath);

        try {
            const content = await fs.readFile(filePath, "utf-8");

            return new Response(content, {
                headers: {
                    "content-type": "application/json",
                    "cache-control": "no-store",
                },
            });
        } catch (err) {
            console.error("Content file not found:", filePath, err);

            return Response.json(
                { error: "file not found" },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("Content API error:", error);

        return Response.json(
            { error: "server error" },
            { status: 500 }
        );
    }
}