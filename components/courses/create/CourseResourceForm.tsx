"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CourseResourcesForm({
    defaultValues,
    onNext,
    onBack,
    onChange,
}: any) {
    const [ebook, setEbook] = useState<File | null>(defaultValues?.ebook || null);
    const [projectZip, setProjectZip] = useState<File | null>(defaultValues?.projectZip || null);

    // 🔑 Whenever a file is selected, update local state AND bubble up via onChange
    const handleFileChange = (type: "ebook" | "projectZip", file: File | null) => {
        if (type === "ebook") {
            setEbook(file);
            onChange?.({ ebook: file, projectZip });
        } else {
            setProjectZip(file);
            onChange?.({ ebook, projectZip: file });
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold">Upload Extra Resources</h2>

            <div className="space-y-2">
                <Label htmlFor="ebook">Ebook (PDF/EPUB)</Label>
                <Input
                    id="ebook"
                    type="file"
                    accept=".pdf,.epub"
                    onChange={(e) => handleFileChange("ebook", e.target.files?.[0] || null)}
                />
                {ebook && (
                    <p className="text-sm text-muted-foreground">
                        Selected: {ebook.name}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="project">Project ZIP</Label>
                <Input
                    id="project"
                    type="file"
                    accept=".zip"
                    onChange={(e) =>
                        handleFileChange("projectZip", e.target.files?.[0] || null)
                    }
                />
                {projectZip && (
                    <p className="text-sm text-muted-foreground">
                        Selected: {projectZip.name}
                    </p>
                )}
            </div>

            <div className="flex gap-2">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onNext}>Save & Continue</Button>
            </div>
        </div>
    );
}
