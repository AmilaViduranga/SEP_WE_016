'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
.controller('UserTableCtrl',['$scope','$http','$rootScope','DTOptionsBuilder','DTColumnBuilder','$q',function ($scope,$http,$rootScope,DTOptionsBuilder, DTColumnBuilder,$q) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
        var getAllUser_api = 'http://localhost:8002/user-management/get-all-users';
        $scope.departments = [];

        //Set up table headers
        $scope.setTableHeaders = function(){
            $scope.authorized = true;
            $scope.dtColumns = [
                DTColumnBuilder.newColumn('id').withTitle('ID'),
                DTColumnBuilder.newColumn('userRole.userRoleName').withTitle('Role'),
                DTColumnBuilder.newColumn('userRole.userRoleName').withTitle('Department'),
                DTColumnBuilder.newColumn('userUserName').withTitle('User Name'),
                DTColumnBuilder.newColumn('userFullname').withTitle('Full Name'),
                DTColumnBuilder.newColumn('userEmail').withTitle('Email'),
                DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable()
                    .renderWith(function(data, type, full, meta) {
                        return '<button class="btn btn-warning" ng-click="edit(' + data.id + ')">' +
                            '   <i class="fa fa-edit"></i>' +
                            '</button>&nbsp;';
                    }),
                DTColumnBuilder.newColumn(null).withTitle('Delete').notSortable()
                    .renderWith(function(data, type, full, meta) {
                        return '<button class="btn btn-danger" ng-click="delete(' + data.id + ')">' +
                            '   <i class="fa fa-trash-o"></i>' +
                            '</button>';
                    })
            ];
            $scope.dtInstance = {};
        };

        //Load table for URL
        $scope.loadUserTypeTable = function(){
            $scope.dtOptions = DTOptionsBuilder
                .fromFnPromise(function() {
                    return $http.get(getAllUser_api).then(function(response){
                        return (response.data);
                    });
                })
                .withPaginationType('full_numbers')
                .withBootstrap();
        };

        $scope.setTableHeaders();
        $scope.loadUserTypeTable();

        $scope.reloadData = function() {
            $scope.dtInstance.changeData( $http.get(getAllUser_api).then(function(response){
                return (response.data);
            }));
        };

        $rootScope.$on("reloadUserTypeTable", function(){
            $scope.reloadData();
        });
}])
.controller('UserCtrl',['$http','$scope','$rootScope','departmentService',function ($http,$scope,$rootScope,departmentService ) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      var getAllUserRoles_api = 'http://localhost:8002/user-role/get-all-user-roles';

      //Loading the User type Select
      $scope.array = [];
      $scope.array.push({id: -1, name: "Please select a Role"});
      $http.get(getAllUserRoles_api)
          .then(function(response) {
            angular.forEach(response.data , function(element) {
              $scope.array.push({id: element.id, name: element.userRoleName });
            });
          });

      $scope.data = {
        availableOptions: $scope.array,
        selectedOption : $scope.array[0]
      };

      $scope.GetValue = function (type) {
        var selectedOption = $scope.data.selectedOption
        $scope.typeChangeHandler(selectedOption.name);
      };

      $scope.typeChangeHandler = function(selected_value){
        resetDataFields();
        $scope.student_type_style = {'display':'none'};
        $scope.lecturer_type_style = {'display':'none'};
        $scope.hod_type_style = {'display':'none'};

        if( selected_value == 'Student'){
          $scope.student_type_style = {'display':'block'};
        }else if(selected_value == 'Lecturer'){
          $scope.lecturer_type_style = {'display':'block'};
        }else if( selected_value == 'HOD'){
          $scope.hod_type_style = {'display':'block'};
        }else{
          $scope.student_type_style = {'display':'none'};
          $scope.lecturer_type_style = {'display':'none'};
          $scope.hod_type_style = {'display':'none'};
        }
      };

      //Submitting the User Form
      $scope.submitUserRoleForm = function(){

          var selected_type = $scope.data.selectedOption.name;
          $scope.submitData = [
              {
                  "full_name": $scope.full_name,
                  "user_name": $scope.user_name,
                  "password": $scope.password,
                  "email": $scope.email,
                  "type": selected_type

              }
          ];
          if( selected_type == 'Student' ){
            $scope.submitData.push(
                {"BatchId" : $scope.student_batch}
            );
          }else if(selected_type == 'Lecturer'){
            $scope.submitData.push(
            );
          }else if( selected_type == 'HOD'){
            $scope.submitData.push(
                {"DepartmentId" : $scope.hod_department}
            );
          }

          console.log($scope.submitData);
          $http.post('http://localhost:8002/user-management/add-new-user',$scope.submitData).then(
              (function(){
                      $scope.reloadUserTypeTable();
                  }
              )
          );
          $scope.submitData = '';
          angular.element('.modal').modal('hide');
          //$scope.userTypeForm.$setPristine();

      };

        function getAvailableDepartments() {
            return departmentService.getAllDepartments().then(function(departments) {
                $scope.departments = departments.data;
            })
        }

        getAvailableDepartments();

      function resetDataFields(){
        $scope.full_name = '';
        $scope.user_name = '';
        $scope.password = '';
        $scope.email = '';
        $scope.student_batch = '';
        $scope.hod_department = '';
      }
        $scope.reloadUserTypeTable = function() {
            $rootScope.$emit("reloadUserTypeTable", {});
        }

}]);
