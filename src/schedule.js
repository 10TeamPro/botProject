const schedule = (rtm, date, channel) =>
    // TODO: @param date에 해당하는 스케쥴 가져오기
  {
    const dateStr = date.split('/');
    const month = (dateStr[0]);
    const day = (dateStr[1]);
    if (Number.isNaN(Number(month))
      || Number.isNaN(Number(day))
      || (month < 1 || month > 12)
      || (day < 1 || day > 31))
      return {
        msg: rtm.sendMessage('올바른 날짜를 입력하세요', channel),
        success: false
      };

    console.log(`${date}의 스케쥴 일정표 출력`);
    return {
      msg: rtm.sendMessage('파일 좀 올려주세요', channel),
      success: true
    };
  }
;

module.exports = schedule;