const valToken = async (req, res) => {    
    res.status(200).send({ status: 200, message: "Token validado correctamente" });
}
export default valToken