import Hero from "@/components/home/Hero";
import Branches from "@/components/home/Branches";
import About from "@/components/home/About";
import Goal from "@/components/home/Goal";

export default function Home() {
    return (
        <main className="bg-black min-h-screen">
            <section id="hero">
                <Hero />
            </section>
            <section id="branches">
                <Branches />
            </section>
            <section id="about">
                <About />
            </section>
            <section id="goal">
                <Goal />
            </section>
        </main>
    );
}
