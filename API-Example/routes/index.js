const express = require("express");
const app = express();
const fetch = require("node-fetch");
const trace = require("../helpers/trace");
const api = require("../helpers/api");

const numberSpelling = require("../helpers/numberSpelling");
const birthdate = require("../helpers/birthdate");
const qr = require("../helpers/qr");

app.get("/numberSpelling/:number", (req, res) => {
  res.status(200).send(numberSpelling.NumeroALetras(req.params.number));
});

app.get("/birthdate/:date", (req, res) => {
  res.status(200).send(birthdate.calculateAge(req.params.date).toString());
});

app.get("/api/qr", (req, res) => {
  res.status(200).send(qr());
});

app.get("/api/uf/:fecha", async function(req, res) {
  trace.trackEvent(`Request a /api/example correcta.`);

  const request = await fetch(api.uriConfig.api.getUF(req.params.fecha), {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" }
  }).catch(error => {
    console.log(`error: ${error}`);
    trace.trackException(
      `Error llamando a ${api.uriConfig.api.getUF(
        "fecha en formato dd-mm-yyyy"
      )}. Error: ${error}`
    );
    res.status(500).send({
      msg:
        "Ha ocurrido un error llamando al API para obtener la información solicitada.",
      ok: false
    });
    res.end();
  });

  const response = await request.json();
  if (response) {
    trace.trackEvent(`Llamada a servicio correcta.`, response);
    res.send({
      msg: `El valor de la uf es ${response.serie[0].valor}`,
      ok: true
    });
    res.end();
  } else {
    trace.trackException(
      `Error llamando a ${api.uriConfig.apiQR.tokens}. Error: ${error}`
    );
    res.status(500).send({
      msg:
        "Ha ocurrido un error llamando al API para obtener la información solicitada.",
      ok: false
    });
    res.end();
  }
});

module.exports = app;
