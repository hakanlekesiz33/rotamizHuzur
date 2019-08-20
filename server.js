const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server.get("/hakkimizda", (req, res) => {
      const actualPage = "/about";
      app.render(req, res, actualPage)
    })

<<<<<<< HEAD
    server.get("/products", (req, res) => {
      const actualPage = "/about";
=======
    server.get("/uruler", (req, res) => {
      const actualPage = "/uruler";
>>>>>>> 841549cb8f99e0e23a40dd0804c5853b06b054a6
      app.render(req, res, actualPage)
    })

    server.get("/iletisim", (req, res) => {
      const actualPage = "/contact";
      app.render(req, res, actualPage)
    })
    
    server.get('/:slug', (req, res) => {
      return app.render(req, res, '/blog', { slug: req.params.slug })
    })


    server.get('/kategoriler/:slug', (req, res) => {
      return app.render(req, res, '/blogs', { slug: req.params.slug })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })


    server.listen(3000,(err)=>{
      if(err) throw err
      console.log("ready on http://localhost:3000");
    })
  })
