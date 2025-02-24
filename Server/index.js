import express from "express";
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const app = express();
const port = 3000;
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from React frontend
  }));
app.use(express.json());

app.get("/questions", async(req,res)=>{
    try {
        const { data, error } = await supabase
          .from('questions')
          .select('*');
    
        if (error) {
          throw error;
        }
        res.json(data);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });