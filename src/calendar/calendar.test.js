const { findOpenings } = require('./calendar.js')

describe('calendar', () => {
  describe('findOpenings', () => {
    it('should return open timeslots with bound', () => {
      const cal1 = [['9:00', '10:30'], ['12:00', '13:00'], ['16:00', '18:00']];
      const cal2 = [['10:00', '11:30'], ['12:30', '14:30'], ['14:30', '15:00'], ['16:00', '17:00']];
      const bound1 = ['9:00', '20:00'];
      const bound2 = ['10:00', '18:30'];
      const duration = 30;
      const expected = [['11:30', '12:00'], ['15:00', '16:00'], ['18:00', '18:30']];
      const actual = findOpenings(cal1, bound1, cal2, bound2, duration);
      expect(actual).toStrictEqual(expected);
    });
  });
});