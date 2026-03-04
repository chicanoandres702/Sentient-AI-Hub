// Express API Server for Sentient Agent Hub
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const agentRoutes = require('./routes/agents');
app.use('/agents', agentRoutes);
app.get('/', (req, res) => res.send('Sentient Agent Hub API'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
