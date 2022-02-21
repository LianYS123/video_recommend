const db = require("../../libs/database");

const test = async () => {
  const [rows] = await db.query(
    "select count(*) as c from article where original_id=?",
    [15290269]
  );
  console.log(rows);
};

test();
