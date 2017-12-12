const axios = {};

axios.send = (url, callback, data,{async=true,method="GET"} = {} ) => {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open(method, url, async);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4) callback(httpRequest.responseText);
    };
    if (method == 'POST') {
        httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    httpRequest.send(data);
};
axios.get = (url, data, callback, async) => {
    const query = [];
    for (let key in data) {
        query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
    }
    axios.send(`${url}${query.length ? `?${query.join('&')}` : ''}`, callback,null);
};
axios.post = (url, data, callback, async) => {
    const query = [];
    for (let key in data) {
        query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
    }
    axios.send(url, callback,query.join('&'),{method:'POST'});
};
axios.post("index.php",{a:1,b:2},function(res){
    console.log(res)

})
