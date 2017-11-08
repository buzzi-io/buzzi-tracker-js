
export default product => createPayload => (
  createPayload(payload => {
    payload.product = product;
  })
);
