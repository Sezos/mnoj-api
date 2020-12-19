const fetch = require('node-fetch');
const someCode = `
#include <iostream>

using namespace std;

int main() {
    int a[10000];
    cout << "Hello World!" << endl;
    return 0;
}
`;
const data = JSON.stringify({
    code: someCode
})


fetch('http://localhost:3000/submit_solution', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => console.log(json));