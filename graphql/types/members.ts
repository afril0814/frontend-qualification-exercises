export type Member = {
    id: string;
    name: string;
    verificationStatus: string;
    emailAddress: string | null;
    mobileNumber: string;
    domain: string | null;
    dateTimeCreated: string;
    dateTimeLastActive: string;
    status: string;
};

export type Edge = {
    node: Member;
};

export type GraphQLResponse = Edge[];

export type FilterKey = "email" | "name" | "mobileNumber" | "domain";


