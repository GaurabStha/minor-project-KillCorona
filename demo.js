// import ContactTracing from '/contact-tracing.class.js';
var ContactTracing = require('./contact-tracing.class')

// Instantiate with the mobile device's 32-byte private key
const ct = new ContactTracing('a1b2c3d411jj99kk55gg66hhz0y9x8w7');

// Test data for Medium article "Contact Tracing with Android/iPhone"
const encounters = [
    { person: 'test 1', ts: 'May 15, 2020 16:21:00' },
    { person: 'test 2', ts: 'May 15, 2020 16:51:00' },
    { person: 'test 3', ts: 'May 16, 2020 17:06:00' },
    { person: 'test 4', ts: 'May 16, 2020 17:11:00' },
    { person: 'test 5', ts: 'May 17, 2020 17:11:00' }
];

process.stdout.write(`Daily Trcing Key  Rolling Proximity Id       person     \n`);
process.stdout.write(`----------------  --------------------  ----------------\n`);

for (let encounter of encounters) {
    const unixTimestamp = Date.parse(encounter.ts);
    const data = ct.refresh(unixTimestamp);
    process.stdout.write(`${data.dtki} ${data.RPIij} ${encounter.person} \n`);
}