app.controller( 'bodyController', [ '$scope', '$http', '$modal', function( $scope, $http, $modal ) {

	$scope.data = {};
	$scope.imageData = {};

	$scope.getData = function() {

		$scope.getTextData();
		$scope.getImageData();

	}

	$scope.getImageData = function() {

		$http( { method: 'GET', url: '/img' } ).
			success( function(data, status, headers, config) {

				$scope.imageData = processImageData( data );

				console.log( $scope.imageData );

			} ).error( function( data, status, headers, config ) {

				console.log( "get data error : " + data + ", status : " + status );

				if( status == 401 ) {

					$scope.openLogin();

				}

			} );

	}	

	$scope.getTextData = function() {

		$http( { method: 'GET', url: '/data' } ).
			success( function(data, status, headers, config) {

				$scope.data = processData( data );
				$scope.refreshLogo();

			} ).error( function( data, status, headers, config ) {

				console.log( "get data error : " + data + ", status : " + status );

				if( status == 401 ) {

					// $scope.openLogin();

				}

			} );

	}

	$scope.updateTitle = function( type, value ) {

		return $http( { method: 'POST', url: '/update', data: { type: 'title', which: type, value: value } } ).
			success( function(data, status, headers, config) {

				console.log( "update title success, " + data + ", status : " + status );


			} ).error( function( data, status, headers, config ) {

				console.log( "update title error : " + data + ", status : " + status );

				if( status == 401 ) {

					$scope.openLogin();

				}

			} );

	}

	$scope.updateParagraph = function( value, which ) {

		// var data = value.split()

		// remove double enters
		$scope.superduperdata = value.split( "\n" );
		$scope.superduperwhich = which;

		// remove double enters...
		var counter = 0;
		var dataNorm = [];

		for( var i = 0; i < $scope.superduperdata.length; i++ ) {

			if( $scope.superduperdata[i] != "" ) {

				dataNorm[counter++] = $scope.superduperdata[i];

			}

		}

		return $http( { method: 'POST', url: '/update', data: { type: 'paragraph', which: which, value: JSON.stringify( dataNorm ) } } ).
			success( function(data, status, headers, config) {

				console.log( "update paragraph success, " + data + ", status : " + status );

				$scope.data[ $scope.superduperwhich ].paragraph = $scope.superduperdata;


			} ).error( function( data, status, headers, config ) {

				console.log( "update paragrah error : " + data + ", status : " + status );

				if( status == 401 ) {

					$scope.openLogin();

				}

			} );

		

	}

	$scope.updateLogoBrightness = function( value ) {

		return $http( { method: 'POST', url: '/update', data: { type: 'logobrightness', value: value } } ).
			success( function(data, status, headers, config) {

				console.log( "update logobrightness success, " + data + ", status : " + status );

				$scope.data.logobrightness = parseInt( data );
				$scope.refreshLogo();


			} ).error( function( data, status, headers, config ) {

				console.log( "update logobrightness error : " + data + ", status : " + status );

				if( status == 401 ) {

					$scope.openLogin();

				}

			} );

	}

	$scope.refreshLogo = function() {

		document.getElementById("logo").src = "images/logo-" + $scope.data.logobrightness + ".png?decache=" + Math.floor((Math.random() * 100) + 1);

	}

	$scope.uploadFile = function( files, type ) {

		if( files == null ) {
			console.log( "files == null" );
			return
		} 

		var fd = new FormData();
		fd.append( "file", files[0] );
		fd.append( "type", type );

		if( type == "header" ) {
			document.getElementById( 'headerBackground' ).style.backgroundImage = 'none';
		} else if( type == "headerone" ) {
			document.getElementById( 'headerOne' ).style.visibility = 'hidden';
		} else if( type == "headertwo" ) {
			document.getElementById( 'headerTwo' ).style.visibility = 'hidden';
		}

		$http.post( "/upload", fd, {
			withCredentials: true,
        	headers: {'Content-Type': undefined },
        	transformRequest: angular.identity
		} ).success( function(data) {
			console.log(data);

			if( type == "header" ) {
				document.getElementById( 'headerBackground' ).style.backgroundImage = "url('../images/jumbo-bg.jpg?decache=" + Math.floor((Math.random() * 100) + 1) + "')";
			} else if( type == "headerone" ) {
				document.getElementById( 'headerOne' ).src = "images/title-header-one.jpg?decache=" + Math.floor((Math.random() * 100) + 1);
				document.getElementById( 'headerOne' ).style.visibility = 'visible';
			} else if( type == "headertwo" ) {
				document.getElementById( 'headerTwo' ).src = "images/title-header-two.jpg?decache=" + Math.floor((Math.random() * 100) + 1);
				document.getElementById( 'headerTwo' ).style.visibility = 'visible';
			}

		} ).error( function(data, status, headers, config) {

			if( status == 401 ) {

				$scope.openLogin();

			}

			console.log( data );

			if( type == "header" ) {
				document.getElementById( 'headerBackground' ).style.backgroundImage = "url('../images/jumbo-bg.jpg?decache=" + Math.floor((Math.random() * 100) + 1) + "')";
			} else if( type == "headerone" ) {
				document.getElementById( 'headerOne' ).src = "images/title-header-one.jpg?decache=" + Math.floor((Math.random() * 100) + 1);
				document.getElementById( 'headerOne' ).style.visibility = 'visible';
			} else if( type == "headertwo" ) {
				document.getElementById( 'headerTwo' ).src = "images/title-header-two.jpg?decache=" + Math.floor((Math.random() * 100) + 1);
				document.getElementById( 'headerTwo' ).style.visibility = 'visible';
			}

		} );

	}

	$scope.openNewImage = function( which ) {

		var modalInstance = $modal.open({
			templateUrl: 'templates/newimage.html',
			controller: 'newImageController',
			resolve: {
				which: function() {
					return which;
				},
				getData: function() {
					return $scope.getImageData;
				},
				openLogin: function() {
					return $scope.openLogin;
				}
			}
		});

	}

	$scope.openRemoveImage = function( name, which ) {

		$modal.open({
			templateUrl: 'templates/removeimage.html',
			controller: 'removeImageController',
			resolve: {
				which: function() {
					return which;
				},
				name: function() {
					return name;
				},
				getData: function() {
					return $scope.getImageData;
				},
				openLogin: function() {
					return $scope.openLogin;
				}
			}
		});

	}

	$scope.openEditImage = function( name, which, text, x, y, w, h ) {

		$modal.open( {
			templateUrl: 'templates/newimage.html',
			controller: 'editImageController',
			resolve: {
				which: function() {
					return which;
				},
				name: function() {
					return name;
				},
				text: function() {
					return text;
				},
				x: function() {
					return x;
				},
				y: function() {
					return y;
				},
				w: function() {
					return w;
				},
				h: function() {
					return h;
				},
				getData: function() {
					return $scope.getImageData;
				},
				openLogin: function() {
					return $scope.openLogin;
				}
			}
		} );

	}

	$scope.openLogin = function() {

		$modal.open( {
			templateUrl: 'templates/login.html',
			controller: 'loginController',
			resolve: {
				getData: function() {
					return $scope.getData;
				}
			},
			backdrop: 'static',
			keyboard: false
		} );

	}

	$scope.showThumb = function(name, type) {

		var full = document.getElementById("fullscreenImage");

		var image = new Image();
		image.src = "pics/" + type + "/" + name + "/image.jpg";
		image.id = "fullscreenPicture";

		full.appendChild( image )
		full.style.display = 'inline';

	}

	$scope.hideThumb = function() {

		var image = document.getElementById("fullscreenPicture");

		var full = document.getElementById("fullscreenImage");
		full.style.display = 'none';
		full.removeChild( image )

	}

	$scope.openSettings = function() {

		$modal.open( {
				'templateUrl': '/templates/settings.html',
				'controller': settingsModalInstanceController,
				resolve: {
					load: function() {
						return $scope.getData;
					}
				},
			});

	}

	var settingsModalInstanceController = function( $scope, $modalInstance, $http, $timeout, load ) {

		$scope.person = { username:'', password:'', check:'' };
		$scope.fieldsEnabled = false;
		$scope.mywarning = "";
		$scope.oldPerson = "";

		$scope.getCurrentPerson = function() {

			$http({method: 'GET', url: '/username'}).
				success(function(data, status, headers, config) {
					$scope.oldPerson = data;
					$scope.person = { username:data, password:'', check:'' };
					
				}).error(function(data, status, headers, config) {
						
					console.log( "error username : " + data );

				});

		};

		$scope.check = function() {

			if( $scope.person.username.trim() == '' ) {

				document.getElementById( "settingsModalUsername" ).focus();
				return;

			}

			if( $scope.person.password.trim() == '' ) {

				document.getElementById( "settingsModalPassword" ).focus();
				return;

			}

			if( $scope.person.check.trim() == '' ) {

				document.getElementById( "settingsModalCheck" ).focus();
				return;

			}

			if( $scope.person.password != $scope.person.check ) {

				document.getElementById( "settingsModalCheck" ).focus();
				$scope.mywarning = 'Password en Check moeten hetzelfde zijn.';
				return;				

			}

			$scope.mywarning = '';
			$scope.fieldsEnabled = true;

			$http({method: 'POST', url: '/updatepw', data: { "old":$scope.oldPerson, "user":$scope.person.username, "pass": $scope.person.password }}).
				success(function(data, status, headers, config) {

					$scope.getCurrentPerson();
					$scope.mywarning = 'Updated';
					$scope.fieldsEnabled = false;

					
				}).error(function(data, status, headers, config) {
						
					console.log( "error logout : " + data );

				});


		};

		$scope.cancel = function() {

			$modalInstance.close();

		};

		$scope.logout = function() {

			$http({method: 'GET', url: '/logout'}).
				success(function(data, status, headers, config) {

					$modalInstance.close();
					load();
					
				}).error(function(data, status, headers, config) {
						
					console.log( "error logout : " + data );

				});

		}


		$scope.getCurrentPerson();

	}

}]);

