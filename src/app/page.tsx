"use client";

import { Navbar } from "@/components/Navbar";
import { PageLoader } from "@/components/PageLoader";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Credentials } from "@/components/Credentials";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { LikeButton } from "@/components/LikeButton";
import { PortfolioProvider } from "@/components/PortfolioProvider";

export default function Home() {
  return (
    <PortfolioProvider>
      <main className="relative overflow-x-hidden">
        <PageLoader />
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-60" />
          <div className="absolute inset-0 noise opacity-[0.03] mix-blend-multiply" />
        </div>
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Credentials />
        <Contact />
        <Footer />
        <Chatbot />
        <LikeButton />
      </main>
    </PortfolioProvider>
  );
}
