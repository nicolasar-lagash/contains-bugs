/**
 * Calcula la edad dada una fecha de nacimiento
 * @param {string}  birthday : 01-02-1998
 * @version         1.0.0 - 08-01-2020
 * @author          Nicolás Arias - nicolarias
 * @returns {int} : 21
 */
function calculateAge(birthday) {
  var birthday_arr = birthday.split("-");
  var birthday_date = new Date(
    birthday_arr[2],
    birthday_arr[1] - 1,
    birthday_arr[0]
  );
  var ageDifMs = Date.now() - birthday_date.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = { calculateAge };
