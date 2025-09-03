"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client"; // ✅ same client as Navbar

import { useRouter } from "next/navigation";
import { Highlighter } from "@/components/magicui/highlighter";


type Question = {
    id: string;
    question: string;
    options: string[];
    answer: number;
};

interface QuizProps {
    questions: Question[];
    courseId: string;
    onComplete?: () => void;
}

const supabase = createClient(); // ✅ shared client

export default function Quiz({ questions, courseId, onComplete }: QuizProps) {
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [passed, setPassed] = useState(false);
    const router = useRouter();


    // 🎆 Confetti Fireworks
    const triggerFireworks = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) =>
            Math.random() * (max - min) + min;

        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);
    };

    const saveCompletion = async (finalScore: number, didPass: boolean, courseId: string) => {
        try {
            // 🔑 Get currently logged in user from same client
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;
            if (!user) throw new Error("User not logged in");

            const { error } = await supabase.from("course_completions").upsert(
                {
                    user_id: user.id,   // ✅ always from session
                    course_id: courseId,
                    score: finalScore,
                    passed: didPass,
                    completed_at: new Date().toISOString(),
                },
                { onConflict: "user_id,course_id" }
            );

            if (error) {
                console.error("❌ Failed to save course completion:", {
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code,
                });
            } else {
                console.log("✅ Course completion saved!");
            }
        } catch (err) {
            console.error("❌ Unexpected error saving course completion:", err);
        }
    };

    // ✅ Handle Submit
    const handleSubmit = async () => {
        let correct = 0;
        questions.forEach((q) => {
            if (answers[q.id] === q.answer) {
                correct++;
            }
        });
        setScore(correct);
        setSubmitted(true);

        const percent = Math.round((correct / questions.length) * 100);
        const didPass = percent >= 70;

        if (didPass) {
            setPassed(true);
            await saveCompletion(percent, true, courseId); // ✅ Save % score
            onComplete?.();
            // 🎉 redirect after 5s
            setTimeout(() => {
                router.push(`/courses/${courseId}/completed`);
            }, 5000);
        } else {
            await saveCompletion(percent, false, courseId); // ✅ Save % score
        }

    };

    // 🎆 Fireworks on pass
    useEffect(() => {
        if (passed) {
            triggerFireworks();
        }
    }, [passed]);

    return (
        <div className="p-6 max-w-3xl mx-auto relative">
            <h1 className="text-3xl font-extrabold mb-6 text-center">Final Quiz 📝</h1>

            {questions.map((q, idx) => (
                <div key={q.id} className="mb-6 p-4 border rounded-xl bg-white">
                    <p className="font-semibold mb-3">
                        {idx + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                        {q.options.map((opt: string, i: number) => (
                            <label
                                key={i}
                                className={`flex items-center cursor-pointer px-4 py-2 rounded-lg border 
                                    ${answers[q.id] === i ? "border-purple-500 bg-purple-50" : "border-gray-300"}
                                `}
                            >
                                <input
                                    type="radio"
                                    name={q.id}
                                    value={i}
                                    checked={answers[q.id] === i}
                                    onChange={() => setAnswers({ ...answers, [q.id]: i })}
                                    disabled={submitted}
                                    className="hidden"
                                />
                                <span className="ml-2">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            {/* Footer */}
            <div className="text-center mt-8">
                {!submitted ? (
                    <Button onClick={handleSubmit}>Submit Quiz 🚀</Button>
                ) : passed ? (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold text-green-600">
                            🎉 Congrats! You passed!
                        </h2>
                        <p className="text-gray-600 mt-2">
                            You scored {score}/{questions.length} (
                            {Math.round((score / questions.length) * 100)}%)
                        </p>
                        <p className="mt-2">✅ Course Completed Successfully!</p>
                        <p className="mt-2"> <Highlighter action="highlight" color="#ffA500" >Refresh to Download Certificate</Highlighter> </p>

                    </div>
                ) : (
                    <div className="mt-6">
                        <h2 className="text-xl font-bold text-red-600">
                            ❌ You scored {score}/{questions.length} (
                            {Math.round((score / questions.length) * 100)}%)
                        </h2>
                        <p className="text-gray-600 mt-2">
                            You need at least 70% to pass. Try again 🔄
                        </p>
                        <Button onClick={() => window.location.reload()}>
                            Retry Quiz
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
