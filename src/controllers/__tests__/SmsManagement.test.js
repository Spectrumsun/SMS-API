import request from 'supertest';
import app from '../../app';


describe('Random Number', () => {
  
  it('should return the success on /api/v1', (done) => {
    request(app)
      .get('/api/v1/')
      .end((error, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Random Phone Number Generator');
        if (error) done(error);
        done();
      });
  });

  it('should generate new numbers', (done) => {
    request(app)
      .post('/api/v1/random')
      .end((error, res) => {
        expect(res.status).toEqual(201);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Number created');
        if (error) done(error);
        done();
      });
  });

  it('should return saved numbers new numbers', (done) => {
    request(app)
      .get('/api/v1/numbers')
      .end((error, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('List of Numbers');
        if (error) done(error);
        done();
      });
  });

  it('should return 404 for unknow route', (done) => {
    request(app)
      .put('/api/v1/numbers')
      .end((error, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual('That url does not exist on this server 🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫');
        if (error) done(error);
        done();
      });
  });

  it('should return html for home page', (done) => {
    request(app)
      .get('/')
      .end((error, res) => {
        expect(res.text).toContain('<head>');
        if (error) done(error);
        done();
      });
  });
  it('should return html for home page', (done) => {
    request(app)
      .get('/nj')
      .end((error, res) => {
        expect(res.text).toContain('<head>');
        if (error) done(error);
        done();
      });
  });
});