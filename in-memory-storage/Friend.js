export default class Friend {
  constructor(id, fields) {
    this.id = id;
    Object.keys(fields).forEach(key => {
      if (key !== 'id') this[key] = fields[key];
    });
  }
}
