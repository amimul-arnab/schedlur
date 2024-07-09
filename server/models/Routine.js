const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  notes: { type: String, default: '' },
  color: { type: String, default: '#000000' }, // Add default color
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Routine', RoutineSchema);
