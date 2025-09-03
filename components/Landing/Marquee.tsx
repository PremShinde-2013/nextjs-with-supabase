import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { Highlighter } from "../magicui/highlighter";

const reviews = [
    {
        name: "Aarav Mehta",
        username: "Google",
        body: "Skillveta helped me transition from theory to real-world problem solving. This is the future of learning.",
        img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
        name: "Riya Sharma",
        username: "Microsoft",
        body: "The projects here are exactly what top companies want. I landed my first internship because of this.",
        img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
        name: "Kabir Nair",
        username: "Infosys",
        body: "Finally, a platform that feels built for ambitious students in India. Practical, structured, and premium.",
        img: "https://upload.wikimedia.org/wikipedia/commons/6/60/Infosys_logo.svg",
    },
    {
        name: "Ishita Patel",
        username: "Amazon",
        body: "This isn’t just learning, it’s career acceleration. The Skillveta experience feels world-class.",
        img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
        name: "Devansh Kapoor",
        username: "TCS",
        body: "The blend of projects, mentorship, and community is unbeatable. Skillveta redefines internships.",
        img: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Tata_Consultancy_Services_Logo.svg",
    },
    {
        name: "Meera Iyer",
        username: "Startup Founder",
        body: "If you’re serious about building a career or startup, this is where you should be. Pure value.",
        img: "https://avatar.vercel.sh/founder",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-72 cursor-pointer overflow-hidden rounded-2xl border p-5 shadow-md transition-all hover:scale-105",
                // light styles
                "border-gray-950/[.08] bg-gradient-to-br from-gray-50 via-white to-gray-100",
                // dark styles
                "dark:border-gray-50/[.08] dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-950 dark:to-black"
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <img className="rounded-full bg-white p-1" width="36" height="36" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-semibold dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium text-muted-foreground">{username}</p>
                </div>
            </div>
            <blockquote className="mt-3 text-sm italic leading-relaxed text-muted-foreground">
                “{body}”
            </blockquote>
        </figure>
    );
};

export function MarqueeDemo() {
    return (
        <section className="relative w-full py-16 ">
            {/* Title */}
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Trusted by <Highlighter action="highlight" color="#FF9800" >Students & Professionals</Highlighter>
                </h2>
                <p className="mt-2 text-lg text-muted-foreground">
                    From IITs to startups to global giants — Skillveta is where careers are built.
                </p>
            </div>

            {/* Marquee */}
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden ">
                <Marquee pauseOnHover className="[--duration:25s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:25s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>

                {/* Gradient edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background via-background/80 to-transparent"></div>
            </div>
        </section>
    );
}
