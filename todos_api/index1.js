function getMostFollowers(...usernames){
	let baseUrl = 'https://api.github.com/users/';
	var promises = usernames.map(username => $.getJSON(baseUrl + username));
	console.log(promises);
	return Promise.all(promises).then(function(data){
		var max_followers_person = data.sort((a,b) => b.followers - a.followers)[0];
		return max_followers_person.login;
	})
}
getMostFollowers('elie','tigarcia','colt').then(function(data){
    console.log(data)
});