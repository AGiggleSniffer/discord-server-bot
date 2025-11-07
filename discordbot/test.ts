import * as compose from 'compose';

const service = 'satisfactory-server';

const result = await compose.ps({ cwd: '/home/kitten/docker-repos/' });

console.log(result);
