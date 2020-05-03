const { fetchFile, craw } = require('crawler-lian');
const db = require('../../libs/database');
const { PATH_STATIC } = require('../../config');
const path = require('path');
const fse = require('fs-extra');
const { v4: uuid } = require('uuid')
const set = new Set();

function fetch(link) {
    return craw(
        link,
        { jQuery: false }
        )
        .then(res => {
            //
            JSON.parse(res.body.toString()).data.forEach(item => {
                let { id: original_id, title, categories, summary, author, image_urls, publish_time, stats: { reply, view, like } = {}, words } = item;

                let img_name;
                let image_url = image_urls && image_urls.length > 0 ? image_urls[0] : undefined;
                if (image_url) {
                    img_name = uuid().replace(/\-/g, '');
                    let img_path = path.join(PATH_STATIC, 'article_images', img_name[0], img_name[1])
                    fse.ensureDirSync(img_path);
                    fetchFile(image_url, img_path, img_name.substring(2));
                }
                let data = {
                    original_id,
                    title,
                    tags: categories && categories.length > 0 ? categories.map(item => item.name).join('|') : undefined,
                    summary,
                    author: author.name,
                    author_face: author.face,
                    image_url,
                    publish_time,
                    reply,
                    view,
                    like,
                    words,
                    img_name
                };

                if (!set.has(original_id)) {
                    set.add(original_id)
                    db.insert('article', data).catch(err => {
                        console.error(err);
                        set.delete(original_id);
                    })
                } else {
                    console.log(`${original_id} has already inserted`);
                }
                console.log(data);
            });
        })
}
let links = Array(50).fill(0).map((i, index) => (`https://api.bilibili.com/x/article/recommends?cid=0&pn=${index}&ps=50&jsonp=jsonp&sort=0`))
links.forEach(fetch)