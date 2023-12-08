import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT: number = Number(process.env.API_PORT);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
