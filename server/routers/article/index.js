const Router = require("koa-router");
const db = require("../../libs/database");
const { test, testAll } = require("../../libs/validator");
const router = new Router();
//轮播、广告、分类、文章列表、热门文章
const { ads, categories, hots, carousel } = require("./fake_data"); //假数据
router.get("/init", (ctx) => {
  ctx.body = {
    ok: true,
    data: {
      categories: categories.map((name, index) => ({ name, id: index })),
      ads: ads.map((name, index) => ({ name, id: index })),
      hots: hots.map((name, index) => ({ name, id: index })),
      carousel
    }
  };
});

//真接口
router.get("/", async (ctx) => {
  let { page = 1, page_size = 20, category } = ctx.query;
  testAll({ num: page, pageSize: page_size, num: category }, false);
  cateName = categories[category];
  let where = ["1=1"];
  parseInt(category) && cateName && where.push(`\`tags\` like "%${cateName}%"`);
  page = parseInt(page);
  page_size = parseInt(page_size);
  where = where.join(" and ");
  let sql = `select * from article where ${where} limit ?,?`;
  let [rows] = await db.query(sql, [(page - 1) * page_size, page_size]);
  let list = rows.map((item) => {
    let { tags } = item;
    tags = tags ? tags.split("|") : [];
    return { ...item, tags };
  });
  let total = await db.getCount("article", where);
  ctx.body = {
    ok: true,
    data: {
      list,
      total
    }
  };
});
module.exports = router.routes();
