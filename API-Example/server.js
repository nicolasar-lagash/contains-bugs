const express = require("express");
const cors = require("cors");
const index = require("./routes");

// Constants
const {
  ALLOWED_ORIGINS,
  HOST,
  PORT
} = require("./settings/appsettings.secrets.json");

// App
const app = express();

app.listen(PORT, HOST);
app.use(express.json());
app.use("", index);

app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
        const msg = "Origen no permitido";
        console.log(`${msg} origin: ${origin}`);
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

app.use((req, res, next) => {
  let data = "";
  req.setEncoding("utf8");
  req.on("data", function(chunk) {
    data += chunk;
  });
  req.on("end", () => {
    req.body = data;
    next();
  });
});

console.log(`Corriendo  API en http://${HOST}:${PORT}`);
