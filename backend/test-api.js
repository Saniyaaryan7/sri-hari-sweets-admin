const http = require('http');

const testEndpoint = (path, method = 'GET', body = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                console.log(`${method} ${path} - Status: ${res.statusCode}`);
                if (data) {
                    try {
                        console.log('Response:', JSON.parse(data));
                    } catch (e) {
                        console.log('Response:', data);
                    }
                }
                resolve();
            });
        });

        req.on('error', (error) => {
            console.error(`Error testing ${path}:`, error.message);
            reject(error);
        });

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
};

const runTests = async () => {
    console.log('Starting API Tests...');
    try {
        await testEndpoint('/');
        await testEndpoint('/api/cakes');
        await testEndpoint('/api/categories');
        await testEndpoint('/api/supercategories');
        
        // Test POST Cake
        console.log('\nTesting POST Cake...');
        await testEndpoint('/api/cakes', 'POST', {
            cakeId: "TEST01",
            name: "Test Cake",
            price: 100,
            strike: 120,
            img: "test.jpg",
            status: "Active"
        });
        
        console.log('\nVerifying POST result...');
        await testEndpoint('/api/cakes');
        
        console.log('\nAll tests completed!');
    } catch (error) {
        console.error('Tests failed:', error.message);
    }
};

runTests();
