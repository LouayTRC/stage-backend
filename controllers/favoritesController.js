const Favourites = require("../models/favorites")
const Product = require("../models/Product")
const Client = require("../models/Client")

exports.createPlaylist = async (req, res, next) => {
    const client = await Client.findOne({ user: req.auth.user_id });
    console.log("zz",client);
    const playList = new Favourites({
        list_name: req.body.name,
        Client:client,
        products: []
    });
    console.log("list",playList);
    playList.save()
        .then((liste) =>res.status(201).json({ liste }))
        .catch(error => res.status(400).json({ error }))
};

exports.addProduct = async (req, res, next) => {
    const playList = await Favourites.findOne({ _id: req.params.id })
    const product = await Product.findOne({ _id: req.body.idP })
    console.log('pp', product);
    playList.products.push(product);

    Favourites.updateOne({ _id: req.params.id }, { products: playList.products })
        .then(() => res.status(200).json({ message: 'update avec succes' }))
        .catch((error) => res.status(400).json({ error }))

};

exports.getPLaylists = async (req, res, next) => {
    if (req.params?.id) {
        Favourites.findOne({ _id: req.params.id })
            .then((playlist) => res.status(200).json({ playlist }))
            .catch((error) => res.status(400).json({ error }))
    } else {
        const client=await Client.findOne({user:req.auth.user_id})
        Favourites.find({Client:client._id})
            .then((playlists) => res.status(200).json(playlists ))
            .catch(error => res.status(400).json({ error }))
    }
};

exports.renamePlaylist = async (req, res, next) => {
    Favourites.updateOne({ _id: req.params.id }, { list_name: req.params.name })
        .then(() => res.status(200).json({ message: "update avec succes" }))
        .catch((error) => res.status(400).json({ error }))
}
exports.deletePlaylist = (req, res, next) => {
    Favourites.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'delete avec succes' }))
        .catch(error => res.status(400).json({ error }))
}

exports.deleteProduct = async (req, res, next) => {
    const playlist = await Favourites.findOne({ _id: req.params.id })
    playlist.products.splice(req.params.index, 1)
    Favourites.updateOne({ _id: req.params.id }, { products: playlist.products })
        .then(() => res.status(200).json({ message: "update avec succes" }))
        .catch((error) => res.status(400).json({ error }))
}

