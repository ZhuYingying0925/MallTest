var express = require('express');
var router = express.Router();

var mysql = require('mysql')
//创建连接池
var pool  = mysql.createPool({
	host : 'localhost',
	user : 'root',
	password : 'mysql',
	database : 'malltest'
})
router.get('/getinfo',function(req,res,next){
	var reqName = req.param('name');
	pool.getConnection(function(err,connection){
		connection.query(`select * from t_user where name = "${reqName}" `,function(error,results,fields){
			connection.release()//释放这个链接
			res.send(results)//返回结果
		})
	})
});
router.post('/getinfo',function(req,res,next){
	var reqName = req.param('name');
	pool.getConnection(function(err,connection){
		connection.query(`select * from t_user where name = "${reqName}" `,function(error,results,fields){
			connection.release()//释放这个链接
			res.send(results)//返回结果
		})
	})
});
router.post('/insert',function(req,res,next){
	var reqName = req.param('name');
	var reqPassword = req.param('password');
	var reqMobile = req.param('mobile');
	var reqEmail = req.param('email');
	var reqNicname = req.param('nickname');
	var reqAge = Number(req.param('age'));
	pool.getConnection(function(err,connection){			
		connection.query(`insert into t_user(name,password,mobile,email,nickname,age) values("${reqName}","${reqPassword}","${reqMobile}","${reqEmail}","${reqNicname}",${reqAge})`,function(error,results,fields){
			connection.release();
			res.send({results})
		})							
	})
});
router.get('/update',function(req,res,next){
	var reqId = Number(req.param('id'));
	var reqName = req.param('name');
	var reqPassword = req.param('password');
	var reqMobile = req.param('mobile');
	var reqNikname = req.param('nickname');
	var reqAge = Number(req.param('age'));
	pool.getConnection(function(err,connection){			
		connection.query(`update t_user set name="${reqName}",password="${reqPassword}",mobile="${reqMobile}",nickname="${reqNikname}",age=${reqAge}) where id=${reqId} `,function(error,results,fields){
			connection.release();
			res.send(results)
		})							
	})
});
router.post('/update',function(req,res,next){
	var reqId = Number(req.param('id'));
	var reqName = req.param('name');
	var reqPassword = req.param('password');
	var reqMobile = req.param('mobile');
	var reqNikname = req.param('nickname');
	var reqAge = Number(req.param('age'));
	pool.getConnection(function(err,connection){	
	if(err){
		console.log(err)
	}		
	var str = `update t_user set name="${reqName}",password="${reqPassword}",mobile="${reqMobile}",nickname="${reqNikname}",age=${reqAge} where id=${reqId}`
	console.log(str)
		connection.query(str,function(error,results,fields){
			connection.release();
			res.send(results)
		})							
	})
});
router.get('/show',function(req,res,next){
	pool.getConnection(function(err,connection){
		connection.query('select * from t_commodity',function(error,results,fields){
			connection.release()//释放这个链接
			res.send(results)//返回结果
		})
	})
});
router.post('/showCollection',function(req,res,next){
	var reqName = req.param('name')
	var comid=[];
	var result = [];
	var collection=[];
	var str1 =`select comid from t_collection where username = "${reqName}"`
	pool.getConnection(function(err,connection){
		connection.query(str1,function(error,results,fields){
			for(var i of results){
				comid.push(i.comid)
			}
			// res.send(comid)
		})
		connection.query(`select * from t_commodity`,function(error,results,fields){	
			result=results
			// res.send(result)
			for(var i of comid){
				for(var j of result){
					if(i==j.id){
						collection.push(j)
					}
				}
			}	
			res.send(collection)	
		})	
		connection.release()
	})
});
router.post('/getCollection',function(req,res,next){
	var reqName = req.param('name');
	var reqId = Number(req.param('id'));
	var str = `select * from t_collection where username="${reqName}" AND comid=${reqId}`
	pool.getConnection(function(err,connection){	
	if(err){
		console.log(err)
	}		
		connection.query(str,function(error,results,fields){
			connection.release();
			res.send(results)
		})							
	})
});
router.post('/insertCollection',function(req,res,next){
	var reqName = req.param('name');
	var reqId = Number(req.param('id'));
	pool.getConnection(function(err,connection){			
		connection.query(`insert into t_collection(username,comid) values("${reqName}",${reqId})`,function(error,results,fields){
			connection.release();
			res.send({results})
		})							
	})
});
router.post('/showOrder',function(req,res,next){
	var reqName = req.param('name');
	// var order = [];
	// var comid = [];
	// var number = [];
	// var result=[];
	var str1 =`select * from t_order where username = "${reqName}"`
	pool.getConnection(function(err,connection){
		connection.query(str1,function(error,results,fields){
			res.send(results)
			// for(var i of results){
			// 	comid.push(i.comid)
			// }
			// res.send(comid)	
		})
		// for(var i of order){
		// 	comid.push(i.comid);
		// 	number.push(i.number)
		// }
		// res.send({comid,number})	
		// res.send(comid)
		// connection.query(`select * from t_commodity`,function(error,results,fields){	
		// 	// result=results
		// 	// res.send(result)
		// 	for(var i of order){
		// 		for(var j of results){
		// 			if(i.comid==j.id){
		// 				i.comid=j;
		// 			}
		// 		}
		// 	}	
		// 	res.send(order)	
		// })	
		connection.release()
	})
});
router.post('/insertOrder',function(req,res,next){
	var reqName = req.param('name');
	var reqComid = Number(req.param('comid'));
	var reqNumber = Number(req.param('number'));
	var reqTitle = Number(req.param('title'));
	var str = `insert into t_order(username,comid,number,title) values("${reqName}",${reqComid},${reqNumber},"${reqTitle}")`
	pool.getConnection(function(err,connection){			
		connection.query(str,function(error,results,fields){
			connection.release();
			res.send({results})
		})							
	})
});
router.post('/getdetail',function(req,res,next){
	var reqId = Number(req.param('id'));
	pool.getConnection(function(err,connection){
		connection.query(`select * from t_commodity where id = ${reqId} `,function(error,results,fields){
			connection.release()//释放这个链接
			res.send(results)//返回结果
		})
	})
});


module.exports = router;