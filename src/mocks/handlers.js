// src/mocks/handlers.js
import { rest } from 'msw';

const posts = [];
const updatePosts = [];

const handlers = [
  // Handles a POST /login request
  rest.post('http://localhost:8080/clubs/new', (req, res, ctx) => {
    posts.push(req.json); //불필요
    console.log(posts);
    return res(ctx.status(200), ctx.json({ id: '5' }));
  }),

  //PUT
  rest.put('http://localhost:8080/clubs/:id', (req, res, ctx) => {
    updatePosts.push(req.json); //불필요
    return res(ctx.status(200));
  }),

  // Handles a GET /user request
  rest.get('http://localhost:8080/clubs', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        clubs: [
          {
            id: '1',
            title: '가나다',
            createdDate: '2023.02.02',
          },
          {
            id: '2',
            title: '가나다2',
            createdDate: '2023.02.02',
          },
          {
            id: '3',
            title: '가나다3',
            createdDate: '2023.02.03',
          },
          {
            id: '4',
            title: '안녕',
            createdDate: '2023.02.03',
          },
        ],
      })
    );
  }),

  //상세페이지 고정으로 테스트
  rest.get('http://localhost:8080/clubs/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: '2',
        title: '가나다2',
        createdDate: '2023.02.02',
        contents: '같이 운동해',
        url: 'https://www.youtube.com/watch?v=fMFk57eKp4w',
      })
    );
  }),

  //DELETE
  rest.delete('http://localhost:8080/clubs/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.status(200), ctx.delay(1000));
  }),
];

export default handlers;
