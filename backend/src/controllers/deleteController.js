import { deleteFuenteService, deleteIncomeService } from "../services/deleteServices.js"

export const deleteFuenteController = async (req, res, next) => {
    const { user } = req.data.payload
    const { id } = req.body
    try {
        const result = deleteFuenteService(id, user)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
}

export const deleteIncomeController = async (req, res, next) => {
    const { user } = req.data.payload
    const { id } = req.body
    try {
        const result = deleteIncomeService(id, user)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
}