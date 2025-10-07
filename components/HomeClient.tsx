"use client";
import { motion } from "framer-motion";
import Link from "next/link";
// import { Dithering } from "@paper-design/shaders-react";
import { GrainGradient } from "@paper-design/shaders-react";
import { useAuth } from "@/app/providers/AuthProvider";

export default function HomeClient() {
  const session = useAuth();
  return (
    <main className="flex-center flex-col text-foreground/90 h-full">
      <GrainGradient
        colors={["#7300ff", "#eba8ff", "#00bfff", "#2b00ff"]}
        colorBack="#000000"
        softness={0.5}
        intensity={0.5}
        noise={0.25}
        shape="corners"
        speed={1}
        className="absolute inset-0 flex items-center justify-center w-full h-full rounded-xl"
      />
      <section className="flex-center flex-col relative z-10 bg-transparent px-12 py-8 rounded-xl">
        <motion.h1
          className="text-5xl font-bold font-outfit mb-4 text-white text-center"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Citadel
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-medium font-outfit mb-6 text-white text-center"
        >
          <span className="underline underline-offset-4 decoration-wavy">
            The
          </span>{" "}
          Password Manager
        </motion.p>
        <div>
          {!session.session ? (
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-4"
            >
              <Link
                href="/sign-up"
                className="text-lg font-semibold text-white hover:text-white backdrop-blur-xs font-outfit rounded-xl p-3 px-5 text-center transition-all duration-500 hover:bg-foreground/5 border-2 border-white/40 hover:scale-105 active:scale-100"
              >
                Sign Up
              </Link>
              <Link
                href="/sign-in"
                className="text-lg font-semibold text-white hover:text-white backdrop-blur-xs font-outfit rounded-xl p-3 px-5 text-center transition-all duration-500 hover:bg-foreground/5 border-2 border-white/50 hover:scale-105 active:scale-100"
              >
                Sign In
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex"
            >
              <Link
                href="/dashboard"
                className="text-lg font-semibold text-white font-outfit rounded-xl p-3 backdrop-blur-xs px-5 text-center transition-all duration-500 hover:bg-foreground/5 hover:text-white border-2 border-white/50 hover:scale-105"
              >
                Dashboard
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* <div>
        <Dithering
          width={1280}
          height={520}
          colorBack="#00000000"
          colorFront="#00b3ff"
          shape="sphere"
          type="4x4"
          size={2}
          speed={1}
          scale={0.6}
        />
      </div> */}
    </main>
  );
}
