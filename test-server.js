import fetch from 'node-fetch';

async function testServer() {
    try {
        console.log('Testing server...');
        
        // Test main page
        const mainResponse = await fetch('http://localhost:3000');
        console.log('Main page status:', mainResponse.status);
        
        // Test API endpoint
        const apiResponse = await fetch('http://localhost:3000/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: 'test@example.com' })
        });
        
        console.log('API status:', apiResponse.status);
        const data = await apiResponse.json();
        console.log('API response:', data);
        
    } catch (error) {
        console.error('Error testing server:', error);
    }
}

testServer();
