'use strict';

var app =angular.module('myApp', []);

app.controller('mainCtrl', function($scope) {
    $scope.transactions = [];
    $scope.balance = 0;
    $scope.totalDebits = 0;
    $scope.totalCredits = 0;
    $scope.sortOrder='';
    $scope.delIndex;
    $scope.editIndex;
    $scope.edit = false;
    $scope.addCredit = function() {
        $scope.transactions.push($scope.account);
        $scope.balance +=  $scope.account.credit;
        $scope.totalCredits += $scope.account.credit;
        $scope.account = {};
        
    };
    
    $scope.addDebit = function() {
        $scope.transactions.push($scope.account);
        $scope.balance -= $scope.account.debit;
        $scope.totalDebits += $scope.account.debit;
        $scope.account = {};
    };
    
    $scope.deleteTransaction = function(transToDelete) {
        var ind =$scope.transactions.indexOf(transToDelete);
       // console.log($scope.transactions);
        if (transToDelete.debit != undefined) {
            $scope.balance += transToDelete.debit;
            $scope.totalDebits -= transToDelete.debit;
        }
        else {
            $scope.balance -= transToDelete.credit;
            $scope.totalCredits -= transToDelete.credit;
        }

        $scope.delIndex = transToDelete;
        $scope.transactions.splice(ind,1);

    };
    $scope.editTransaction = function(transToEdit){
        $scope.edit = true;
        var ind =$scope.transactions.indexOf(transToEdit);
        $scope.editIndex = ind;
     //   console.log(transToEdit);
        $scope.account = {};
        $scope.account.editTransDate = transToEdit.transDate;
        $scope.account.editDescription = transToEdit.description;
        $scope.account.editCredit =transToEdit.credit;
        $scope.account.editDebit= transToEdit.debit;
        $scope.account.editMemo= transToEdit.memo;
        $scope.confirmEdit = function() {
          //  console.log(ind);
            //$scope.account = {};
            //console.log(transToEdit);
            if ($scope.account.editDebit != undefined) {
                $scope.balance += transToEdit.debit;
                $scope.totalDebits -= transToEdit.debit;
            }
            else {
                $scope.balance -= transToEdit.credit;
                $scope.totalCredits -= transToEdit.credit;
            }
            $scope.account.transDate =$scope.account.editTransDate;
            $scope.account.description = $scope.account.editDescription;
            $scope.account.credit =$scope.account.editCredit;
            $scope.account.debit =$scope.account.editDebit;
            $scope.account.memo =  $scope.account.editMemo;
            if ($scope.account.debit != undefined) {
                $scope.balance -= $scope.account.debit;
                $scope.totalDebits += $scope.account.debit;
            }
            else {
                $scope.balance += $scope.account.credit;
                $scope.totalCredits += $scope.account.credit;
            }

            //$scope.delIndex = transToDelete;
            $scope.transactions.splice(ind,1,$scope.account);
            $scope.account={};
            $scope.edit = false;
           // console.log($scope.transactions);
        }

      
    };
    $scope.sortBy= function(sort){
        $scope.sortOrder=sort;
    };
    $scope.filterDebits = function () {
        $scope.both = false;
    }
});
    
