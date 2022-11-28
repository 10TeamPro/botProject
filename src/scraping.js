const axios = require('axios'); // 열기
const cheerio = require('cheerio');

async function webScrap(url) {
  // const res = [];
  const res = [];
  const html = await axios.get(url); // url 열기
  const $ = cheerio.load(html.data); // 찾기

  $('div:nth-child(2) > table:nth-child(1) > tbody > tr:nth-child(1) > td').each(function () {
    const element = [];

    $(this)
      .find('span')
      .each(function () {
        element.push($(this).text());
      });

    if (element.length === 0)
      $(this)
        .find('font')
        .each(function () {
          element.push($(this).text());
        });

    res.push(element);
  });
  return res;
}

const url = 'https://sobi.chonbuk.ac.kr/menu/week_menu.php';
webScrap(url).then((res) => {
  console.log(res);
});
