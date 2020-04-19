const findOpenings = (cal1, bound1, cal2, bound2, duration) => {
  const start = Math.max(timeToNum(bound1[0]), timeToNum(bound2[0]));
  const end = Math.min(timeToNum(bound1[1]), timeToNum(bound2[1]));
  const durationHours = parseInt(duration) / 60.0

  const openings = []

  var current = start;
  var curCal1Idx = -1;
  var curCal2Idx = -1;

  while (true) {
    var cal1NextStart = cal1[curCal1Idx + 1] && timeToNum(cal1[curCal1Idx + 1][0]);
    var cal2NextStart = cal2[curCal2Idx + 1] && timeToNum(cal2[curCal2Idx + 1][0]);

    // find closest next start or end
    if ((!cal1NextStart || end <= cal1NextStart) && (!cal2NextStart || end <= cal2NextStart)) {
      // end is closest
      if (end - current >= durationHours) {
        openings.push([numToTime(current), numToTime(end)]);
      }
      break;
    } else if (!cal2NextStart || (cal1NextStart && cal1NextStart <= cal2NextStart)) {
      // cal1 next start is closest
      if (cal1NextStart - current >= durationHours) {
        openings.push([numToTime(current), numToTime(cal1NextStart)]);
      }
      curCal1Idx++;
      var cal1CurEnd = timeToNum(cal1[curCal1Idx][1])
      if (cal1CurEnd > current) {
        current = cal1CurEnd;
      }
    } else {
      // cal2 next start is closest
      if (cal2NextStart - current >= durationHours) {
        openings.push([numToTime(current), numToTime(cal2NextStart)]);
      }
      curCal2Idx++;
      var cal2CurEnd = timeToNum(cal2[curCal2Idx][1])
      if (cal2CurEnd > current) {
        current = cal2CurEnd;
      }
    }
  }
  return openings;


}

const timeToNum = (str) => {
  const parts = str.split(':');
  return parseInt(parts[0]) + (parseInt(parts[1]) / 60.0)
}

const numToTime = (num) => {
  const rem = num - Math.floor(num);
  if (rem > 0) {
    return Math.floor(num).toString() + ':' + (rem * 60).toString();
  } else {
    return num.toString() + ':00'
  }
}

exports.findOpenings = findOpenings;