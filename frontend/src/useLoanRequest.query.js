import { useQuery } from "react-query";
import { gql } from "graphql-request";
import { graphqlClient } from "./graphqlClient";

function useLoanRequest(id) {
  return useQuery(["loanRequest", id], async () => {
    const { loanRequest } = await graphqlClient.request(
      gql`
        query getLoanRequest($id: ID!) {
          loanRequest(id: $id) {
            id
            creditScore
          }
        }
      `,
      { id }
    );

    return loanRequest;
  });
}

export { useLoanRequest };
