const pool = require("../queries")

//for creating orders
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
      //if no product available of that id
      if (!product) {
        throw new Error('Product not found');
      }
      //calculating total amount of order
      totalAmount += product.price * item.quantity;
      //inserting into OrderItems table
      await pool.query(`INSERT INTO Order_Items(order_id, product_id, quantity, price) 
      VALUES($1, $2, $3, $4) RETURNING *`, [order.order_id, product.product_id, item.quantity, product.price]);
    }
  
    const updatedOrder = (await pool.query(`UPDATE Orders SET  total_amount = $1 WHERE order_id = $2 RETURNING *`, [totalAmount, order.order_id])).rows[0];
 
    res.status(201).json(updatedOrder);
  } catch (e) {
    
    res.status(500).json({ error: e.message });
  }
};
//to see the orders using order_id
exports.get = async (req, res) => {
  const order_id = req.params;
  try {
    const order = await pool.query("SELECT * FROM orders where order_id = $1",[order_id])
    return res.status(200).json(order.rows);

} catch (error) {
res.status(500).json(error.message)
}
};
//to update
exports.edit = async (req, res) => {
  try {
    const {order_id} = req.params;
    const { status, items } = req.body; 
    let totalAmount = 0;

    // For each item, update the quantity and calculate the total amount
    for (const item of items) {
      const product = (await pool.query(`SELECT * FROM product WHERE product_id = $1`, [item.productId])).rows[0];
      if (!product) {
        throw new Error('Product not found');
      }
      totalAmount += product.price * item.quantity;
      await pool.query(`UPDATE Order_Items SET quantity = $1, price = $2 WHERE order_id = $3 AND product_id = $4 RETURNING *`, [item.quantity, product.price, order_id, item.productId]);
    }

    // Now update the elements in order
    const orderQuery = `UPDATE Orders SET status = $1, total_amount = $2 WHERE order_id = $3 RETURNING *`;
    const { rows } = await pool.query(orderQuery, [status, totalAmount, order_id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.json({"Successfully edited" :rows[0]});
  } catch (e) {
    res.status(500).json({ error: e.message });
  };
}


exports.del = async (req, res) => {
  try {
    const { order_id } = req.params;
    console.log(order_id)
    //first delete from orderItems
    const deleteOrderItemsQuery = `DELETE FROM Order_Items WHERE order_id = $1`;
    await pool.query(deleteOrderItemsQuery, [order_id]);
    //delete from the orders table
    const deleteOrderQuery = `DELETE FROM Orders WHERE order_id = $1`;
    const { rowCount } = await pool.query(deleteOrderQuery, [order_id]);
    //rows effected = 0, means no order was found
    if (rowCount === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.status(200).json({Success:"Order deleted"});
  } catch (e) {
    res.status(500).json({ error: e.message });
  } 
};
