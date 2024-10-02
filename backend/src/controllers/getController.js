import { getIncomesService } from "../services/getServices.js"

export const getIncomeController = async (req, res, next) => {
    try {
        const { user } = req.data.payload
        const result = await getIncomesService(user)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
}