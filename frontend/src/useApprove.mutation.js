import { useMutation } from "react-query";
import { gql } from "graphql-request";
import { graphqlClient } from "./graphqlClient";
import { reactQueryClient } from "./reactQueryClient";

function useApprove() {
  return useMutation(
    async (variables) => {
      const { approve } = await graphqlClient.request(
        gql`
          mutation Approve($id: ID!, $creditScore: Float!) {
            approve(id: $id, creditScore: $creditScore) {
              borrower
              approved
              decisionDate
            }
          }
        `,
        variables
      );

      return approve;
    },
    {
      onSuccess() {
        reactQueryClient.invalidateQueries("loanRequests");
      },
    }
  );
}

export { useApprove };
