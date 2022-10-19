var express =require('express');
const hbs=require('hbs');
var controller=require('./controller/controller');
var app= express();

//set up template engine
app.set('view engine','hbs')
app.use(express.static('./public'))
controller(app);
app.use(function(req,res,next){
	res.status(404).render('404');
});
//listen to port
const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log('server is listen to port:'+port)
})