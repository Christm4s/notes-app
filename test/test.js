let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('http');
const { expect } = require('chai');

describe('git autotest', () => {
    it('it should test git auto-test', () => {
        expect(1).to.equal(1);
    });
});