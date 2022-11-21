const menu = (rtm, day, channel) => {
  if (day % 6 === 0) {
    return rtm.sendMessage('토/일요일은 제공되지 않습니다.', channel);
  }
  // TODO: 메뉴 데이터 가져오기 및 평점 보내기
  return null;
};

module.exports = menu;
