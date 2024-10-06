import { putIncomeService, putnewFuenteService, putOutcomeService } from "../services/putServices.js"

export const putNewFuenteController = async (req, res, next) => {
    const { user } = req.data.payload
    const { id, nombre, descripcion } = req.body
    try {
        const result = await putnewFuenteService(id, user, nombre, descripcion)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error:error.message  })
    }
}

export const putIncomeController = async (req, res, next) => {
    const { user } = req.data.payload
    const { id, monto, fuente, metodo } = req.body
    try {
        const result = await putIncomeService(id, user, monto, fuente, metodo)
        res.status(200).send({ status: true, result })
    } catch (error) {
        res.status(500).send({ status: false, error:error.message  })
    }
}

export const putOutcomeController = async (req, res, next) => {
    const { user } = req.data.payload
    const { id, descripcion, monto, fuente, metodo } = req.body
    try {
        // console.log('Datos recibidos:', { id, user, descripcion, monto, fuente, metodo });
        const result = await putOutcomeService(id, user, descripcion, monto, fuente, metodo)
        res.status(200).send({ status: true, result })
    } catch (error) {       
        res.status(500).send({ status: false, error:error.message })
    }
}