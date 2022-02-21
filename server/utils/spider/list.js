const Crawler = require("crawler");
const db = require("../../libs/database");
const { notice } = require("./tools");

let c1 = new Crawler({
  // rateLimit: 500,
  maxConnections: 3,
  callback: async function (err, res, done) {
    if (err) {
      console.log(err);
      notice("spider_err.log", err.message);
    } else {
      let $ = res.$;
      let scrStr = $("script").text();
      let jsonStr = scrStr.substring(
        scrStr.indexOf('{"ver":{},'),
        scrStr.indexOf(";(function(){var s;")
      );
      let json = JSON.parse(jsonStr);
      let {
        actors,
        areas,
        cover,
        evaluate,
        title,
        publish: { is_finish, is_started, pub_date, time_length_show } = {},
        rating: { count: rating_count, score: rating_score } = {},
        staff,
        stat: { favorites, series_follow, views } = {},
        styles,
        type,
        type_name,
        media_id
      } = json.mediaInfo;

      areas = areas.map((area) => area.name).join("|");
      styles = styles.map((style) => style.name).join("|");

      // console.log(res.options.uri);
      //   let img_name = (uuid() + cover.substring(cover.lastIndexOf("."))).replace(
      //     /\-/g,
      //     ""
      //   );
      //   let path = imgPath + img_name;

      let datas = {
        actors,
        areas,
        cover,
        evaluate,
        title,
        is_finish,
        is_started,
        pub_date,
        time_length_show,
        rating_count,
        rating_score,
        staff,
        favorites,
        series_follow,
        views,
        styles,
        type,
        type_name,
        media_id
        // img_name
      };
      // writeFileSync(
      //   join(__dirname, "video.json"),
      //   JSON.stringify(datas, null, 2)
      // );

      try {
        const [rows] = await db.query(
          "select count(*) as c from video_info where media_id=?",
          [media_id]
        );
        const { c: count } = rows[0];
        if (count === 0) {
          console.log(`insert video: ${title}`);
          await db.query("insert into video_info set ?", datas);
        } else {
          console.log(`update video: ${title}`);
          await db.query("update video_info set ? where media_id=?", [
            datas,
            media_id
          ]);
        }
      } catch (e) {
        console.log(e);
        notice("spider_err.log", e.message);
      }
    }
    done();
  }
});

let c2 = new Crawler({
  jQuery: false,
  // rateLimit: 500,
  maxConnections: 3,
  callback(err, res, done) {
    if (err) {
      console.log(err);
    } else {
      let body = res.body.toString();
      // console.log(body);
      console.log(res.options.uri);
      let data = JSON.parse(body).data;
      let list = data.list || [];
      if (list.length == 0) {
        notice("spider_empty.log", res.options.uri);
      }
      const ids = list.map((it) => it.media_id);
      links = ids.map((id) => `https://www.bilibili.com/bangumi/media/md${id}`);
      // links = [`https://www.bilibili.com/bangumi/media/md${ids[0]}`];
      c1.queue(links);
      if (data.has_next) {
        c2.queue(res.options.uri.replace(/page=\d+/, `page=${data.num + 1}`));
      }
    }
    done();
  }
});

let list = [
  `https://api.bilibili.com/pgc/season/index/result?season_version=-1&area=-1&is_finish=-1&copyright=-1&season_status=-1&season_month=-1&year=-1&style_id=-1&order=3&st=1&sort=0&page=1&season_type=1&pagesize=50&type=1`,
  `https://api.bilibili.com/pgc/season/index/result?style_id=-1&producer_id=-1&release_date=-1&season_status=-1&order=2&st=3&sort=0&page=1&season_type=3&pagesize=50&type=1`,
  `https://api.bilibili.com/pgc/season/index/result?area=-1&style_id=-1&release_date=-1&season_status=-1&order=2&st=5&sort=0&page=1&season_type=5&pagesize=50&type=1`,
  `https://api.bilibili.com/pgc/season/index/result?area=-1&style_id=-1&release_date=-1&season_status=-1&order=2&st=2&sort=0&page=1&season_type=2&pagesize=50&type=1`
];
c2.queue(list);
