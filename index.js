/* 
Docs: https://www.npmjs.com/package/mongoosastic/v/4.0.1
 */
const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");
const ELASTIC_IP = "192.168.1.20";
const ELASTIC_PORT = "9200";
const MONGO_IP = "192.168.1.21";
const MONGO_PORT = "27017";
const DefinitionSchema = new mongoose.Schema({
  author: String,
  sourceLanguage: String,
  destinationLanguage: String,
  sourceTerm: String,
  destinationTermNative: String,
  destinationTermRoman: String,
  thumbsUp: Number,
  thumbsDown: Number,
  audioUrl: String,
  tags: [String],
  date: { type: Date, default: Date.now }
});

DefinitionSchema.plugin(mongoosastic, {
  host: ELASTIC_IP,
  port: ELASTIC_PORT
});

const Definition = mongoose.model("Definition", DefinitionSchema);

Definition.createMapping((err, mapping) => {
  if (err) console.log(err);
  else console.log("mapping created");
});

mongoose
  .connect(`mongodb://${MONGO_IP}:${MONGO_PORT}/Definitions`)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB...", err));

// Blank object {} will find all records
Definition.find({}, (err, docs) => {
  let i = 0;
  docs.forEach(d => {
    d.index((err, res) => {
      if (err) console.log(err);
      else console.log(res);
    });
  });
  console.log(i);
}).then(console.log("finished"));

/*
Definition.createMapping((err, mapping) => {
  if (err) console.log(err);
  else console.log(mapping);
});
*/
