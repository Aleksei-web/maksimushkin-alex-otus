create TABLE company (
	id VARCHAR(225) NOT NULL UNIQUE,
	name VARCHAR(225) NOT NULL,
	isActive BOOLEAN
);

create TABLE log (
	id SERIAL PRIMARY KEY NOT NULL,
	id_company VARCHAR(225),
	router VARCHAR(225),
	status NUMERIC,
	message VARCHAR(225),
	ts DATE
);


create TABLE quiz (
	id SERIAL PRIMARY KEY NOT NULL,
	id_company VARCHAR(225),
	FOREIGN KEY (id_company) REFERENCES company (id),
  id_client VARCHAR(225) NOT NULL,
  url VARCHAR(225) NOT NULL,
	rating SMALLINT,
	comment VARCHAR(225),
	id_manager VARCHAR(225),
	inn VARCHAR(225),
	id_deal VARCHAR(225),
	ts DATE
);


DROP TABLE test_quiz;

create table quiz_test (
	id SERIAL PRIMARY KEY NOT NULL,
	id_client VARCHAR(225),
	token VARCHAR(225),
	rating INT,
	comment VARCHAR(225),
	id_worker VARCHAR(225),
	ts DATE,
	id_company INT
);




-- // psql \! chcp 1251 //
-- // select * from quiz; // получить всех пользователей