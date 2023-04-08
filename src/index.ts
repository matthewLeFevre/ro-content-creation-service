import createServer from "./server";
import connect from "./utilities/connect";

createServer(connect).listen(process.env.PORT, () => {
  console.log(`Starter service project running on port ${process.env.PORT}`);
});
