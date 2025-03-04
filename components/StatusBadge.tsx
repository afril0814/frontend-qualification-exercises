import { CheckCircle, CircleAlert, Ban, PauseCircle, Trash2 } from "lucide-react";

interface StatusBadgeProps {
  status: "active" | "blacklisted" | "disabled" | "suspended" | "deleted";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles = {
    active: {
      text: "Active",
      bg: "bg-[##053321]",
      border: "border-[#085D3A]",
      textColor: "text-[#75E0A7]",
      icon: <CheckCircle className="w-4 h-4 text-[#17B26A]" />,
    },
    blacklisted: {
      text: "Blacklisted",
      bg: "bg-[#55160C]",
      border: "border-[#912018]",
      textColor: "text-[#FDA29B]",
      icon: <CircleAlert className="w-4 h-4 text-[#F04438]" />,
    },
    disabled: {
      text: "Disabled",
      bg: "bg-[#161B26]",
      border: "border-[#333741]",
      textColor: "text-[#CECFD2]",
      icon: <Ban className="w-4 h-4 text-[#85888E]" />,
    },
    suspended: {
      text: "Suspended",
      bg: "bg-[#F5C16F]",
      border: "border-[#946200]",
      textColor: "text-[#5D3A00]",
      icon: <PauseCircle className="w-4 h-4 text-[#946200]" />,
    },
    deleted: {
      text: "Deleted",
      bg: "bg-[#4A0D0D]",
      border: "border-[#A10E0E]",
      textColor: "text-[#FECACA]",
      icon: <Trash2 className="w-4 h-4 text-[#FECACA]" />,
    },
  };

  const { text, bg, border, textColor, icon } = statusStyles[status];

  return (
    <div className={`inline-flex items-center px-3 py-1 border ${border} ${bg} ${textColor} rounded-full`}>
      <span className="mr-2">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
