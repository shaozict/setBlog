var mongodb = require('./db');
function User(user) {
    if(user){
        this.name = user.name;
        this.text = user.text;
        this.email = user.email;
        this.date = user.date;
    }
};
module.exports = User;
User.prototype.save = function save(callback) {
// 存入 Mongodb 的文档
    var user = {
        name: this.name,
        text: this.text,
        email: this.email,
        date:this.date
    };
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
// 打开users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
// 为 name 属性添加索引
            collection.ensureIndex('name', {unique: true});   //name 为标记
// 写入 user 文档
            collection.insert(user, {safe: true}, function (err, user) {
                mongodb.close();
                callback(err, user);
            });
        });
    });
};
User.get = function get(callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
// 读取 users 集合
        db.collection('users', function (err, collection) {
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