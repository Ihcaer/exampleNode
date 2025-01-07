import * as chai from 'chai';
import { expect } from 'chai';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

import BlogController from '../../src/controllers/blogController.js';
import models from '../../src/models/models.js';
import { basename } from 'path';
import { fileURLToPath } from 'url';

const filePath = fileURLToPath(import.meta.url);
const FileName = basename(filePath);

describe(`${FileName} - getPostBySlug()`, () => {
  let req, res, next;
  let findOneStub;
  let blogController;

  beforeEach(() => {
    req = { params: { slug: 'test-post' } };
    res = {
      set: Sinon.stub().returnsThis(),
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    };
    next = Sinon.stub();

    findOneStub = Sinon.stub(models.Post, 'findOne');
    blogController = new BlogController();
  });

  afterEach(() => {
    Sinon.restore();
  });

  it('should return the post if it exists', async () => {
    const mockPost = {
      id: 1,
      authorId: 1,
      mainImg: 'image.jpg',
      title: 'Test post',
      slug: 'test-post',
      content: 'Content of the test post',
      category: 'Testing',
      date: new Date(),
    };

    findOneStub.resolves(mockPost);

    await blogController.getPostBySlug(req, res, next);

    expect(findOneStub).to.have.been.calledOnceWith({ where: { slug: 'test-post' } });
    expect(res.set).to.have.been.calledOnceWith(
      'Cache-Control',
      'public, max-age=600, stale-if-error=172800'
    );
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockPost);
  });

  it('should return 404 if the post doesnt exists', async () => {
    findOneStub.resolves(null);

    await blogController.getPostBySlug(req, res, next);

    expect(findOneStub).to.have.been.calledOnceWith({ where: { slug: 'test-post' } });
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Post not found' });
  });

  it('should call next with an error if an exception occurs', async () => {
    const error = new Error('Database error');
    findOneStub.rejects(error);

    await blogController.getPostBySlug(req, res, next);

    expect(findOneStub).to.have.been.calledOnceWith({ where: { slug: 'test-post' } });
    expect(next).to.have.been.calledOnceWith(error);
  });
});
