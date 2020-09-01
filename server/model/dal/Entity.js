const { sql } = require('slonik');
const pool = require('../pool');

class Entity {
  constructor(tableName, columns) {
    this.tableName = tableName;
    this.columns = columns;
  }

  defaultQueryOptions = {
    page: 1,
    limit: 50,
    orderBy: ['createdAt']
  };

  async find(condition = true, queryOptions = this.defaultQueryOptions) {
    if (typeof condition !== 'boolean')
      condition = this._generateColumnValuePairs(condition, sql` AND `);
    const paginate = this._paginate(queryOptions.page, queryOptions.limit);
    const orderBy = this._orderBy(queryOptions.orderBy);

    const res = await pool.query(
      sql`SELECT * FROM ${sql.identifier([
        this.tableName
      ])} WHERE ${condition} ${orderBy} ${paginate}`
    );
    return res.rows;
  }

  async findByIds(ids, columnName) {
    const result = await pool.query(
      sql`SELECT * FROM ${sql.identifier([
        this.tableName
      ])} WHERE ${sql.identifier([columnName])} = ANY(${sql.array(
        ids,
        'uuid'
      )})`
    );
    return result.rows;
  }

  async findOne(condition) {
    const res = await this.find(condition);
    return res[0] ? res[0] : null;
  }

  async add(records) {
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
    const res = await this.add([record]);
    return res[0] ? res[0] : null;
  }

  async update(data, condition = true) {
    if (typeof condition !== 'boolean')
      condition = this._generateColumnValuePairs(condition, sql` AND `);

    const updates = this._generateColumnValuePairs(data, sql`, `);

    const res = await pool.query(
      sql`UPDATE ${sql.identifier([
        this.tableName
      ])} SET ${updates} WHERE ${condition} RETURNING *`
    );

    return res.rows;
  }

  async updateOne(data, condition) {
    const res = await this.update(data, condition);
    return res[0] ? res[0] : null;
  }

  async delete(condition = true) {
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

  async count(condition = true) {
    if (typeof condition !== 'boolean')
      condition = this._generateColumnValuePairs(condition, sql` AND `);

    const res = await pool.query(sql`
      SELECT COUNT(*) FROM ${sql.identifier([
        this.tableName
      ])} WHERE ${condition}
    `);

    return res.rows[0].count;
  }

  async deleteOne(condition) {
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

  _paginate(page, limit) {
    const offset = (page - 1) * limit;
    return sql`OFFSET ${offset} limit ${limit}`;
  }

  _orderBy(columnNames) {
    return sql`ORDER BY ${sql.join(
      columnNames.map(col => sql.identifier([col])),
      sql`, `
    )}`;
  }

  _distinct(columnNames) {
    return sql`DISTINCT ON (${sql.join(
      columnNames.map(col => sql.identifier([col])),
      sql`, `
    )})`;
  }
}

module.exports = Entity;
