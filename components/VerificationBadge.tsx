interface VerificationBadgeProps {
    status: "verified" | "pending" | "unverified";
}

export default function VerificationBadge({ status }: VerificationBadgeProps) {
    const statusStyles = {
        verified: {
            border: "border-[#008005]",
            text: "text-[#027A48]",
            dot: "bg-[#12B76A]",
            label: "Verified",
        },
        unverified: {
            border: "border-[#800C05]",
            text: "text-[#C01048]",
            dot: "bg-[#F63D68]",
            label: "Unverified",
        },
        pending: {
            border: "border-[#B93815]",
            text: "text-[#B93815]",
            dot: "bg-[#EF6820]",
            label: "Pending",
        },
    };

    const { border, text, dot, label } = statusStyles[status];

    return (
        <div className={`inline-flex items-center px-3 py-1 border ${border} ${text} rounded-full`}>
            <span className={`w-2 h-2 ${dot} rounded-full mr-2`}></span>
            <span className="text-xs font-medium">{label}</span>
        </div>
    );
}
