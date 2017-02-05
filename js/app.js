var myApp=angular.module('myApp', ['firebase', 'ngclipboard', 'ngMaterial', 'ngMessages', 'ui.bootstrap']);

myApp.controller('DiagnosticCtrl', ['$scope', '$firebaseArray', '$mdDialog', function($scope, $firebaseArray, $mdDialog){

	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyDZII-vyp4I-qLy68agxMJYW7EeiHfKD9c",
	authDomain: "diagnosticos-c6b78.firebaseapp.com",
	databaseURL: "https://diagnosticos-c6b78.firebaseio.com",
	storageBucket: "diagnosticos-c6b78.appspot.com",
	messagingSenderId: "408493499320"
	};

	$scope.pageSize= 5;
	$scope.currentPage= 1;

	firebase.initializeApp(config);
	
	var myDiagnostic = firebase.database().ref();

	$scope.diagnosticos = $firebaseArray(myDiagnostic);

	// Show form function
	$scope.showForm=function () {
		$scope.addFormShow=true;
		$scope.editFormShow=false;
		clearForm();
	}

	// Hide form function
	$scope.hideForm = function(){
		$scope.addFormShow=false;
	}

	//Clear Form
	function clearForm(){
		$scope.DiagnosticName='';
		$scope.DiagnosticDescription='';
	}

	// Add Form Submit function
	$scope.addFormSubmit=function(){
		$scope.diagnosticos.$add({
			DiagnosticName:$scope.DiagnosticName,
			DiagnosticDescription:$scope.DiagnosticDescription
		});
		clearForm();
	}

	// Show Diagnostic function
	$scope.showDiagnostic=function(diagnostico){
		$scope.editFormShow=true;
		$scope.addFormShow=false;
		$scope.DiagnosticName=diagnostico.DiagnosticName;
		$scope.DiagnosticDescription=diagnostico.DiagnosticDescription;
		$scope.id=diagnostico.$id;
	}

	// Edit form Function
	$scope.editFormSubmit= function(){
		var id =$scope.id;
		var record =$scope.diagnosticos.$getRecord(id);
		record.DiagnosticName = $scope.DiagnosticName;
		record.DiagnosticDescription = $scope.DiagnosticDescription;
		$scope.diagnosticos.$save(record);
		clearForm();
	}

	// Delete Diagnostic Function with Confirm Dialog
	$scope.deleteDiagnostic = function(diagnostico){
		var confirm = $mdDialog.confirm()
          .title('Would you like to delete this Diagnostic?')
          .textContent('The action cannot be undone.')
          .ariaLabel('Lucky day')
          .targetEvent(diagnostico)
          .ok('Ok, i got it')
          .cancel('NO');

        $mdDialog.show(confirm).then(function() {     
		$scope.diagnosticos.$remove(diagnostico)
    });

	}

	//Show Alert - Copy
	$scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Diagnostic Search')
        .textContent('Diagnostic copied to clipboard successfully')
        .ariaLabel('Alert Dialog Demo')
        .ok('Ok')
        .targetEvent(ev)
    );
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };	
	}

}]);

	myApp.filter('startFrom', function(){
			return function(data, start){
				return data.slice(start);			
			}
		});