const pool = require("../queries")

exports.create = async(req,res) => {
    const {product_name, product_description, price, quantity} = req.body;
    try {
        //create a new product
        const prod = await pool.query("INSERT INTO product (product_name, product_description, price, quantity) VALUES ($1,$2,$3,$4) RETURNING *", [product_name, product_description, price, quantity] )
        console.log("creating product")
        return res.status(200).json(prod.rows);

    } catch (error) {
        return res.status(500).json(error.message)
    }
}
exports.update = async (req, res) => {
    const { product_id } = req.params;
    const {  product_name, product_description, price, quantity } = req.body;
    console.log(product_description)
    try {
      // Update the product
      const updatedProduct = await pool.query(
        "UPDATE product SET product_name = $1, product_description = $2, price = $3, quantity = $4 WHERE product_id = $5 RETURNING *",
        [product_name, product_description, price, quantity, product_id]
      );
      console.log("Updating product");
      return res.status(200).json(updatedProduct.rows[0]);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
  
  exports.del = async (req, res) => {
    // const { product_id } = req.body;
    const { product_id } = req.params;
    console.log(product_id)
    try {
      // Delete the product
      await pool.query("DELETE FROM product WHERE product_id = $1", [product_id]);
      console.log("Deleting product");
      return res.status(200).json({Success:"Product Deleted"});
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
exports.retrieve = async(req, res) => {
    const {product_id} = req.params;
        try {
            const prod = await pool.query("SELECT * FROM product where product_id = $1",[product_id])
            return res.status(200).json(prod.rows);

    } catch (error) {
        res.status(500).json(error.message)
    }
        
}