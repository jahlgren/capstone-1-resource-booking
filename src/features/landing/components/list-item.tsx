import { CheckCircle2 } from "lucide-react";

export const ListItem = ({ text }: { text: string }) => (
    <li className="flex items-center gap-4 text-lg font-semibold text-slate-800">
        <div className="bg-[#63BE57]/10 p-1 rounded-full">
            <CheckCircle2 className="text-[#63BE57] size-6" />
        </div>
        {text}
    </li>
);
