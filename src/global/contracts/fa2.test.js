const { deploy, getAccount, getEndpoint } = require('@completium/completium-cli');
const { assert } = require('console');
// const { generateArchetypeId, pauseAndVerify, unpauseAndVerify, getArchetypeData, getFA2Balance, getQuartzOwner, getQuartzUri, getTokenId, checkFA2Balance, errors } = require('./utils');
// const assert = require('assert');

const mockup_mode = getEndpoint() === 'mockup'

// accounts
const admin = getAccount(mockup_mode ? 'alice' : "bookit_admin");


let nftContract;

describe("Deploy & init", () => {
  it("contract will deploy", async () => {
    [nftContract] = await deploy('src/global/contracts/fa2.arl', {
      parameters: {
        admin: admin.pkh
      },
      named: 'bookitNFT',
      as: admin.pkh
    });
  });
});
