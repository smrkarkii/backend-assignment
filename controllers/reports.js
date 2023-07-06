const pool = require("../queries")

exports.dailySales = async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT date_trunc('day', order_date) AS day, SUM(total_amount) as total_sales
            FROM Orders
            GROUP BY day
            ORDER BY day;
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}
exports.topSellingProducts = async (req, res) => {
    try {
        const { rows } = await pool.query(`
        SELECT p.product_name, p.product_id, SUM(oi.quantity) as total_sold
        FROM Order_Items oi
        JOIN product p ON oi.product_id = p.product_id
        GROUP BY p.product_id, p.product_name
        ORDER BY total_sold DESC;
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
