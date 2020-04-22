const axios = require('axios');
const cheerio = require('cheerio');

const getLangsAndtechs = async (username) => {
  const url = "https://profile.codersrank.io/user/" + username;

  const res = await axios(url)
  const html = res.data;
  const $ = cheerio.load(html);
  const cardsLangs = $('.technology-card-grid.profile-languages > .technology-card > .technology-card-header');
  const cardsTechs = $('.profile-technologies > .technology-card-grid > .technology-card > .technology-card-header');

  const langs = [];
  const techs = [];

  cardsLangs.each(function () {
    langs.push({
      name: $(this).find('.technology-card-name').text(),
      score: Number($(this).find('.technology-card-score > .technology-card-score-value').text())
    })

  });

  cardsTechs.each(function () {
    techs.push({
      name: $(this).find('.technology-card-name').text(),
      score: Number($(this).find('.technology-card-score > .technology-card-score-value').text())
    })

  });

  return {langs, techs}
}

module.exports = { getLangsAndtechs };
