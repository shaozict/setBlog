/*yangjiei
* 创建mongodb数据库集合
* 创建参数：{ setName:"集合名称",setType："集合文档对象属性"}
* 仅提供最基础存储、读取接口
* */


var mongodb = require('./db');
function Sets(obj) {    //创建集合
    if(obj){
        this.setName = obj.setName;
        this.setType = obj.type||null;   //默认"id",指定为集合对象索引项
    }
};
module.exports = Sets;
Sets.prototype.save = function save(doc,callback) {
    var setName = this.setName;
// 存入 Mongodb 的文档
    var doc = doc||null;
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
// 打开users 集合
        db.collection(setName, function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
// 为 name 属性添加索引
            collection.ensureIndex(doc['id'], {unique: true});   //name 为标记
// 写入 user 文档
            collection.insert(doc, {safe: true}, function (err, doc) {
                mongodb.close();
                callback(err, doc);
            });
        });
    });
};
Sets.prototype.get = function get(callback) {
    var setName = this.setName;
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
// 读取 users 集合
        db.collection(setName, function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.find().toArray(function(err,docs){
                mongodb.close();
                callback(err,docs);
            });

            //mongodb.close();
            //if (collection) {
            //    callback(err, collection);
            //} else {
            //    callback(err, null);
            //}
        });
    });
};