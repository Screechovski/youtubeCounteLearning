document.addEventListener("DOMContentLoaded", function(){

    const serverRequest = (id) => {
        let serverResponse = 0;

        var HttpClient = function () {
            this.get = function (aUrl, aCallback) {
                let anHttpRequest = new XMLHttpRequest();
                anHttpRequest.onreadystatechange = function () {
                    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                        aCallback(anHttpRequest.responseText);
                }        
                anHttpRequest.open("GET", aUrl, true);
                anHttpRequest.send(null);
            }
        }

        let client = new  HttpClient();

        client.get('https://www.googleapis.com/youtube/v3/videos?id='+ id +'&key=AIzaSyCEJu3yEXjMI9yPm0vVK663v7kCrLrSg7k&part=statistics', (response) => {
            buildHtml(JSON.parse(response).items[0].statistics);
        })
    }

    const addRequest = () => {
        const button = document.getElementById('formButton'),
            input = document.getElementById('inputChanelId');

        button.addEventListener('click', function(e){
            e.preventDefault();
            serverRequest(input.value);
        })
    }

    const buildHtml = (dataArray) => {
        const container = document.querySelector('.ul--wrapper');

        container.innerHTML = "";

        let ul = document.createElement('ul'),
        li = document.createElement('li');
        ul.classList = "list-group";

        for (var item in dataArray) {
            let li = document.createElement('li');
            li.classList = "list-group-item";
            li.innerText = item + " - " + dataArray[item];

            ul.append(li);
        }

        container.append(ul);

    }

    addRequest();


    


    
});
