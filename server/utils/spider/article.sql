
drop table if exists article;

-- 文章表
create table article (
  id INT AUTO_INCREMENT PRIMARY KEY,
  original_id bigint,
  title varchar(256),
  tags varchar(256),
  summary text,
  author varchar(256),
  author_face varchar(256),
  image_url varchar(256),
  publish_time datetime,
  reply bigint,
  view bigint,
  `like` bigint,
  words int
);
ALTER TABLE article ADD CONSTRAINT c_original_id UNIQUE(original_id);

