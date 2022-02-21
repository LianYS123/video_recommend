

drop table if exists video_info;

-- 信息表
create table video_info(
  id INT AUTO_INCREMENT PRIMARY KEY,

  actors text,
  areas varchar(255),
  cover varchar(255),
  evaluate text,
  title varchar(255),
  is_finish tinyint,
  is_started tinyint,
  pub_date datetime,
  time_length_show varchar(255),
  rating_count int,
  rating_score float,
  staff text,
  favorites bigint,
  series_follow bigint,
  views bigint,
  styles varchar(255),
  `type` tinyint,
  type_name varchar(255),
  media_id bigint not null
);

ALTER TABLE video_info ADD CONSTRAINT unique_media_id UNIQUE(media_id);
