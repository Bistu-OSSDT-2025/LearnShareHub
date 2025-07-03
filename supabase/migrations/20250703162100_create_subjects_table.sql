CREATE TABLE subjects (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

COMMENT ON TABLE subjects IS 'Stores information about different subjects or disciplines.';

-- Seed initial subjects
INSERT INTO subjects (name, description) VALUES
('计算机科学', '编程、算法、软件工程等技术讨论'),
('数学', '高等数学、线性代数、概率统计'),
('物理学', '力学、电磁学、量子物理学习交流'),
('英语', '英语学习、口语练习、考试备考');
