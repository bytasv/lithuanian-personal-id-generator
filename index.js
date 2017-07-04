import _ from 'lodash';

const MULTIPLIERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
const ADDITIONAL_MULTIPLIERS = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];
const CHECKSUM_DIVIDER = 11;
const CHECKSUM_REMAINDER = 10;
const FALLBACK_CONTROL_NUMBER = 0;
const GENDERS = [1, 2, 3, 4, 5, 6];
const pad = (value, count) => _.padStart(value, count, '0');

const getChecksum = (multipliers, personalIdParts) => {
  return personalIdParts
    .split('')
    .reduce((checksum, currentValue, index) => {
      const multiplier = multipliers[index];

      return checksum + (currentValue * multiplier);
    }, 0);
};
const isPossibleControlNumber = (checksumRemainder) => checksumRemainder !== CHECKSUM_REMAINDER;
const isValidControlNumber = (personalIdParts, controlNumber) => {
  const isCorrectControlNumber = (possibleControlNumber) => controlNumber === possibleControlNumber;

  let checksum = getChecksum(MULTIPLIERS, personalIdParts);
  let checksumRemainder = checksum % CHECKSUM_DIVIDER;

  if (isPossibleControlNumber(checksumRemainder)) {
    return isCorrectControlNumber(checksumRemainder);
  }

  checksum = getChecksum(ADDITIONAL_MULTIPLIERS, personalIdParts);
  checksumRemainder = checksum % CHECKSUM_DIVIDER;

  if (isPossibleControlNumber(checksumRemainder)) {
    return isCorrectControlNumber(checksumRemainder);
  }

  return isCorrectControlNumber(FALLBACK_CONTROL_NUMBER);
};

const getControlNumber = (personalIdParts) => {
  const possibleControlNumbers = _.range(10);

  return _.find(possibleControlNumbers, (controlNumber) => isValidControlNumber(personalIdParts, controlNumber));
};

const getPersonalId = () => {
  const gender = GENDERS[_.random(0, 5)];
  const year = pad(_.random(0, 99), 2);
  const month = pad(_.random(1, 12), 2);
  const day = pad(_.random(1, 28), 2);
  const personalNumber = pad(_.random(0, 999), 3);
  const personalIdParts = `${gender}${year}${month}${day}${personalNumber}`;
  const controlNumber = getControlNumber(personalIdParts);

  return `${personalIdParts}${controlNumber}`;
};
