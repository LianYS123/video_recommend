const { craw } = require("crawler-lian");
const db = require("../../libs/database");
const { notice } = require("./tools");

const insertArticle = async (data) => {
  const { original_id, title } = data;
  const [rows] = await db.query(
    "select count(*) as c from article where original_id=?",
    [original_id]
  );
  const { c: count } = rows[0];

  try {
    if (count === 0) {
      console.log(`insert article: ${title}`);
      await db.query("insert into article set ?", data);
    } else {
      console.log(`update article: ${title}`);
      await db.query("update article set ? where original_id=?", [data, original_id]);
    }
  } catch (error) {
    console.log(error);
    notice("spider_err.log", error.message);
  }
};

async function fetch(link) {
  const res = await craw(link, { jQuery: false });
  const items = JSON.parse(res.body.toString()).data.map((item) => {
    let {
      id: original_id,
      title,
      categories,
      summary,
      author,
      image_urls,
      publish_time,
      stats: { reply, view, like } = {},
      words
    } = item;

    let image_url =
      image_urls && image_urls.length > 0 ? image_urls[0] : undefined;
    let data = {
      original_id,
      title,
      tags:
        categories && categories.length > 0
          ? categories.map((item) => item.name).join("|")
          : undefined,
      summary,
      author: author.name,
      author_face: author.face,
      image_url,
      publish_time: new Date(Number(publish_time) * 1000),
      reply,
      view,
      like,
      words
      // img_name
    };
    return data;
  });
  items.forEach(insertArticle);
}

const getLinks = (len = 50) => {
  const links = [];
  for (let i = 0; i < len; i++) {
    links.push(
      `https://api.bilibili.com/x/article/recommends?cid=0&pn=${i}&ps=50&jsonp=jsonp&sort=0`
    );
  }
  return links;
};

getLinks(50).forEach(fetch);
