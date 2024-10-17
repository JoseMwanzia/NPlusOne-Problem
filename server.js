const db = require("knex")(require("./db")); //knex is a node js ORM, others include TypeORM 

async function getEmployees() {
  try {
    // ------------------------Lazy loading and can lead to the N+1 query problem is in this-----------------------------

    // uncomment this to work
    // const users = await db("users").select("*"); // First query
    // for (const user of users) { // N queries which depend in the size of the fetched users (conducts a loop)
    //   const posts = await db("posts")
    //     .where("user_id", user.id)
    //     .orderBy("user_id", "asc");
    //   user.posts = posts;
    //   console.log(posts);
    // } 
    // ------------------------------------------------------------------------------------------------------


    // -----------------------Earger loading which eliminates N+1 query problem----------------------------
    const accountsWIthBranches = await db("users") // runs one optimized query 
      .leftJoin("posts", "users.id", "posts.user_id")
      .select("users.id", "users.age", "posts.id as postId", "posts.title")
      .orderBy('users.id', 'asc');
    console.log(accountsWIthBranches);
    // ------------------------------------------------------------------------------------------------------
  } catch (err) {
    console.error("Error executing query", err.stack);
  }
}

getEmployees();
