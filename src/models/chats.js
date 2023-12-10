const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const luxon = require('luxon');

const messageSchema = new Schema({
    user: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

messageSchema.virtual('formattedTimestamp').get(function () {
    const date = luxon.DateTime.fromJSDate(this.timestamp);
    const now = luxon.DateTime.local();

    // Si el mensaje es enviado dentro del día en curso, solo muestra la hora
    if (date.hasSame(now, 'day')) {
        return date.toFormat('HH:mm');
    }

    // Si el mensaje tiene menos de una semana, muestra el nombre del día y la hora
    if (date.diff(now, 'days').days < 7) {
        return date.toFormat('EEEE HH:mm');
    }

    // Si el mensaje tiene más de una semana, muestra el número del día, el nombre del mes y el año
    return date.toFormat('d LLLL yyyy');
});

module.exports = mongoose.model('message', messageSchema);
