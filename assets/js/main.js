"use strict";

document.addEventListener("DOMContentLoaded", function () {

    var serverRequest = function serverRequest(id) {
        var serverResponse = 0;

        var HttpClient = function HttpClient() {
            this.get = function (aUrl, aCallback) {
                var anHttpRequest = new XMLHttpRequest();
                anHttpRequest.onreadystatechange = function () {
                    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) aCallback(anHttpRequest.responseText);
                };
                anHttpRequest.open("GET", aUrl, true);
                anHttpRequest.send(null);
            };
        };

        var client = new HttpClient();

        client.get('https://www.googleapis.com/youtube/v3/videos?id=' + id + '&key=AIzaSyCEJu3yEXjMI9yPm0vVK663v7kCrLrSg7k&part=statistics', function (response) {
            buildHtml(JSON.parse(response).items[0].statistics);
        });
    };

    var addRequest = function addRequest() {
        var button = document.getElementById('formButton'),
            input = document.getElementById('inputChanelId');

        button.addEventListener('click', function (e) {
            e.preventDefault();
            serverRequest(input.value);
        });
    };

    var buildHtml = function buildHtml(dataArray) {
        var container = document.querySelector('.ul--wrapper');

        container.innerHTML = "";

        var ul = document.createElement('ul'),
            li = document.createElement('li');
        ul.classList = "list-group";

        for (var item in dataArray) {
            var _li = document.createElement('li');
            _li.classList = "list-group-item";
            _li.innerText = item + " - " + dataArray[item];

            ul.append(_li);
        }

        container.append(ul);
    };

    addRequest();
});