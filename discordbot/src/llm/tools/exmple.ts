import { tool } from 'core/tools';
import { z } from 'zod';

export default tool((_) => 'Da weather is weatherin', {
	name: 'get_current_weather',
	description: 'Get the current weather in a given location',
	schema: z.object({
		location: z.string().describe(
			'The city and state, e.g. San Francisco, CA',
		),
	}),
});
