import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
const bookRoom = async (user, roomNumber, price) => {
  const { username, phone } = user;
  
  const sql = postgres(config);
  
  try {
    const result = await sql.begin(async sql => {
      // Все операции в одной транзакции
      const [userRow] = await sql`
        INSERT INTO users (username, phone) 
        VALUES (${username}, ${phone})
        RETURNING id
      `;
      
      const [roomRow] = await sql`
        UPDATE rooms 
        SET status = 'reserved'
        WHERE room_number = ${roomNumber} 
          AND status = 'free'
        RETURNING id
      `;
      
      if (!roomRow) {
        throw new Error('Комната не найдена или занята');
      }
      
      const [orderRow] = await sql`
        INSERT INTO orders (user_id, room_id, price)
        VALUES (${userRow.id}, ${roomRow.id}, ${price})
        RETURNING id
      `;
      
      return { userId: userRow.id, roomId: roomRow.id, orderId: orderRow.id };
    });
    
    return result;
    
  } catch (error) {
    // Пробрасываем ошибку дальше
    throw error;
  } finally {
    // Закрываем соединение
    await sql.end();
  }
};

export default bookRoom;
// END
