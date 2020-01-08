const qr_image = require("qr-image");
const { ngrokURL } = require("../settings/appsettings.secrets.json");

/**
 * Obtiene código QR a partir de la URL en appsettings.secrets.json
 * @version         1.0.0 - 08-01-2020
 * @author          Nicolás Arias - nicolarias
 * @returns {string} : QR
 */
const qr = () => {
  return qr_image.imageSync(ngrokURL, {
    type: "svg",
    size: 4
  });
};

module.exports = qr;
