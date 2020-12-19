var baseURL = 'https://mnoj-api.herokuapp.com';

baseURL = 'http://localhost:3000';

const fetch = require('node-fetch');
const someCode = `
#include <iostream>

using namespace std;

int main() {
    cout << "Astro World!" << endl;
    return 0;
}
`;
const data = JSON.stringify({
    code: someCode
})


fetch(`${baseURL}/submit_solution`, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => console.log(json));

fetch(`${baseURL}/test`, {
        method: 'GET',
        // body: data,
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    })
    .then(res => res.json())
    .then(json => console.log(json));