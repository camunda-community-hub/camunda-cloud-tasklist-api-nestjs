require("dotenv").config({
  path: "../.env",
});
const { ZBClient } = require("zeebe-node");
const faker = require("faker");

const zbc = new ZBClient();

zbc.deployProcess("./loanRequest.bpmn");

setTimeout(() => {
  setInterval(generateData, 500);

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generateData() {
    [...new Array(randomInteger(1, 5))].forEach(() => {
      zbc.createProcessInstance("loanRequest", {
        type: ["car", "house", "general"][faker.datatype.number(2)],
        borrower: faker.name.findName(),
        amount: Number(faker.finance.amount(50000, 5000000, 0)),
        assets: Number(faker.finance.amount(50000, 10000000, 0)),
        debt: Number(faker.finance.amount(50000, 10000000, 0)),
        creditScore: faker.datatype.float({
          min: 0,
          max: 10,
        }),
        decisionDate: null,
        requestDate: faker.date.past(),
        approved: faker.datatype.number(2),
      });
    });
  }

  process.stdin.on("data", process.exit.bind(process, 0));
}, 1000);
