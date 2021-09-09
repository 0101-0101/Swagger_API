const connect = require('../db/database')

exports.purchase = async (req, res) => {
    const { db } = await connect()
    const { coke, pepsi, dew, coin  } = await db.collection('vendor').find({}).next()
    const { Product, Pay } = req.body
    // console.log(Product, Pay)

    if (Pay < 20){
        return res.send({'Message':`Not enough Money to buy ${Product}`});
    }

    if (coke.stock ===0 || pepsi.stock ===0 || dew.stock === 0 ){
        return res.send({'Message':`${Product} is out of Stock`});
    }

    if (Product === 'coke'){
        const moneyChange = Pay - coke.price
        const val = {"Returned Money":`${moneyChange}` }
        const newCoin = coin + coke.price
        const newStock = coke.stock - 1

        await db.collection('vendor').updateOne({ coke }, { $set: { 'coke.stock' : newStock, 'coin': newCoin} })
        return res.json(val)
    }
    else if (Product ==='pepsi'){
        if ( Pay < 25){
            res.send({'Message': `Not enough Money to buy ${Product}`})
        }
        const moneyChange = Pay - pepsi.price
        const val = {"Returned Money":`${moneyChange}` }
        const newCoin = coin + pepsi.price
        const newStock = pepsi.stock - 1
        await db.collection('vendor').updateOne({ pepsi }, { $set: { 'pepsi.stock' : newStock, 'coin': newCoin} })
        return res.send(val)
    }
    else if (Product ==='dew'){
        if ( Pay < 30 ){
            res.send({'Message':`Not enough Money to buy ${Product}`});
        }
        const moneyChange = Pay - dew.price
        const val = {"Returned Money":`${moneyChange}` }
        const newCoin = coin + dew.price
        const newStock = dew.stock - 1
        await db.collection('vendor').updateOne({ dew }, { $set: { 'dew.stock' : newStock, 'coin': newCoin} })
        return res.send(val)
    }
    else{
        return res.send({"Message": "Please provide valid product"})
    }
}

exports.refund = async (req, res) => {
    const { db } = await connect()
    const { coke, pepsi, dew, coin  } = await db.collection('vendor').find({}).next()
    const { Product } = req.body

    if (Product === 'coke'){
        const newCoin = coin - coke.price
        const newStock = coke.stock + 1

        await db.collection('vendor').updateOne({ coke }, { $set: { 'coke.stock' : newStock, 'coin': newCoin} })
        return res.send({"Returned Money":`${coke.price}` })
    }
    else if (Product ==='pepsi'){
        const newCoin = coin - pepsi.price
        const newStock = pepsi.stock + 1

        await db.collection('vendor').updateOne({ pepsi }, { $set: { 'pepsi.stock' : newStock, 'coin': newCoin} })
        return res.send({"Returned Money":`${pepsi.price}` })
    }
    else if (Product ==='dew'){
        const newCoin = coin - dew.price
        const newStock = dew.stock + 1
        await db.collection('vendor').updateOne({ dew }, { $set: { 'dew.stock' : newStock, 'coin': newCoin} })
        return res.send({"Returned Money":`${dew.price}`})
    }
    else{
        return res.send({"Message": "Please provide valid product"})
    }

}