import { rest } from 'msw';

import jsonData from './data.json';

export const handlers = [
  rest.post('/api/employees', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        results: JSON.stringify(jsonData),
        success: true,
      })
    )
  ),

  rest.post('/document', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.body(
        JSON.stringify({
          message: 'OK',
        })
      )
    );
  }),
];
