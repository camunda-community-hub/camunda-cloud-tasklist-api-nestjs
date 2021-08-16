import React from "react";
import { Link } from "react-router-dom";
import { useLoanRequests } from "./useLoanRequests.query";
import { Pagination } from "./Pagination";
import { RequestsStatusFilterToggle } from "./RequestsStatusFilterToggle";

function Requests() {
  const { data: requests = [] } = useLoanRequests();

  return (
    <section>
      <div className="container mt-2 mb-2">
        <RequestsStatusFilterToggle />
      </div>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <td className="has-text-centered">ID</td>
            <td className="has-text-centered">Type</td>
            <td className="has-text-centered">Borrower</td>
            <td className="has-text-right">Amount</td>
            <td className="has-text-right">Assets</td>
            <td className="has-text-right">Debt</td>
            <td className="has-text-right">Credit Score</td>
            <td className="has-text-centered">Request Date</td>
            <td className="has-text-centered">Decision Date</td>
            <td className="has-text-centered">Approved?</td>
            <td className="has-text-centered" />
          </tr>
        </thead>
        <tbody>
          {requests.map(
            ({
              id,
              type,
              borrower,
              amount,
              assets,
              debt,
              creditScore,
              requestDate,
              decisionDate,
              approved,
              status,
            }) => (
              <tr key={id}>
                <td className="has-text-centered">{id}</td>
                <td className="has-text-centered">{type}</td>
                <td className="has-text-centered">{borrower}</td>
                <td className="has-text-right">{amount / 100}</td>
                <td className="has-text-right">{assets / 100}</td>
                <td className="has-text-right">{debt / 100}</td>
                <td className="has-text-right">{creditScore}</td>
                <td className="has-text-centered">{requestDate}</td>
                <td className="has-text-centered">{decisionDate}</td>
                <td className="has-text-centered">
                  {["Yes", "Pending", "No"][approved]}
                </td>
                <td className="has-text-centered">
                  {status === "open" && (
                    <Link to={`/requests/${id}`} className="button is-link">
                      Review
                    </Link>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div className="container">
        <Pagination />
      </div>
    </section>
  );
}

export { Requests };
