!function(e){var n={};function r(o){if(n[o])return n[o].exports;var t=n[o]={i:o,l:!1,exports:{}};return e[o].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=e,r.c=n,r.d=function(e,n,o){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)r.d(o,t,function(n){return e[n]}.bind(null,t));return o},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=7)}([function(e,n){e.exports=require("mongoose")},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("morgan")},function(e,n){e.exports=require("dotenv")},function(e,n){e.exports=require("cors")},function(e,n,r){"use strict";r.r(n);var o=r(2),t=r(0),s=r.n(t),u=r(1),c=r.n(u),i=r(3),a=r.n(i),d=r(4),f=r.n(d),l=r(5),p=r.n(l),b=r(6),v=r.n(b),g=new s.a.Schema({id:Number,message:String},{timestamps:!0}),m=s.a.model("Data",g),j=function(e,n){m.find(function(e,r){return e?n.json({success:!1,error:e}):n.json({success:!0,data:r})})},y=function(e,n){var r=e.body,o=r.id,t=r.update;m.findOneAndUpdate({id:o},{$set:t},function(e){return e?n.json({success:!1,error:e}):n.json({success:!0})})},x=function(e,n){var r=e.body.id;m.findOneAndDelete({id:r},function(e){return e?n.send(e):n.json({success:!0})})},O=function(e,n){var r=new m,o=e.body,t=o.id,s=o.message;if(!t&&0!==t||!s)return n.json({success:!1,error:"INVALID INPUTS"});r.message=s,r.id=t,r.save(function(e){return e?n.json({success:!1,error:e}):n.json({success:!0})})},P=function(e){e.get("/getData",j),e.post("/updateData",y),e.delete("/deleteData",x),e.post("/putData",O)},D=function(e){P(e)};p.a.config();var S=c()(),T=c.a.Router(),_=o.resolve("./client/build");S.use(v()()),S.use(c.a.static(_)),s.a.connect(process.env.DB_ROUTE,{useNewUrlParser:!0});var q=s.a.connection;q.once("open",function(){return console.log("connected to db")}),q.on("error",console.error.bind(console,"MongoDB connection error:")),S.use(a.a.urlencoded({extended:!1})),S.use(a.a.json()),S.use(f()("combined")),D(T),S.use("/api",T),S.get("*",function(e,n){n.sendFile(o.join(_,"index.html"))}),S.listen(process.env.PORT||process.env.API_PORT,function(){return console.log("LISTENING ON PORT ".concat(process.env.API_PORT))})}]);