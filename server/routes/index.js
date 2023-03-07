const router = require('express').Router();
const {Page, User, Tag} = require('../models');

router.get('/wiki', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(pages);
  } catch (error) {
    next(error);
  }
});

router.get('/wiki/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {slug: req.params.slug},
      include: [{model: User, as: 'author'}]
    });
    res.send(page);
  } catch (error) {
    next(error);
  }
});

router.post('/wiki', async (req, res, next) => {
  try {
    const {title, content, name, email, tags} = req.body;
    const [user, wasCreated] = await User.findOrCreate({
      where: {name, email}
    });
    const page = await Page.create({title, content, author
