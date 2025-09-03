"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { createClient } from "@/lib/supabase/client";

export default function FinalExam({
    questions,
    userId,
    internshipId,
}: {
    questions: any[];
    userId: string | null;
    internshipId: string;
}) {
    const supabase = createClient();
    const router = useRouter();

    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [passed, setPassed] = useState(false);

    const totalMarks = questions.reduce((acc, q) => acc + (q.marks ?? 1), 0);

    // 🎆 Confetti on pass
    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;

        const interval = window.setInterval(() => {
            if (Date.now() > animationEnd) return clearInterval(interval);

            confetti({
                particleCount: 50,
                spread: 70,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
            });
        }, 250);
    };

    const handleSubmit = async () => {
        if (!userId) return;

        let obtained = 0;
        questions.forEach((q) => {
            if (answers[q.id] === q.correct_answer) {
                obtained += q.marks || 1;
            }
        });

        const percentage = Math.round((obtained / totalMarks) * 100);
        const didPass = percentage >= 70;

        setScore(percentage);
        setPassed(didPass);
        setSubmitted(true);

        if (didPass) {
            triggerConfetti();

            // ✅ Save attempt only if passed
            const { error } = await supabase.from("internship_final_quiz_attempts").insert({
                user_id: userId,
                internship_id: internshipId,
                total_score: totalMarks,
                obtained_score: obtained,
                is_passed: true,
            });

            if (error) {
                console.error("❌ Failed to save attempt:", error);
            }

            // Redirect to project submission phase after short delay
            setTimeout(() => {
                router.push(`/internships/${internshipId}/project`);
            }, 4000);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Final Exam 📝</h2>
            <p className="text-sm text-gray-600 mb-6">
                You must score <strong>70% or higher</strong> to unlock the project phase.
            </p>

            {questions.map((q, idx) => (
                <div key={q.id} className="mb-6 p-4 border rounded-lg bg-white shadow">
                    <p className="font-semibold mb-2">
                        {idx + 1}. {q.question}
                    </p>

                    <div className="space-y-2">
                        {q.options.map((opt: string, i: number) => (
                            <label
                                key={i}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border 
                                ${answers[q.id] === opt ? "border-purple-500 bg-purple-50" : "border-gray-300"}
                                ${submitted ? "cursor-not-allowed" : ""}
                                `}
                            >
                                <input
                                    type="radio"
                                    name={q.id}
                                    value={opt}
                                    checked={answers[q.id] === opt}
                                    onChange={() =>
                                        setAnswers((prev) => ({ ...prev, [q.id]: opt }))
                                    }
                                    disabled={submitted}
                                    className="hidden"
                                />
                                <span>{opt}</span>
                            </label>
                        ))}
                    </div>

                    {/* Show explanation only after submit */}
                    {submitted && answers[q.id] !== q.correct_answer && q.explanation && (
                        <p className="text-sm text-red-600 mt-2">
                            ❌ Wrong! Hint: {q.explanation}
                        </p>
                    )}
                    {submitted && answers[q.id] === q.correct_answer && (
                        <p className="text-sm text-green-600 mt-2">✅ Correct!</p>
                    )}
                </div>
            ))}

            {!submitted ? (
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Final Exam
                </button>
            ) : passed ? (
                <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-green-600">
                        🎉 Congrats! You passed!
                    </h3>
                    <p className="mt-2">You scored {score}%</p>
                    <p className="text-gray-600 mt-1">
                        Redirecting to project submission...
                    </p>
                </div>
            ) : (
                <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-red-600">
                        ❌ You failed ({score}%)
                    </h3>
                    <p className="text-gray-600 mt-2">
                        You need at least 70% to pass. Please try again.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        Retry Quiz
                    </button>
                </div>
            )}
        </div>
    );
}
