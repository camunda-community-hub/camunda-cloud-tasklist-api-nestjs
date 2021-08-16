import React from "react";
import { useHistory } from "react-router";
import classNames from "classnames";
import { PAGINATION_PARAMS } from "./constants";

function Button({ onClick, children, isActive }) {
  return (
    <button
      className={classNames("button", {
        "is-info": isActive,
        "is-selected": isActive,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const PARAM_NAME = "status";

function RequestsStatusFilterToggle() {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const statusParam = params.get(PARAM_NAME);

  return (
    <div className="buttons has-addons is-centered">
      <Button
        isActive={["", "open", null].includes(statusParam)}
        onClick={() => {
          params.delete(PARAM_NAME);
          params.delete(PAGINATION_PARAMS.searchAfter);
          params.delete(PAGINATION_PARAMS.searchBefore);
          history.push({ search: params.toString() });
        }}
      >
        Open
      </Button>
      <Button
        isActive={statusParam === "resolved"}
        onClick={() => {
          params.set(PARAM_NAME, "resolved");
          params.delete(PAGINATION_PARAMS.searchAfter);
          params.delete(PAGINATION_PARAMS.searchBefore);
          history.push({ search: params.toString() });
        }}
      >
        Resolved
      </Button>
    </div>
  );
}

export { RequestsStatusFilterToggle };
