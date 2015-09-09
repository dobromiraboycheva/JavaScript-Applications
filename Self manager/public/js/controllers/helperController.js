var helperController= function(){
	function groupByCategory(item){
		return item.category;
	}

	function parseGroup(item,category){
		return{
		category,
		item
		};
	}

	function filterByCategory(category){
		return function(group){
			return group.category.toLowerCase()===category.toLowerCase();
		};
	}

	function fixOldDate(event){
		return{
			title:event.title,
			date:moment(event.date).format('MMM Do YYYY, hh:mm'),
			timeRemaining:moment(event.date).fromNow(),
			description:event.description,
			category:event.category
		};
	}

	function fixDate(item){
		var newItem=Object.create(item);
		newItem.date=moment(item.date).format('MMM Do YYYY, hh:mm');
		newItem.timeRemaining=moment(item.date).fromNow();
		return newItem;
	}

	return{
		groupByCategory,
		parseGroup,
		filterByCategory,
		fixOldDate,
		fixDate
	}
}();