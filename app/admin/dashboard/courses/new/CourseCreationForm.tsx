/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CourseInfoForm } from "../../../../../components/courses/create/CourseInfoForm";
import { CourseBenefitsForm } from "../../../../../components/courses/create/CourseBenefitsForm";
import { CourseContentForm } from "../../../../../components/courses/create/CourseContentForm";
import { CourseInstructorsForm } from "../../../../../components/courses/create/CourseInstructorsForm";
import { CourseSubmitPreview } from "../../../../../components/courses/create/CourseSubmitPreview";

export default function CourseCreationForm() {
    const [step, setStep] = useState(0);
    const tabSteps = ["info", "benefits", "content", "instructors", "submit"];

    const nextStep = () => {
        if (step < tabSteps.length - 1) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    // ✅ Store collected data from all tabs
    const [courseInfo, setCourseInfo] = useState<any>(null);
    const [courseBenefits, setCourseBenefits] = useState<any>(null);
    const [courseContent, setCourseContent] = useState<any>(null);
    const [courseInstructors, setCourseInstructors] = useState<any>([]);

    return (
        <Tabs value={tabSteps[step]} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="info" disabled={step < 0}>Course Info</TabsTrigger>
                <TabsTrigger value="benefits" disabled={step < 1}>Benefits</TabsTrigger>
                <TabsTrigger value="content" disabled={step < 2}>Content</TabsTrigger>
                <TabsTrigger value="instructors" disabled={step < 3}>Instructors</TabsTrigger>
                <TabsTrigger value="submit" disabled={step < 4}>Submit</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
                <CourseInfoForm
                    onNext={nextStep}
                    onChange={(data: any) => setCourseInfo(data)}
                    defaultValues={courseInfo}
                />
            </TabsContent>

            <TabsContent value="benefits">
                <CourseBenefitsForm
                    onNext={nextStep}
                    onBack={prevStep}
                    onChange={(data: any) => setCourseBenefits(data)}
                    defaultValues={courseBenefits}
                />
            </TabsContent>

            <TabsContent value="content">
                <CourseContentForm
                    onNext={nextStep}
                    onBack={prevStep}
                    onChange={(data: any) => setCourseContent(data)}
                    defaultValues={courseContent}
                />
            </TabsContent>

            <TabsContent value="instructors">
                <CourseInstructorsForm
                    onNext={nextStep}
                    onBack={prevStep}
                    onChange={(data: any) => setCourseInstructors(data)}
                    defaultValues={courseInstructors}
                />
            </TabsContent>

            <TabsContent value="submit">
                <CourseSubmitPreview
                    onBack={prevStep}
                    courseInfo={courseInfo}
                    benefits={courseBenefits}
                    content={courseContent}
                    instructors={courseInstructors}
                />
            </TabsContent>
        </Tabs>
    );
}
