import { useState } from "react";
import DropdownSelection from "@/components/DropdownSelection";
import { FilterKey } from "@/graphql/types/members";
import Select from "@/components/Select";
import CustomSelect from "@/components/Select";
import { statusOptions, veriStatusOptions } from "@/enums/member-filtes";

interface Member {
    name?: string;
    emailAddress?: string | null;
    mobileNumber?: string | null;
    domain?: string | null;
}

interface FilterBarProps {
    data: Member[];
    onFilterChange: (key: FilterKey, value: string | null) => void;
}

interface FilterSets {
    name: Set<string>;
    email: Set<string>;
    mobileNumber: Set<string>;
    domain: Set<string>;
}

export const FilterBar: React.FC<FilterBarProps> = ({ data, onFilterChange }) => {
    const filterSets: FilterSets = data.reduce<FilterSets>(
        (acc, member) => {
            if (member.name) acc.name.add(member.name);
            if (member.emailAddress) acc.email.add(member.emailAddress);
            if (member.mobileNumber) acc.mobileNumber.add(member.mobileNumber);
            if (member.domain) acc.domain.add(member.domain);
            return acc;
        },
        {
            name: new Set<string>(),
            email: new Set<string>(),
            mobileNumber: new Set<string>(),
            domain: new Set<string>(),
        }
    );

    const { name, email, mobileNumber, domain } = filterSets;
    const [selectedStatus, setSelectedStatus] = useState<string>("PENDING");
    const [selectedVerStatus, setSelectedVerStatus] = useState<string>("ACTIVE");


    const [selectedFilters, setSelectedFilters] = useState<{
        name: string | null;
        email: string | null;
        mobileNumber: string | null;
        domain: string | null;
    }>({
        name: null,
        email: null,
        mobileNumber: null,
        domain: null,
    });

    const handleSelectionChange = (key: FilterKey, value: string | null) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
        onFilterChange(key, value);
    };

    const dropdowns = [
        { label: "Username", key: "name", options: Array.from(name) },
        { label: "Email Address", key: "email", options: Array.from(email) },
        { label: "Mobile Number", key: "mobileNumber", options: Array.from(mobileNumber) },
        { label: "Domain", key: "domain", options: Array.from(domain) },
    ] as const;

    return (
        <div className="flex w-full items-center gap-2 bg-[#0A171D] px-4 py-4 rounded-md">
            <span className="text-white text-base font-semibold">Filters | </span>
            <CustomSelect
                label="Verification Status"
                options={veriStatusOptions}
                value={selectedVerStatus}
                onChange={setSelectedVerStatus}
            />
            {dropdowns.map(({ label, key, options }) => (
                <DropdownSelection
                    key={key}
                    label={`${label} Dropdown`}
                    placeholder={`Search ${label}`}
                    options={options}
                    selectedOption={selectedFilters[key] || ""}
                    onSelectionChange={(value) => handleSelectionChange(key, value)}
                />
            ))}
            <CustomSelect
                label="Status"
                options={statusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
            />
        </div>
    );
};
