var homeController=function(){
	function all(context){
		templates.get('home')
		.then(function(template){
				$content.html(template());
			});
	}

	return{
		all:all
	};
}();