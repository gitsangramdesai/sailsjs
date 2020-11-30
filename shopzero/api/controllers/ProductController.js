/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var uuid = require('node-uuid');



module.exports = {
    create:async function (req, res,next) {
        req.file('image').upload({dirname: require('path').resolve(sails.config.appPath, 'assets/images')},async function (err, files) {
            if (err){
              return res.serverError(err);
            } else {
              var Product = sails.models.product
              var pr = {
                name:req.body.name,
                displayName:req.body.displayName,
                image:files[0].filename,
                code:uuid.v4()            
              }
              console.log("object",pr);
              var new_prod =await Product.create(pr).fetch();
              console.log("new_prod",new_prod);
              
              return res.ok({'product':new_prod});
            }
          });
    }, 

    update:async function (req, res,next) {
      req.file('image').upload({dirname: require('path').resolve(sails.config.appPath, 'assets/images')},async function (err, files) {
          if (err){
            return res.serverError(err);
          } else {
            var pr = {
              name:req.body.name,
              displayName:req.body.displayName,
              image:files[0].filename,
              code:req.param.id           
            }
            console.log("req.params.id",req.params);
            var up_prod = await Product.update({code: req.params.id},pr).fetch()
            return res.ok({'product':up_prod});
          }
        });
    },
    
    destroy:async function (req, res,next) {
      var id = req.params.id;
      var destroyedRecords = await Product.destroy({code:id}).fetch();
      return res.ok({'product':destroyedRecords});
    },  
    
    findOne:async function (req, res,next) {
      var id = req.params.id;
      var record = await Product.findOne({code:id});
      console.log("findOne")
      return res.ok({'product':record});
    },  

    uploadImage:function  (req, res) {
        req.file('image').upload({dirname: require('path').resolve(sails.config.appPath, 'assets/images')},function (err, files) {
          if (err)
            return res.serverError(err);
    
          return res.json({
            message: files.length + ' file(s) uploaded successfully!',
            files: files
          });
        });
    }

};

