import ParisRequester from './ParisRequester';
const App = require('express')();

App.get('/', async (req:any, res: any) => {
    const address = await (new ParisRequester).getAddress(req.query.lat,req.query.lng);
    res.send((address));
})

App.listen(process.env.PORT, () => console.log("server is running on "+process.env.PORT));