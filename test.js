var baseURL = 'https://mnoj-api.herokuapp.com';
// baseURL = 'http://localhost:8080';

const fetch = require('node-fetch');
const someCode = `
#include <iostream>
#include <vector>
using namespace std;


int main() {
    ios_base::sync_with_stdio(0);cin.tie(0);cout.tie(0);

    vector<bool> sv;
    sv.resize(100001);

    for (int i = 2; i < 100000; i++) {
        if (sv[i]) for (int j = i + i; j < 100000; j += i) sv[j] = 0;
    }

    // cout << "Hello World!" << endl;
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