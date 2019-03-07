import Friend from './Friend';
import storage from './storage';
import casual from 'casual';
import _ from 'lodash';

if (storage.friends === undefined) storage.friends = {};

// some users
_.times(10, () => {
  let id = require('crypto')
    .randomBytes(10)
    .toString('hex');
  storage.friends[id] = {
    id,
    firstName: casual.first_name,
    lastName: casual.last_name,
    gender: casual.random_element(['MALE', 'FEMALE', 'UNSPECIFIED']),
    age: casual.integer(18, 85),
    language: casual.random_element([
      'english',
      'chinese',
      'french',
      'arabic',
      'swahili',
      'spanish',
      'portuguese',
      'japanese',
    ]),
    email: casual.email,
  };
});

export { Friend, storage };
