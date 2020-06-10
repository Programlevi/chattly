const { sql } = require('slonik');
const pool = require('../pool');
const isObject = require('../../utils/isObject');

class Entity {
  constructor(tableName, columns) {
    this.tableName = tableName;
    this.columns = columns;
  }

  async find(condition = true) {
    if (!isObject(condition) && condition !== true)
      throw new Error(
        'Invalid input: condition must be object or undefined and cannot be null'
      );

    if (typeof condition !== 'boolean')
      condition = this._generateColumnValuePairs(condition, sql` AND `);

    const res = await pool.query(
      sql`SELECT * FROM ${sql.identifier([this.tableName])} WHERE ${condition}`
    );
    return res.rows;
  }

  async findOne(condition) {
    if (!isObject(condition))
      throw new Error(
        'Invalid input: condition must be object and cannot be null'
      );
    const res = await this.find(condition);
    return res[0] ? res[0] : null;
  }

  async add(records) {
    if (!Array.isArray(records))
      throw new Error('Invalid input: must be an array of records');

    const columns = this._generateColumns();
    const values = this._generateValues(records);

    const res = await pool.query(
      sql`INSERT INTO ${sql.identifier([
        this.tableName
      ])} ${columns} VALUES ${values} RETURNING *`
    );

    return res.rows;
  }

  async addOne(record) {
    if (!isObject(condition))
      throw new Error(
        'Invalid input: condition must be object and cannot be null'
      );
    const res = await this.add([record]);
    return res[0] ? res[0] : null;
  }

  async update(data, condition = true) {
    if (!isObject(data)) throw new Error('Invalid input: data must be object');
    if (!isObject(condition) && condition !== true)
      throw new Error(
        'Invalid input: condition must be object or undefined and cannot be null'
      );

    if (typeof condition !== 'boolean')
      condition = this._generateColumnValuePairs(condition, sql` AND `);

    const updates = this._generateColumnValuePairs(data, sql`, `);

    const res = await pool.query(
      sql`UPDATE ${sql.identifier([
        this.tableName
      ])} SET ${updates} WHERE ${condition} RETURNING *`
    );

    console.log(res.rows);
    return res.rows;
  }

  async updateOne(data, condition) {
    if (!isObject(data)) throw new Error('Invalid input: data must be object');
    if (!isObject(condition))
      throw new Error(
        'Invalid input: condition must be object and cannot be null'
      );
    const res = await this.update(data, condition);
    return res[0] ? res[0] : null;
  }

  async delete(condition = true) {
    if (!isObject(condition) && condition !== true) {
      throw new Error(
        'Invalid input: condition must be object or undefined and cannot be null'
      );
    }
    if (typeof condition !== 'boolean') {
      condition = this._generateColumnValuePairs(condition, sql` AND `);
    }
    const res = await pool.query(
      sql`DELETE FROM ${sql.identifier([
        this.tableName
      ])} WHERE ${condition} RETURNING *`
    );

    return res.rows;
  }

  async deleteOne(condition) {
    if (!isObject(condition))
      throw new Error(
        'Invalid input: condition must be object and cannot be null'
      );
    const res = await this.delete(condition);
    return res[0] ? res[0] : null;
  }

  _generateColumnValuePairs(obj, glue) {
    const sqlArray = Object.keys(obj).map(
      col => sql`${sql.identifier([col])} = ${obj[col]}`
    );

    return sql.join(sqlArray, glue);
  }

  _generateColumns() {
    return sql`(${sql.join(
      this.columns.map(col => sql.identifier([col])),
      sql`, `
    )})`;
  }

  _generateValues(records) {
    const sqlArray = records.map(
      record =>
        sql`(${sql.join(
          this.columns.map(col => {
            if (!record[col]) {
              return sql`DEFAULT`;
            }
            return record[col];
          }),
          sql`, `
        )})`
    );
    return sql.join(sqlArray, sql`, `);
  }
}

module.exports = Entity;
