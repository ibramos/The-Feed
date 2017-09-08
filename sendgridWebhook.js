const localtunnel = require("localtunnel");

localtunnel(8000, { subdomain: "chdirpwmvsksdflplzbchgwtaqodmvh" }, function(
  err,
  tunnel
) {
  console.log("LT running");
});
