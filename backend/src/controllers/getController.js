import { getBalanceService, getFuentesService, getIncomesService, getOutcomesService, getUsernameService } from "../services/getServices.js"

export const getIncomeController = async (req, res, next) => {
    try {
        const { user } = req.data.payload
        const result = await getIncomesService(user)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
}

export const getOutcomesController = async (req, res, next) => {
    try {
        const { user } = req.data.payload
        const result = await getOutcomesService(user)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
}

export const getBalanceController = async (req, res, next) => {
    try {
        const { user } = req.data.payload
        const result = await getBalanceService(user)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
}

export const getUsernameController = async (req, res, next) => {
    try {
        const { user, pass } = req.data.payload
        const result = await getUsernameService(user, pass)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
}

export const getFuenteController = async (req, res, next) => {
    try {
        const { user } = req.data.payload
        const result = await getFuentesService(user)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
}