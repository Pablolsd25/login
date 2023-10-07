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
    const { usuario, password } = req.query;

    // Verifica que se proporcionaron credenciales
    if (!usuario || !password) {
      return res.status(400).json({
        message: "Debes proporcionar un nombre de usuario y una contraseña.",
      });
    }

    // Obtén el usuario de la base de datos
    const userResult = await pool.query(
      "SELECT * FROM userpro WHERE usuario = $1 AND password = $2",
      [usuario, password]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        message: "Credenciales incorrectas",
      });
    }

    const user = userResult.rows[0];

    // Devuelve los datos del usuario en la respuesta
    res.json(user);
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
const authenticateUser = async (req, res, next) => {
  try {
    const { usuario, password } = req.body;

    // Verifica que se proporcionaron credenciales
    if (!usuario || !password) {
      return res.status(400).json({
        message: 'Debes proporcionar un nombre de usuario y una contraseña.',
      });
    }

    // Obtén el usuario de la base de datos
    const userResult = await pool.query(
      'SELECT * FROM userpro WHERE usuario = $1 AND password = $2',
      [usuario, password]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        message: 'Credenciales incorrectas',
      });
    }

    const user = userResult.rows[0];

    // Devuelve los datos del usuario en la respuesta
    res.json(user);
  } catch (error) {
    next(error);
  }
};






module.exports = {
  getAllUser,
  getUser,
  createUser,
  deleteUser,
  authenticateUser,
  updateUser   
}