import app from './app.js';
import './setup.js';

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT)
});