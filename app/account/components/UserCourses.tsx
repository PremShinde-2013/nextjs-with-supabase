"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CourseRow = {
    id: string;
    name: string;
    description: string | null;
    categories: string | null;
    price: number;
    estimated_price: number | null;
    level: string | null;
    ratings: number;
    purchased: number;
    duration: string | null;
    language: string | null;
    certification: boolean | null;
    course_completions: {
        passed: boolean;
        completed_at: string;
    }[];
};

type InternshipRow = {
    id: string;
    title: string;
    level: string | null;
    duration: string | null;
    progress: number | null;
    status: string | null;
    joined_at: string | null;
    completed_at: string | null;
};

export default function UserLearningTable() {
    const supabase = createClient();
    const [courses, setCourses] = useState<CourseRow[]>([]);
    const [internships, setInternships] = useState<InternshipRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserLearning = async () => {
            setLoading(true);

            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) return;

            // --------------------------
            // Courses
            // --------------------------
            const { data: userCourses } = await supabase
                .from("users")
                .select("enrolled_courses")
                .eq("id", user.id)
                .single();

            if (userCourses?.enrolled_courses?.length) {
                const { data: courseData } = await supabase
                    .from("courses")
                    .select(
                        `
                    id, name, description, categories, price, estimated_price,
                    level, ratings, purchased, duration, language, certification,
                    course_completions(passed, completed_at)
                `
                    )
                    .in("id", userCourses.enrolled_courses);

                if (courseData) setCourses(courseData as CourseRow[]);
            }

            // --------------------------
            // Internships
            // --------------------------
            const { data: userInternships } = await supabase
                .from("user_internships")
                .select(`
                    id, progress, status, joined_at, completed_at,
                    internships(id, title, level, duration)
                `)
                .eq("user_id", user.id)
                .order("joined_at", { ascending: false });

            if (userInternships) {
                const formattedInternships = userInternships.map((u: any) => ({
                    id: u.internships.id,
                    title: u.internships.title,
                    level: u.internships.level,
                    duration: u.internships.duration,
                    progress: u.progress,
                    status: u.status,
                    joined_at: u.joined_at,
                    completed_at: u.completed_at,
                }));
                setInternships(formattedInternships);
            }

            setLoading(false);
        };

        fetchUserLearning();
    }, []);

    const formatDuration = (duration: string | null) => {
        if (!duration) return "-";
        const parts = duration.split(":");
        if (parts.length >= 2) {
            const hours = parseInt(parts[0], 10);
            const minutes = parseInt(parts[1], 10);
            let result = "";
            if (hours) result += `${hours}h `;
            if (minutes) result += `${minutes}m`;
            return result.trim() || "-";
        }
        return duration;
    };

    return (
        <div className="p-8 space-y-12">
            {/* ------------------ Courses Table ------------------ */}
            <div>
                <h1 className="text-2xl font-bold mb-6 text-indigo-700">
                    📘 My Enrolled Courses
                </h1>
                {loading ? (
                    <p>Loading...</p>
                ) : courses.length === 0 ? (
                    <p>No enrolled courses found.</p>
                ) : (
                    <Table>
                        <TableCaption>Your enrolled courses with progress & certificate status.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Language</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Ratings</TableHead>
                                <TableHead>Certificate</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.map((course) => {
                                const completed = course.course_completions?.[0];
                                return (
                                    <TableRow key={course.id}>
                                        <TableCell className="font-medium">{course.name}</TableCell>
                                        <TableCell>{course.categories || "-"}</TableCell>
                                        <TableCell>{course.level || "All Levels"}</TableCell>
                                        <TableCell>{course.language}</TableCell>
                                        <TableCell>{formatDuration(course.duration)}</TableCell>
                                        <TableCell>⭐ {course.ratings?.toFixed(1) || 0}</TableCell>
                                        <TableCell>
                                            {completed?.passed ? (
                                                <Badge className="bg-green-500 text-white">Completed</Badge>
                                            ) : course.certification ? (
                                                <Badge variant="outline" className="text-yellow-600 border-yellow-400">
                                                    In Progress
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">No Certificate</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button asChild size="sm">
                                                <Link href={`/courses/${course.id}`}>View</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>

            {/* ------------------ Internships Table ------------------ */}
            <div>
                <h1 className="text-2xl font-bold mb-6 text-indigo-700">
                    💼 My Enrolled Internships
                </h1>
                {loading ? (
                    <p>Loading...</p>
                ) : internships.length === 0 ? (
                    <p>No enrolled internships found.</p>
                ) : (
                    <Table>
                        <TableCaption>Your internships with progress & status.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Internship</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Progress</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {internships.map((internship) => (
                                <TableRow key={internship.id}>
                                    <TableCell className="font-medium">{internship.title}</TableCell>
                                    <TableCell>{internship.level || "All Levels"}</TableCell>
                                    <TableCell>{formatDuration(internship.duration)}</TableCell>
                                    <TableCell>{internship.progress?.toFixed(0) || 0}%</TableCell>
                                    <TableCell>
                                        {internship.status === "completed" ? (
                                            <Badge className="bg-green-500 text-white">Completed</Badge>
                                        ) : internship.status === "in_progress" ? (
                                            <Badge variant="outline" className="text-yellow-600 border-yellow-400">
                                                In Progress
                                            </Badge>
                                        ) : internship.status === "enrolled" ? (
                                            <Badge variant="outline" className="text-blue-600 border-blue-400">
                                                Enrolled
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline">{internship.status}</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild size="sm">
                                            <Link href={`/internships/${internship.id}`}>View</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
