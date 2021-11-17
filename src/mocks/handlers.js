import { rest } from 'msw';

import teamJson from './teamData.json';

export const handlers = [
  rest.get('/api/employees', (req, res, ctx) =>
    res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({
        results: JSON.stringify(teamJson),
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
