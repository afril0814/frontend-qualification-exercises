import dayjs from "dayjs";
import { ReactNode } from "react";
import StatusBadge from "@/components/StatusBadge";
import VerificationBadge from "@/components/VerificationBadge";

export type MemberColumnType = {
    title: string;
    dataIndex?: string;
    render?: (value?: any, record?: any, index?: number) => ReactNode;
};

export const memberColumns = (): MemberColumnType[] => [
    {
        title: "Name",
        dataIndex: "name",
        render: (value: any) => {
            return <span className="text-primary">{value}</span>;
        }
    },
    {
        title: "Verification Status",
        dataIndex: "verificationStatus",
        render: (value: any) => {
            return <VerificationBadge status={value.toLowerCase() as "verified" | "pending" | "unverified"} />;
        }
    },
    {
        title: "Balance",
        dataIndex: "depositsCount",
        render: (value: any) => {
            return <span>{value}</span>;
        }
    },
    {
        title: "Email address",
        dataIndex: "emailAddress",
    },
    {
        title: "Mobile number",
        dataIndex: "mobileNumber",
    },
    {
        title: "Domain",
        dataIndex: "domain",
    },
    {
        title: "Date Resigned",
        dataIndex: "dateTimeLastUpdated",
        render: (value) => dayjs(value).format("YYYY MMM DD"),
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (value: any) => {
            return <StatusBadge status={value.toLowerCase() as"active" | "blacklisted" | "disabled" | "suspended" | "deleted"} />;
        }
    },
    {
        title: "Date and Time Last Active",
        dataIndex: "dateTimeLastActive",
        render: (value) => dayjs(value).format("YYYY MMM DD hh:mm A")
    },


];
