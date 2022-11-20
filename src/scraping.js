const { spawn } = require('child_process');

const result = spawn('python', ['foodData.py']);

// 'data'이벤트리스너로 실행결과를 받음
result.stdout.on('data', (data) => {
  const text = data.toString('utf-8');
  console.log(text);
});

// 에러 발생 시, 'data'이벤트리스너로 실행결과를 받음
result.stderr.on('data', (data) => {
  const text = data.toString('utf8');
  console.log(text);
});
