import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
const solution = async (articles) => {
  // Подключаемся к базе данных
  const sql = postgres(config);
  
  const ids = [];

  try {
    for (const article of articles) {
      const result = await sql`
        INSERT INTO articles (title, description)
        VALUES (${article.title}, ${article.description})
        RETURNING id
      `;
      
      ids.push(result[0].id);
    }
    
    return ids;
  } finally {
    await sql.end();
  }
};

export default solution;
// END
