import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLoanRequest } from "./useLoanRequest.query";
import { useApprove } from "./useApprove.mutation";
import { useDecline } from "./useDecline.mutation";

const APPROVED = Object.freeze({
  yes: 0,
  pending: 1,
  no: 2,
});

const DecisionForm = () => {
  const { id } = useParams();
  const [creditScore, setCreditScore] = useState("");
  const { data, isFetching } = useLoanRequest(id);
  const approveMutation = useApprove();
  const declineMutation = useDecline();

  useEffect(() => {
    if (data) {
      setCreditScore(data.creditScore);
    }
  }, [data]);

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Loan decision #{id}</p>
          <Link to="/requests">
            <button className="delete" aria-label="close" />
          </Link>
        </header>
        <section className="modal-card-body">
          <div className="field column">
            <label className="label is-small" htmlFor="creditScore">
              Credit score
            </label>
            <div className="control">
              <input
                className="input is-small"
                type="text"
                name="creditScore"
                id="creditScore"
                value={creditScore}
                onChange={(event) => {
                  setCreditScore(event.target.value);
                }}
                disabled={isFetching}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <Link to="/requests">
            <button
              className="button is-success mr-2"
              onClick={async () => {
                approveMutation.mutate({
                  id,
                  creditScore: parseFloat(creditScore),
                });
              }}
              disabled={isFetching}
            >
              Approve
            </button>
          </Link>
          <Link to="/requests">
            <button
              className="button"
              onClick={() => {
                declineMutation.mutate({
                  id,
                  creditScore: parseFloat(creditScore),
                });
              }}
              disabled={isFetching}
            >
              Decline
            </button>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export { DecisionForm };
