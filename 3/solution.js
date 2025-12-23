import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

export default async (book) => {
  const sql = postgres(config);
  // BEGIN (write your solution here)
   const { title, author } = book;
  
  // Проверяем обязательные поля
  if (!title || !author) {
    throw new Error('Необходимо указать title и author');
  }
  
  try {
    // Вставляем запись в таблицу books
    const result = await sql`
      INSERT INTO books (title, author)
      VALUES (${title}, ${author})
      RETURNING *
    `;
    
    // Возвращаем первую запись из результата
    return result[0];
  } catch (error) {
    console.error('Ошибка при добавлении книги:', error);
    throw error;
  }
};

// Дополнительно: функция для закрытия пула соединений
export const closePool = async () => {
  await sql.end();
  // END
};
