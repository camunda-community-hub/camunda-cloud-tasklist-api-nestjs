import { useQuery } from "react-query";
import { gql } from "graphql-request";
import { graphqlClient } from "./graphqlClient";
import { useLocation } from "react-router-dom";
import { PAGINATION_PARAMS, REQUESTS_PER_PAGE } from "./constants";

function useLoanRequests() {
  const location = useLocation();
  const variables = Object.fromEntries([
    ["status", "open"],
    ...Array.from(new URLSearchParams(location.search)).map(([key, value]) => {
      if (
        [
          PAGINATION_PARAMS.searchBefore,
          PAGINATION_PARAMS.searchAfter,
        ].includes(key)
      ) {
        return [key, value.split(",")];
      }

      return [key, value];
    }),
  ]);
  return useQuery(
    ["loanRequests", JSON.stringify(variables)],
    async () => {
      const { loanRequests } = await graphqlClient.request(
        gql`
          query getLoanRequests(
            $pageSize: Int
            $searchAfter: [String!]
            $searchBefore: [String!]
            $status: String
          ) {
            loanRequests(
              pageSize: $pageSize
              searchAfter: $searchAfter
              searchBefore: $searchBefore
              status: $status
            ) {
              id
              type
              borrower
              amount
              assets
              debt
              creditScore
              requestDate
              decisionDate
              approved
              status
              isFirst
              sortValues
            }
          }
        `,
        { ...variables, pageSize: REQUESTS_PER_PAGE }
      );

      return loanRequests;
    },
    { keepPreviousData: true }
  );
}

export { useLoanRequests };
