import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import usersRouter from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
// console.log(process.env)

app.use('/api/v1/users/', usersRouter)

// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working Successfully!!')
//   throw new Error('Custom Error')
//   // next('Customm Errorrr') // Error
// })

// global error handler
app.use(globalErrorHandler)

export default app
