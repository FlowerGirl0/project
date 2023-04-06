import clientPromise from "../../middleware/database";

async function useDB() {
  const client = await clientPromise;
  const db = client.db("app_root_db");
  return { db };
}

export default useDB;
