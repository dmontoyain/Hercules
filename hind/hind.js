var colors = require('colors');
var fs = require('fs');
var request = require('request');
var config = require('/nfs/2017/d/dmontoya/hind/client.json');

var usersfile = process.argv[2];
var extra = process.argv[3];
if (!usersfile || extra)
{
    if (extra)
        console.log('Too many arguments.');
    else
        console.log("Invalid file");
    process.exit(1);
}
var myToken = 0;

var reqdata = {
    grant_type: 'client_credentials',
    client_id: config.uid,
    client_secret: config.secret
};

try{
    var userslist = fs.readFileSync(usersfile).toString().split('\n');
} 
catch (err){
    console.log("Error reading file.");
    process.exit(1);
}

function getUserslocation(myToken, user)
{
    var whereis = {
        url: 'https://api.intra.42.fr/v2/users/' + user + '/locations',
        form: { access_token: myToken },
    };

    request.get(whereis, function(error, response, body){
        if (error)
            throw new Error(error);
        var userlocation = JSON.parse(body);
        if (!userlocation[0])
            console.log('\n' + user.yellow + ' doesn\'t exist!');
        else if (userlocation[0].end_at)
            console.log('\nOur dear ' + userlocation[0].user.login.red + ' is unvailable. GONE!');
        else
            console.log('\nOur dear ' + userlocation[0].user.login.green + ' is at ' + userlocation[0].host + '.');
    });
}

request.post({
    url: 'https://api.intra.42.fr/oauth/token',
    form: reqdata
}, function (error, apiresponse, body){
        var tokendata = JSON.parse(body);
        myToken = tokendata.access_token;
        if (error)
            throw new Error(error);
        else{
            for (i = 0; i < userslist.length; i++){
                setTimeout(getUserslocation, i * 1000, myToken, userslist[i]);
            }
        }
});
