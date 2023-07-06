const pool = require("../queries")

exports.create = async (req, res) => {
  try {
    
    const {  items, user_id } = req.body;
    console.log(user_id)
    const { rows } = await pool.query(`INSERT INTO Orders(user_id, total_amount, status) 
    VALUES($1, 0, 'Pending') RETURNING *`, [user_id]);
    const order = rows[0];
    let totalAmount = 0;
    for (const item of items) {
      const product = (await pool.query(`SELECT * FROM product WHERE product_id = $1`, [item.productId])).rows[0];
      if (!product) {
        throw new Error('Product not found');
      }
      totalAmount += product.price * item.quantity;
      await pool.query(`INSERT INTO Order_Items(order_id, product_id, quantity, price) 
      VALUES($1, $2, $3, $4) RETURNING *`, [order.order_id, product.product_id, item.quantity, product.price]);
    }
  
    const updatedOrder = (await pool.query(`UPDATE Orders SET  total_amount = $1 WHERE order_id = $2 RETURNING *`, [totalAmount, order.order_id])).rows[0];
 
    res.status(201).json(updatedOrder);
  } catch (e) {
    
    res.status(500).json({ error: e.message });
  }
};

exports.get = async (req, res) => {
  try {
    const prod = await pool.query("SELECT * FROM orders")
    return res.status(200).json(prod.rows);

} catch (error) {
res.status(500).json(error.message)
}
};

exports.edit = async (req, res) => {
  try {
    const {order_id} = req.params;
    const { status } = req.body; // assuming you're only updating the status here
    console.log(status)
    const orderQuery = `UPDATE Orders SET status = $1 WHERE order_id = $2 RETURNING *`;
    const { rows } = await pool.query(orderQuery, [status, order_id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json({"Successfully edited" :rows[0]});
  } 
  catch (e) {
    res.status(500).json({ error: e.message });

};
}

exports.del = async (req, res) => {
  try {
    const { order_id } = req.params;
    const deleteOrderItemsQuery = `DELETE FROM Order_Items WHERE order_id = $1`;
    await pool.query(deleteOrderItemsQuery, [orderId]);
    const deleteOrderQuery = `DELETE FROM Orders WHERE order_id = $1`;
    const { rowCount } = await pool.query(deleteOrderQuery, [order_id]);
    if (rowCount === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.status(204).json({Success:"Order deleted"});
  } catch (e) {
    res.status(500).json({ error: e.message });
  } 
};