app.controller( 'loginController', [ '$scope', '$modalInstance', '$http', 'getData', '$timeout', function( $scope, $modalInstance, $http, getData, $timeout ){

	$scope.fieldsEnabled = true;

	$scope.ok = function() {

		usernameElement = document.getElementById( "loginUsername" );
		var userNameValue = usernameElement.value.trim(" ");
		if( userNameValue == "" ) {

			usernameElement.focus();	
			return;

		}

		var passwordElement = document.getElementById( "loginPassword" );
		var passwordValue = passwordElement.value.trim(" ");
		if( passwordValue == "" ) {

			passwordElement.focus();
			return

		}

		$scope.fieldsEnabled = false;

		$http( { method: 'POST', url: '/login', data: { name: userNameValue, pw: passwordValue } } ).
			success( function(data, status, headers, config) {

				console.log( "login success, " + data + ", status : " + status );

				getData();
				$modalInstance.close();

			} ).error( function( data, status, headers, config ) {

				console.log( "login error : " + data + ", status : " + status );
				$scope.fieldsEnabled = true;
				passwordElement.value = "";

				$timeout(function(){
                	usernameElement.focus();
                	usernameElement.select();
            	}, 200);


			} );

	}

} ] );

app.controller( 'editImageController', [ '$scope', '$modalInstance', '$http', '$timeout', 'which', 'name', 'text', 'x', 'y', 'w', 'h', 'getData', 'openLogin', function( $scope, $modalInstance, $http, $timeout, which, name, text, x, y, w, h, getData, openLogin ) {

	$scope.title = "Edit image";

	$timeout(function() {
		drawThumb( "pics/" + which + "/" + name + "/orig.jpg", x, y, w, h );
	}, 1000);

	$scope.fieldsEnabled = false;
	$scope.pictureLoaded = true;
	$scope.pictureLoader = true;
	$scope.isNew = false;
	$scope.text = text;


	$scope.zoomIn = function() {
		zoomItIn();
	}

	$scope.zoomOut = function() {
		zoomItOut();
	}

	$scope.close = function() {
		$modalInstance.close();
	}

	$scope.addImage = function() {
		
		input = document.getElementById( 'thumbload' )

		if( !input ) {
			console.log("no input element")
		} else if( !input.files ) {
			console.log("no input files")
		} else if( !input.files[0] ) {
			console.log("Please select a file.")
		} else {

			$scope.isNew = true;
			
			$scope.$apply(function(){
	            $scope.pictureLoaded = true;
				$scope.pictureLoader = false;
	        });

			file = input.files[0];
			fr = new FileReader();
			fr.onload = function() {

				drawThumb( fr.result );

			};
			fr.readAsDataURL( file );
			
		}
		
	}

	$scope.check = function() {

		$scope.fieldsEnabled = true;
		var coords = getCoords();

		if( $scope.isNew ) {

			// upload and save
			input = document.getElementById( 'thumbload' )

		if( !input ) {

			console.log("no input element")
			return;

		} else if( !input.files ) {

			console.log("no input files")
			return;

		} else if( !input.files[0] ) {

			console.log("Please select a file.");
			return;

		} else {

			$scope.fieldsEnabled = true;
			fd = new FormData();
			fd.append( "file", input.files[0] );
			fd.append( "text", document.getElementById( 'thumbText' ).value );
			fd.append( "which", which );
			fd.append( "name", name );

			fd.append( "x", coords.x );
			fd.append( "y", coords.y );
			fd.append( "w", coords.w );
			fd.append( "h", coords.h );

			$http.post( "/thumbUpdate", fd, {
				withCredentials: true,
	        	headers: {'Content-Type': undefined },
	        	transformRequest: angular.identity
			} ).success( function(data) {
				console.log("Hoi!");
				getData(); // refresh the data
				$modalInstance.close();

			} ).error( function(data, status, headers, config) {

				if( status == 401 )  {

					$modalInstance.close();
					openLogin();

				}

				console.log( data );

				} 
			);

		}

		} else {

			// just save

		return $http( { method: 'POST', url: '/updateimageinfo', data: { which: which, name: name, text: document.getElementById( 'thumbText' ).value, x: coords.x, y: coords.y, w: coords.w, h: coords.h } } ).
			success( function(data, status, headers, config) {

				console.log( "update image info success, " + data + ", status : " + status );

				getData();
				$modalInstance.close();


			} ).error( function( data, status, headers, config ) {

				console.log( "update image info error : " + data + ", status : " + status );

				if( status == 401 )  {

					$modalInstance.close();
					openLogin();

				}

			} );

		}

	}

} ] );

