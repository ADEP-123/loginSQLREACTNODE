import { postNewIncomeService, postNewOutcomeService, postNewUserService } from "../services/postServices.js"

export const postNewUserController = async (req, res, next) => {
    const { username, name, password } = req.body
    try {
        const result = await postNewUserService(username, name, password)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
}

export const postNewIncomeController = async (req, res, next) => {

    const { user } = req.data.payload
    const { monto, fuente, metodo } = req.body
    try {
        const result = await postNewIncomeService(user, monto, fuente, metodo)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
}

export const postNewOutcomeController = async (req, res, next) => {


    const { user } = req.data.payload
    const { descripcion, monto, fuente, metodo } = req.body
    try {
        const result = await postNewOutcomeService(user, descripcion, monto, fuente, metodo)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
}