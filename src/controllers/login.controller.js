const { error } = require("console");
const pool = require("../db");

const getAllUser = async (req, res, next) => {
  try {
    const allUser = await pool.query("SELECT * FROM userpro");
    res.json(allUser.rows);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM userpro WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "user not found",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { usuario, password } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO userpro (usuario , password ) VALUES ($1, $2) RETURNING *",
      [usuario, password]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM userpro WHERE id = $1", [id]);
    if (result.rowCount === 0)
    {
      return res.status(404).send({
        message: "User not found",
      });
    }
    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
   next(error);
  }
};

const updateUser = async(req,res,next)=>{
  try {
    const {id} = req.params;
    const {user,password} = req.body;
    const result = await pool.query(
      "UPDATE userpro SET user = $1, password= $2 WHERE id = $3 RETURNING *",
      [user, password, id]
    )
    if(result.rows.length===0)
    return res.status(404).json({
    message:"usuario no encontrado"
    })
  } catch (error) {
    next(error)
  }


}

module.exports = {
  getAllUser,
  getUser,
  createUser,
  deleteUser,
  updateUser   
}