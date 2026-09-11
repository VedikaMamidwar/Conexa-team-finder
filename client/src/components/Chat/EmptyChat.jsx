import React from "react";
import { MessageCircle } from "lucide-react";

export default function EmptyChat() {
    return (
        <div className="flex h-full flex-col items-center justify-center bg-slate-50 p-6 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1E1B4B]/10">
                <MessageCircle
                    size={40}
                    className="text-[#1E1B4B]"
                />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#1E1B4B]">
                Welcome to CONEXA Chat
            </h2>

            <p className="mt-2 max-w-sm text-sm text-slate-500">
                Select a conversation to start chatting with your teammates.
            </p>

        </div>
    );
}