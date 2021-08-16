function requestParamToTaskParam(params) {
  const { status } = params;

  if (status === 'open') {
    return { ...params, state: 'CREATED' };
  }

  if (status === 'resolved') {
    return { ...params, state: 'COMPLETED' };
  }

  return params;
}

export { requestParamToTaskParam };
