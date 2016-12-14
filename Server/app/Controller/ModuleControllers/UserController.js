/**
 * Created by User on 9/18/2016.
 * Developer :- Kasun
 */
var Module = require('../../models/Models');
var User = Module.User;
var UserRole = Module.UserRole;
var Lecturer = Module.Lecturer;
var Hod = Module.Hod;
var Student = Module.Student;

function UserController() {
    
    /*
     * get all the user types without filtering
     * @params
     * res = response of middleware express
     */
    this.get = function(res) {

        User.findAll({
            where: {
                status: 1
            },
            include: [{
                model: UserRole
            }]
        }).then(function(data) {

                res.send(data);
            });

    };

    /*
     *insert new user
     * @params
     * UserRoleInstance = Instance provided by the client
     * res = response of middleware express
     */
    this.create = function(UserInstance, res) {

        var type = UserInstance[0].type;
        var password = UserInstance[0].password;
        var username =  UserInstance[0].user_name;
        var fullname = UserInstance[0].full_name;
        var email = UserInstance[0].email;
        UserRole.findOne( {
                where: { userRoleName: type}
            }
        ).then(function(usertype) {
                User.create( {
                        userPassword: password,
                        userUserName: username,
                        userFullname: fullname,
                        userEmail: email,
                        status: 1,
                        userRoleId : usertype.id
                    }
                ).then(function(user_data) {

                        var user_id = user_data.dataValues.id ;

                        if (type == 'Student'){

                            Student.create(
                                {
                                    status:1,
                                    UserId : user_id

                                }
                            ).then(function(data) {
                                    res.send(user_data);
                                });

                        }else if(type == 'Lecturer'){

                            Lecturer.create(
                                {
                                    status:1,
                                    UserId : user_id

                                }
                            ).then(function(data) {
                                res.send(user_data);
                            });

                        }else if(type == 'HOD'){
                            var departmentId = UserInstance[1].DepartmentId;
                            Hod.create(
                                {
                                    status:1,
                                    UserId : user_id,
                                    DepartmentId: departmentId
                                }
                            ).then(function(data) {
                                res.send(user_data);
                            });
                        }

                    });
            });
    };

}

module.exports = new UserController();