import { useState, useEffect } from "react";
import Table from "@/components/Table";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  GetMembers,
  GetMembersByName,
  GetMembersByEmail,
  GetMembersByMobileNumber,
  GetMembersByDomain,
} from "../graphql/queries/members";
import { memberColumns } from "./constants";
import { Edge, FilterKey, Member } from "../graphql/types/members";


export default function Members() {
  const [pageSize, setPageSize] = useState(10);
  const [cursor, setCursor] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState<{ key: FilterKey | null; value: string | null }>({
    key: null,
    value: null,
  });

  

  const { data, fetchMore, refetch } = useQuery(GetMembers, {
    variables: { first: pageSize, after: cursor, filter: {} },
    skip: activeFilter.key !== null, 
  });

  const [getMembersByName, { data: dataByName }] = useLazyQuery(GetMembersByName);
  const [getMembersByEmail, { data: dataByEmail }] = useLazyQuery(GetMembersByEmail);
  const [getMembersByMobileNumber, { data: dataByMobile }] = useLazyQuery(GetMembersByMobileNumber);
  const [getMembersByDomain, { data: dataByDomain }] = useLazyQuery(GetMembersByDomain);

  useEffect(() => {
    if (activeFilter.key && activeFilter.value) {
      setCursor(null); 
      switch (activeFilter.key) {
        case "name":
          getMembersByName({ variables: { search: activeFilter.value } });
          break;
        case "email":
          getMembersByEmail({ variables: { search: activeFilter.value } });
          break;
        case "mobileNumber":
          getMembersByMobileNumber({ variables: { search: activeFilter.value } });
          break;
        case "domain":
          getMembersByDomain({ variables: { search: activeFilter.value } });
          break;
        default:
          break;
      }
    }
  }, [activeFilter, getMembersByName, getMembersByEmail, getMembersByMobileNumber, getMembersByDomain]);

  let membersData: any = null;
  if (activeFilter.key && activeFilter.value) {
    switch (activeFilter.key) {
      case "name":
        membersData = dataByName?.membersByName;
        break;
      case "email":
        membersData = dataByEmail?.membersByEmailAddress;
        break;
      case "mobileNumber":
        membersData = dataByMobile?.membersByMobileNumber;
        break;
      case "domain":
        membersData = dataByDomain?.membersByDomain;
        break;
      default:
        membersData = null;
    }
  } else {
    membersData = data?.members;
  }

  const transformedData: Member[] =
    activeFilter.key && activeFilter.value
      ? (membersData || [])
      : (membersData?.edges || []).map((edge: Edge) => edge.node);

  const pageInfo =
    activeFilter.key && activeFilter.value
      ? { hasNextPage: false, endCursor: null }
      : membersData?.pageInfo || { hasNextPage: false, endCursor: null };

  const handlePageChange = (newCursor: string | null) => {
    setCursor(newCursor);
    if (!activeFilter.key) {
      fetchMore({ variables: { first: pageSize, after: newCursor, filter: {} } });
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCursor(null);
    if (!activeFilter.key) {
      fetchMore({ variables: { first: size, after: null, filter: {} } });
    }
  };

  const handleFilterChange = (key: FilterKey, value: string | null) => {
    if (!value) {
      setActiveFilter({ key: null, value: null });
      refetch({ first: pageSize, after: null, filter: {} });
    } else {
      setActiveFilter({ key, value });
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-[32px] font-medium">Members</div>
      <div className="text-text-2xl font-normal">View your members here.</div>
      <div className="w-full">
        <Table
          columns={memberColumns()}
          data={transformedData}
          pageInfo={pageInfo}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
}
