import { gql } from "@apollo/client";

export const GetMembers = gql`
query ($first: Int, $after: Cursor, $filter: MemberFilterInput) {
  members(first: $first, after: $after, filter: $filter) {
    edges {
      node {
        id
        ... on Member {
          name
          verificationStatus
          emailAddress
          mobileNumber
          domain
          dateTimeCreated
          dateTimeLastUpdated
          dateTimeLastActive
          status
          depositsCount
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export const GetMembersByName = gql`
query ($search: String!) {
  membersByName(search: $search, first: 20) {
    id
   ... on Member {
          name
          verificationStatus
          emailAddress
          mobileNumber
          domain
          dateTimeCreated
          dateTimeLastUpdated
          dateTimeLastActive
          status
          depositsCount
        }

  }
}
`;


export const GetMembersByEmail = gql`
query ($search: String!) {
  membersByEmailAddress(search: $search, first: 20) {
    id
        ... on Member {
          name
          verificationStatus
          emailAddress
          mobileNumber
          domain
          dateTimeCreated
          dateTimeLastUpdated
          dateTimeLastActive
          status
          depositsCount
        }
  }
}
`;

export const GetMembersByMobileNumber = gql`
query ($search: String!) {
  membersByMobileNumber(search: $search, first: 20) {
    id
    ... on Member {
          name
          verificationStatus
          emailAddress
          mobileNumber
          domain
          dateTimeCreated
          dateTimeLastUpdated
          dateTimeLastActive
          status
          depositsCount
        }
  }
}
`;



export const GetMembersByDomain = gql`
query ($search: String!) {
  membersByDomain(search: $search, first: 20) {
    id
        ... on Member {
          name
          verificationStatus
          emailAddress
          mobileNumber
          domain
          dateTimeCreated
          dateTimeLastUpdated
          dateTimeLastActive
          status
          depositsCount
        }
  }
}
`;

