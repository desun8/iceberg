import { rest } from 'msw';

import jsonData from './data.json';

export const handlers = [
  rest.post('/api/employees', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      results: JSON.stringify(jsonData),
      success: true,
    }),
  )),
];
