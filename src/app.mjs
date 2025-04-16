export const lambdaHandler = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello Hello this is new change',
    }),
  };

  return response;
};
