import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
export default async function solution() {
  const sql = postgres(config);

  try {
    // Создаем таблицу articles
    await sql`
      CREATE TABLE articles (
        title VARCHAR(255),
        description VARCHAR(255)
      )
    `;

    // Добавляем как минимум одну запись в таблицу
    await sql`
      INSERT INTO articles (title, description)
      VALUES ('Первая статья', 'Это описание первой статьи')
    `;

  } finally {
    await sql.end();
  }
}
// END
