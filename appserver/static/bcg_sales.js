require([
	"splunkjs/mvc",
	"splunkjs/mvc/simplexml/ready!"
], function(mvc) {

var env = mvc.Components.get("env");
 var tokens = mvc.Components.get("default");
var service = mvc.createService({'owner':'nobody'});
var uri = "storage/collections/data/bcg_collection/";
var headers = {"Content-Type": "application/json"};
 $("#saveBtn").on("click", function() {
 var record = JSON.stringify({
 "user": env.get("user"),
 "game": tokens.get("game_tok"),
 "earliest": tokens.get("time_tok.earliest"),
 "latest": tokens.get("time_tok.latest")
 });
key = tokens.get("key");
service.request(uri + key, "POST", null, null, record, headers, function(err,res) {
 if (!err) {
 $("#saveMsg").text("Preferences saved!");
 $("#saveMsg").fadeIn(1000).delay(3000).fadeOut(1000);
 }
});

 });

$(document).ready(function() {
 var query = {"user": env.get("user")};

 service.request(uri, "GET", query, null, null, headers, function(err,res) {
 if (!err) {
 if (res.data.length > 0) {
 tokens.set("key", res.data[0]._key);
 tokens.set("form.game_tok", res.data[0].game);
 tokens.set("form.time_tok.earliest", res.data[0].earliest);
 tokens.set("form.time_tok.latest", res.data[0].latest);
 }
 }
 });

 });

});
