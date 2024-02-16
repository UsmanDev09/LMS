const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

const main = async () => {
  try {
    await database.category.createMany({
      data: [
        {
          name: "Computer Sceince",
        },
        {
          name: "Fitness",
        },
        {
          name: "Accounting",
        },
        {
          name: "Engineering",
        },
        {
          name: "Coaching",
        },
      ],
    });
  } catch (error) {
    console.log("Error Seeding the Database from Categories Tables", error);
  } finally {
    await database.$disconnect();
  }
};
main();
