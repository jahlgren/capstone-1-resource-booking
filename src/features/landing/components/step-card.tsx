import { StepCardProps } from "../types/landing";

export const StepCard = (
    { icon: Icon, step, title, description }: StepCardProps,
) => (
    <div className="group relative p-8 bg-slate-50 rounded-3xl border border-transparent hover:border-[#1980D5]/20 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl">
        <div className="mb-6 flex items-center justify-between">
            <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:bg-[#1980D5] transition-colors duration-300">
                <Icon className="size-8 text-[#63BE57] group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="text-5xl font-black text-slate-200 group-hover:text-[#1980D5]/10 transition-colors">
                {step}
            </span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
);
