-- CREATE DATABASE IF NOT EXISTS infoshare;
-- USE infoshare;
-- 테이블이 없을 경우 자동으로 만드는 SQL

CREATE TABLE IF NOT EXISTS posts (
    id BIGINT NOT NULL,
    author VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    edited_at DATETIME,
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
);

-- 실제 DB 반영 시 수동 실행
-- ALTER TABLE posts ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS tags (
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS post_tags (
    post_id BIGINT NOT NULL,
    tag_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (post_id, tag_name),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_name) REFERENCES tags(name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS post_files (
    id BIGINT AUTO_INCREMENT,
    post_id BIGINT NOT NULL,
    original_file_name VARCHAR(255) NOT NULL,
    stored_file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS post_likes (
    post_id BIGINT NOT NULL,
    user_ip VARCHAR(50) NOT NULL,
    PRIMARY KEY (post_id, user_ip),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
