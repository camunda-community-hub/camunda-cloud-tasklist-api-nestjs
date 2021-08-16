import { useMutation } from "react-query";
import { gql } from "graphql-request";
import { graphqlClient } from "./graphqlClient";
import { reactQueryClient } from "./reactQueryClient";

function useDecline() {
  return useMutation(
    async (variables) => {
      const { decline } = await graphqlClient.request(
        gql`
          mutation Approve($id: ID!, $creditScore: Float!) {
            decline(id: $id, creditScore: $creditScore) {
              borrower
              approved
              decisionDate
            }
          }
        `,
        variables
      );

      return decline;
    },
    {
      onSuccess() {
        reactQueryClient.invalidateQueries("loanRequests");
      },
    }
  );
}

export { useDecline };
