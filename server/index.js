
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import materialRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', materialRoutes);

const CONNECTION_URL = 'mongodb+srv://cesiumAssignment:Cesium123@cluster0.ihkpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 8080;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);