function taskToRequest({ variables, ...task }) {
  return {
    ...task,
    status: task.taskState === 'CREATED' ? 'open' : 'resolved',
    ...variables.reduce(
      (accumulator, { value, name }) =>
        name === 'id'
          ? accumulator
          : Object.assign({}, accumulator, {
              [name]: JSON.parse(value),
            }),
      {},
    ),
  };
}

export { taskToRequest };