app.controller( 'removeImageController', [ '$scope', '$modalInstance', '$http', 'which', 'name', 'getData', 'openLogin', function( $scope, $modalInstance, $http, which, name, getData, openLogin ){

	$scope.url = "pics/" + which + "/" + name + "/thumb.jpg";

	$scope.cancel = function() {

		$modalInstance.close();

	}

	$scope.check = function() {

		return $http( { method: 'POST', url: '/remove', data: { which: which, name: name } } ).
			success( function(data, status, headers, config) {

				console.log( "remove image success, " + data + ", status : " + status );

				getData();
				$modalInstance.close()


			} ).error( function( data, status, headers, config ) {

				console.log( "remove image error : " + data + ", status : " + status );

				if( status == 401 )  {

					$modalInstance.close();
					openLogin();

				}

			} );

	}

} ] );

app.controller( 'newImageController', [ '$scope', '$modalInstance', '$http', 'which', 'getData', 'openLogin', function( $scope, $modalInstance, $http, which, getData, openLogin ) {

	$scope.fieldsEnabled = false;
	$scope.pictureLoaded = false;
	$scope.pictureLoader = true;

	$scope.title = "New image";

	$scope.addImage = function() {
		
		input = document.getElementById( 'thumbload' )

		if( !input ) {
			console.log("no input element")
		} else if( !input.files ) {
			console.log("no input files")
		} else if( !input.files[0] ) {
			console.log("Please select a file.")
		} else {
			
			$scope.$apply(function(){
	            $scope.pictureLoaded = true;
				$scope.pictureLoader = false;
	        });

			file = input.files[0];
			fr = new FileReader();
			fr.onload = function() {

				drawThumb( fr.result );

			};
			fr.readAsDataURL( file );
			
		}
		
	};

	$scope.zoomIn = function() {
		zoomItIn();
	}

	$scope.zoomOut = function() {
		zoomItOut();
	}
		
	$scope.check = function() {
		
		input = document.getElementById( 'thumbload' )

		if( !input ) {

			console.log("no input element")
			return;

		} else if( !input.files ) {

			console.log("no input files")
			return;

		} else if( !input.files[0] ) {

			console.log("Please select a file.");
			return;

		} else {

			$scope.fieldsEnabled = true;
			fd = new FormData();
			fd.append( "file", input.files[0] );
			fd.append( "text", document.getElementById( 'thumbText' ).value );
			fd.append( "which", which );

			var thumbData = getCoords();

			console.log( "Hello : " + thumbData.x + " - " + thumbData.y + " - " + thumbData.w + " - " + thumbData.h );

			fd.append( "x", thumbData.x );
			fd.append( "y", thumbData.y );
			fd.append( "w", thumbData.w );
			fd.append( "h", thumbData.h );

			$http.post( "/thumb", fd, {
				withCredentials: true,
	        	headers: {'Content-Type': undefined },
	        	transformRequest: angular.identity
			} ).success( function(data) {
				console.log("Hoi!");
				getData(); // refresh the data
				$modalInstance.close();

			} ).error( function(data, status, headers, config) {

				if( status == 401 )  {

					$modalInstance.close();
					openLogin();

				}

				console.log( data );

				} 
			);
			}

		}

} ] );

function processData( data ) {

	data.one.paragraphProcessed = processParagraph( data.one.paragraph );
	data.two.paragraphProcessed = processParagraph( data.two.paragraph );
	data.three.paragraphProcessed = processParagraph( data.three.paragraph );
	data.four.paragraphProcessed = processParagraph( data.four.paragraph );
	data.five.paragraphProcessed = processParagraph( data.five.paragraph );

	return data

}

function processParagraph( data ) {

	var result = ""

	for( var i = 0; i < data.length; i++ ) {

		result += data[i] + "\n\n";

	}

	return result.substr( 0, result.length - 2 );

}

function processImageData( data ) {

	data.one = processImageRows( data.one );
	data.two = processImageRows( data.two );
	data.three = processImageRows( data.three );

	return data;

}

function processImageRows( data ) {

	data.push( { type : "new" } )

	var newData = [];
	var row

	for( var i = 0; i < data.length; i++ ) {

		if( ( i % 4 ) == 0 ) {

			row = [];
			newData.push( row );

		}

		data[i].Cache = Math.floor( Math.random() * 1000 )
		row.push( data[i] );

	}

	return newData;

}




















