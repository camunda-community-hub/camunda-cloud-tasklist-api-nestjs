import React from "react";
import { Link } from "react-router-dom";
import { PAGINATION_PARAMS, REQUESTS_PER_PAGE } from "./constants";
import { useLoanRequests } from "./useLoanRequests.query";

function createPaginationSearch(requestId, search, param) {
  if (requestId === null) {
    return search;
  }

  const searchParams = new URLSearchParams(search);

  searchParams.delete(PAGINATION_PARAMS.searchAfter);
  searchParams.delete(PAGINATION_PARAMS.searchBefore);
  searchParams.set(param, requestId);

  return searchParams.toString();
}

function Pagination() {
  const { data: requests = [] } = useLoanRequests();
  const firstRequestId = requests.length > 0 ? requests[0].sortValues : null;
  const lastRequestId =
    requests.length === REQUESTS_PER_PAGE ? requests[9].sortValues : null;

  return (
    <nav
      className="pagination is-rounded"
      role="navigation"
      aria-label="pagination"
    >
      {requests.length === 0 || requests[0].isFirst ? (
        <button className="pagination-previous" disabled>
          Previous
        </button>
      ) : (
        <Link
          className="pagination-previous"
          to={(location) => ({
            search: createPaginationSearch(
              firstRequestId,
              location.search,
              PAGINATION_PARAMS.searchBefore
            ),
          })}
        >
          Previous
        </Link>
      )}
      {requests.length === 0 || requests.length < REQUESTS_PER_PAGE ? (
        <button className="pagination-next" disabled>
          Next page
        </button>
      ) : (
        <Link
          className="pagination-next"
          to={(location) => ({
            search: createPaginationSearch(
              lastRequestId,
              location.search,
              PAGINATION_PARAMS.searchAfter
            ),
          })}
        >
          Next page
        </Link>
      )}
    </nav>
  );
}

export { Pagination };
