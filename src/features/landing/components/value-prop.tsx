"use client";
import { ListItem } from "./list-item";
import { motion } from "framer-motion";

export default function ValueProposition() {
    return (
        <section className="bg-slate-50 px-10 py-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* Left side: Garage storage SVG */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative aspect-square bg-white rounded-3xl shadow-xl flex items-center justify-center p-12 overflow-hidden border border-slate-100"
                >
                    <img
                        src="/assets/garage.svg"
                        alt="Garage storage"
                        className="w-full h-auto opacity-80 transition-transform duration-500 hover:scale-105"
                    />
                </motion.div>

                {/* Right side: The "Solution" Text */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-col gap-8"
                >
                    <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1]">
                        Turn your idle{" "}
                        <span className="text-[#1980D5]">assets</span>{" "}
                        into income.
                    </h2>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Many individuals own vehicles, tools, or equipment used
                        infrequently. Stop letting your assets gather dust.
                        OrderEase provides a reliable platform to rent your
                        resources to those who need temporary access.
                    </p>
                    <ul className="space-y-4 text-lg text-slate-700 font-medium">
                        <ListItem text="Earn revenue from unused assets" />
                        <ListItem text="Help your local community" />
                        <ListItem text="Reduce waste through shared access" />
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
