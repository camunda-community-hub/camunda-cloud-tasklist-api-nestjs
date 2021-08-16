import { Formik, Form, Field } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { APPROVED } from "./constants";

function Filters() {
  const history = useHistory();

  return (
    <Formik
      onSubmit={(values) => {
        history.replace({
          search: new URLSearchParams({
            ...Object.fromEntries(new URLSearchParams(history.location.search)),
            ...Object.fromEntries(
              Object.entries(values).filter(([, value]) => value !== "")
            ),
          }).toString(),
        });
      }}
      initialValues={{
        id: "",
        type: "",
        borrower: "",
        amount: "",
        assets: "",
        debt: "",
        creditScore: "",
        requestDate: "",
        decisionDate: "",
        approved: "",
        ...Object.fromEntries(new URLSearchParams(history.location.search)),
      }}
    >
      {({ handleReset }) => (
        <Form>
          <div className="columns">
            <div className="field column">
              <label className="label is-small" htmlFor="id">
                ID
              </label>
              <div className="control">
                <Field
                  className="input is-small"
                  component="input"
                  type="text"
                  name="id"
                  id="id"
                />
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small" htmlFor="type">
                  Type
                </label>
                <div className="select is-small is-fullwidth">
                  <Field component="select" name="type" id="type">
                    <option />
                    <option value="car">Car</option>
                    <option value="house">House</option>
                    <option value="general">General</option>
                  </Field>
                </div>
              </div>
            </div>
            <div className="field column">
              <label className="label is-small" htmlFor="borrower">
                Borrower
              </label>
              <div className="control">
                <Field
                  className="input is-small"
                  component="input"
                  type="text"
                  name="borrower"
                  id="borrower"
                />
              </div>
            </div>
            <div className="field column">
              <label className="label is-small" htmlFor="amount">
                Amount
              </label>
              <div className="control">
                <Field
                  className="input is-small"
                  component="input"
                  type="text"
                  name="amount"
                  id="amount"
                />
              </div>
            </div>
            <div className="field column">
              <label className="label is-small" htmlFor="assets">
                Assets
              </label>
              <div className="control">
                <Field
                  className="input is-small"
                  component="input"
                  type="text"
                  name="assets"
                  id="assets"
                />
              </div>
            </div>
            <div className="field column">
              <div className="control pt-5">
                <button
                  className="button is-info is-small is-fullwidth"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="field column">
              <label className="label is-small" htmlFor="debt">
                Debt
              </label>
              <div className="control">
                <Field
                  className="input is-small"
                  type="text"
                  component="input"
                  name="debt"
                  id="debt"
                />
              </div>
            </div>
            <div className="field column">
              <label className="label is-small" htmlFor="creditScore">
                Credit Score
              </label>
              <div className="control">
                <Field
                  className="input is-small"
                  component="input"
                  type="text"
                  name="creditScore"
                  id="creditScore"
                />
              </div>
            </div>
            <div className="field column">
              <label className="label is-small" htmlFor="requestDate">
                Request Date
              </label>
              <div className="control">
                <Field
                  className="input is-small"
                  component="input"
                  type="date"
                  name="requestDate"
                  id="requestDate"
                />
              </div>
            </div>
            <div className="field column">
              <label className="label is-small" htmlFor="decisionDate">
                Decision Date
              </label>
              <div className="control">
                <Field
                  className="input is-small"
                  component="input"
                  type="date"
                  name="decisionDate"
                  id="decisionDate"
                />
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small" htmlFor="approved">
                  Approved?
                </label>
                <div className="select is-small is-fullwidth">
                  <Field component="select" name="approved" id="approved">
                    <option />
                    <option value={APPROVED.yes}>Yes</option>
                    <option value={APPROVED.pending}>Pending</option>
                    <option value={APPROVED.no}>No</option>
                  </Field>
                </div>
              </div>
            </div>
            <div className="field column">
              <div className="control pt-5">
                <button
                  className="button is-small is-fullwidth"
                  type="reset"
                  onClick={(event) => {
                    history.replace({ search: "" });
                    handleReset(event);
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { Filters };
