try {
  console.log('Calling Web3Forms API...');
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: 'b9238913-cb79-445d-a5d3-aa17e48ffffa',
      name: 'Test',
      email: 'test@test.com',
      message: 'Automated test'
    })
  });
  console.log('Status:', res.status);
  const data = await res.json();
  console.log('Response:', JSON.stringify(data));
} catch (e) {
  console.error('Error:', e.message);
}
