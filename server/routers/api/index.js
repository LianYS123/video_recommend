const Router = require("koa-router");
const db = require("../../libs/database");
const { test, testAll } = require("../../libs/validator");
let router = new Router();

router.get("/video/category", async (ctx) => {
  ctx.body = {
    ok: true,
    data: require("./category")
  };
});

router.get("/video/search/:page/:pageSize/", async (ctx) => {
  let { keyword } = ctx.query;
  let { page, pageSize } = ctx.params;
  testAll({ num: page, pageSize });
  page = parseInt(page);
  pageSize = parseInt(pageSize);

  where = `title like \"%${keyword}%\" or styles like \"%${keyword}%\" or type_name like \"%${keyword}%\"`;
  let sql = `select * from video_info where ${where} ORDER BY views DESC limit ?,?`;

  let [rows] = await ctx.db.query(sql, [(page - 1) * pageSize, pageSize]);
  let total = await ctx.db.getCount("video_info", where);
  let has_next = pageSize * (page - 1) + rows.length < total ? 1 : 0;
  ctx.body = {
    ok: true,
    data: {
      has_next,
      list: rows,
      num: page,
      total
    }
  };
});

router.get("/video", async (ctx) => {
  let {
    type,
    area: areas,
    style: styles,
    sort,
    desc,
    page,
    pageSize
  } = ctx.query;
  testAll({ num: page, pageSize });
  test(sort, "sort", false);
  page = parseInt(page);
  pageSize = parseInt(pageSize);

  let where = [];
  if (type) {
    type = parseInt(type);
    where.push(`type=${type}`);
  }
  if (areas) {
    where.push(`areas like \"%${areas}%\"`);
  }
  if (styles) {
    where.push(`styles like \"%${styles}%\"`);
  }
  where = where.length === 0 ? "1=1" : where.join(" and ");
  desc = desc ? "desc" : ""; //传了逆序排列，没传正序排列
  sort =
    sort === "ranking"
      ? "CAST(power(favorites*views,1/2) * POWER(rating_score/5,5) AS UNSIGNED INTEGER)"
      : sort;
  let order = sort
    ? `order by ${sort} ${desc}, views desc, favorites desc, rating_score desc`
    : "";

  let sql = `select * from video_info where ${where} ${order} limit ?,?`;
  console.log(sql);
  let [rows] = await ctx.db.query(sql, [(page - 1) * pageSize, pageSize]);
  let total = await ctx.db.getCount("video_info", where);
  let has_next = pageSize * (page - 1) + rows.length < total ? 1 : 0;
  ctx.body = {
    ok: true,
    data: {
      has_next,
      list: rows,
      num: page,
      total
    }
  };
});
router.get("/video/:media_id/", async (ctx) => {
  let { media_id } = ctx.params;
  test(media_id, "id");
  media_id = parseInt(media_id);
  const [rows] = await db.query("select * from video_info where media_id=?", [
    media_id
  ]);
  ctx.body = { ok: true, data: { mediaInfo: rows[0] } };
});

module.exports = router.routes();
