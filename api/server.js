import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/questions", async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: "A pergunta não pode estar vazia." });
        }

        const docRef = await db.collection("questions").add({
            question,
            answer: [],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).json({ id: docRef.id, question });
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});

app.get('/search-questions', async (req, res) => {
    try {
        const questionsSnapshot = await db.collection('questions').orderBy('createdAt', 'desc').get();
        
        // if (questionsSnapshot.empty) {
        //     return res.status(404).json({ message: 'Nenhuma pergunta encontrada.' });
        // }
    
        const questions = questionsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(), // conteúdo da question
        }));
    
        res.status(200).json(questions); // retorna as questions se tiver success
    } catch (error) {
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

app.post("/questions/:id/answers", async (req, res) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;

        if (!answer) {
            return res.status(400).json({ error: "A resposta não pode estar vazia." });W
        }

        const questionRef = db.collection("questions").doc(id);
        const questionSnapshot = await questionRef.get();

        if (!questionSnapshot.exists) {
            return res.status(404).json({ error: "Pergunta não encontrada." }); // caso excluir e nao atualizar a pag
        }

        await questionRef.update({
            answer: admin.firestore.FieldValue.arrayUnion(answer), // att answer com nova string
        });

        res.status(200).json({ message: "Resposta adicionada com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});