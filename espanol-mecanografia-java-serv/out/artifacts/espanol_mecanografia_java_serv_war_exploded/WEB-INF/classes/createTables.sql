create table users (
  id int auto_increment key,
  name varchar(255) unique,
  password varchar(255),
  registered_at date
) ENGINE=INNODB;

create table typed_words (
  id int auto_increment key,
  user_id int,
  word_id varchar(255),
  created_at date,
  foreign key (user_id) references users(id) on delete cascade
) ENGINE=INNODB;

create table missed_words (
  id int auto_increment key,
  user_id int,
  word_id varchar(255),
  created_at date,
  foreign key (user_id) references users(id) on delete cascade
) ENGINE=INNODB;

create table applied_filters(
  id int auto_increment key,
  user_id int,
  filter_name varchar(255),
  foreign key (user_id) references users(id) on delete cascade
) ENGINE=INNODB;

alter table applied_filters add filter_category varchar(255);